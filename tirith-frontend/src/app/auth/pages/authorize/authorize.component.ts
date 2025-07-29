import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Oauth2Service} from "../../../../api";

export interface typoOauthState {
  clientId: number;
  originalState: string | null;
  nonce: string;
  redirectUri?: string;
}

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.css']
})
export class AuthorizeComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    // parse oauth2 args
    const clientId = this.activeRoute.snapshot.queryParamMap.get("client_id");
    const responseType = this.activeRoute.snapshot.queryParamMap.get("response_type");
    const state = this.activeRoute.snapshot.queryParamMap.get("state");
    const scope = this.activeRoute.snapshot.queryParamMap.get("scope");
    const redirectUri = this.activeRoute.snapshot.queryParamMap.get("redirect_uri");

    // validate args
    if(responseType !== "code") throw new Error("response_type must be code, only code flow supported");
    if(scope !== null) console.warn("ignoring scope, fixed scopes per client set")
    if(clientId === null) throw new Error("client_id must be a string");

    // redirect to discord authentication, which will redirect back to the submit component which proceeds with typo oauth flow
    const typoState: typoOauthState = {
      clientId: Number(clientId),
      originalState: state,
      nonce: crypto.randomUUID(),
      redirectUri: redirectUri ?? undefined
    };
    const typoStateString = encodeURI(JSON.stringify(typoState));

    const redirectUrl = "https://www.typo.rip/auth/submit";
    const discordOauthUrl =
      `https://discord.com/api/oauth2/authorize?client_id=1071142417987813376&redirect_uri=${encodeURI(redirectUrl)}&response_type=code&scope=identify&state=${typoStateString}`;

    window.location.href = discordOauthUrl;
  }

}
