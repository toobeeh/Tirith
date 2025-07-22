import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

export interface typoOauthState {
  clientId: number;
  originalState: string | null;
  nonce: string;
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
    if(redirectUri !== null) throw new Error("individual redirect uri param not supported, set per client");
    if(responseType !== "code") throw new Error("response_type must be code, only code flow supported");
    if(scope !== null) throw new Error("individual scope param not supported, set per client");
    if(clientId === null) throw new Error("client_id must be a string");

    // redirect to discord authentication, which will redirect back to the submit component which proceeds with typo oauth flow
    const typoState: typoOauthState = {
      clientId: Number(clientId),
      originalState: state,
      nonce: crypto.randomUUID()
    };
    const typoStateString = encodeURI(JSON.stringify(typoState));

    const redirectUrl = "http://localhost:4200/auth/submit";
    const discordOauthUrl =
      `https://discord.com/api/oauth2/authorize?client_id=1071142417987813376&redirect_uri=${encodeURI(redirectUrl)}&response_type=code&scope=identify&state=${typoStateString}`;
    window.location.href = discordOauthUrl;
  }

}
