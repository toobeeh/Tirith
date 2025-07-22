import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {typoOauthState} from "../authorize/authorize.component";
import {
  OAuth2AuthorizationCodeDto, OAuth2ClientDto,
  Oauth2Service
} from "src/api";
import {combineLatestWith, map, Observable, of, switchMap} from "rxjs";
import { OAuth2AuthenticationResultDto } from 'src/api/model/oAuth2AuthenticationResultDto';
import { DiscordAuthenticationResultDto } from 'src/api/model/discordAuthenticationResultDto';
import { CreateTypoAccountOptionsDto } from 'src/api/model/createTypoAccountOptionsDto';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {

  protected authenticationResult$?: Observable<OAuth2AuthenticationResultDto | DiscordAuthenticationResultDto>;
  private typoOauthState?: typoOauthState;

  constructor(private activeRoute: ActivatedRoute, private oauthService: Oauth2Service) { }

  ngOnInit(): void {

    // parse discord oauth2 result
    const discordAuthCode = this.activeRoute.snapshot.queryParamMap.get("code");
    const state = this.activeRoute.snapshot.queryParamMap.get("state");

    // validate args
    if(state === null) throw new Error("typo auth state was lost");
    if(discordAuthCode === null) throw new Error("discord auth code not provided");

    // parse state
    this.typoOauthState = JSON.parse(decodeURI(state)) as typoOauthState;

    // preauthenticate discord oauth code
    this.authenticationResult$ = this.oauthService.preAuthenticateDiscordAuthorizationCode({
      authorizationCode: discordAuthCode,
    }).pipe(
      switchMap(result => {

        if(this.typoOauthState === undefined) throw new Error("typo oauth state was lost");

        // if user has account, immediately get oauth auth code
        if(result.hasTypoAccount){
          return this.authenticateWithScopesReadable(result)
        }

        // else return preauthentication result and prompt user to create account
        return of(result);
      })
    );
  }

  /**
   * Authenticate with scopes description instead name.
   * @param preauthentication
   * @param createAccountOptions
   * @private
   */
  private authenticateWithScopesReadable(preauthentication: DiscordAuthenticationResultDto, createAccountOptions?: CreateTypoAccountOptionsDto): Observable<OAuth2AuthenticationResultDto> {
    if (this.typoOauthState === undefined) {
      throw new Error("typo oauth state was lost");
    }

    return this.oauthService.authenticate({
      discordEncryptedAccessToken: preauthentication.encryptedAccessToken,
      clientId: this.typoOauthState.clientId,
      createAccountOptions
    }).pipe(
      combineLatestWith(this.oauthService.getScopes()),
      map(([authCode, scopes]) => {
        authCode.result.client.scopes = scopes
          .filter(scope => authCode.result.client.scopes.includes(scope.name))
          .map(scope => scope.description);
        return authCode;
      })
    );
  }

  /**
   * Create a new account with the preauthentication result and retrieve the auth code
   * @param preauthentication
   * @param connectTypoTestground
   */
  public createAccount(preauthentication: DiscordAuthenticationResultDto, connectTypoTestground: boolean) {
    this.authenticationResult$ = this.authenticateWithScopesReadable(
      preauthentication,
      {
        connectTypoTestground
      }
    );
  }

  public continue(result: OAuth2AuthorizationCodeDto) {
    if (this.typoOauthState === undefined) {
      throw new Error("typo oauth state was lost");
    }

    const url = new URL(result.client.redirectUri);
    url.searchParams.set("code", result.authorizationCode);
    url.searchParams.set("state", this.typoOauthState.originalState ?? "");
    window.location.href = url.toString();
  }

  public isAuthCode(authenticationResult: OAuth2AuthenticationResultDto | DiscordAuthenticationResultDto) {
    return authenticationResult.hasOwnProperty("result") ? authenticationResult as OAuth2AuthenticationResultDto : null;
  }

  public isPreauthentication(authenticationResult: OAuth2AuthenticationResultDto | DiscordAuthenticationResultDto) {
    return authenticationResult.hasOwnProperty("encryptedAccessToken") ? authenticationResult as DiscordAuthenticationResultDto : null;
  }

  public getAppUrl(client: OAuth2ClientDto){
    return new URL(client.redirectUri).origin;
  }

}
