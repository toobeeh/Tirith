import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/api';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  private authCode?: string;
  private accessToken?: string | null;
  private redirectUrl?: string;
  private readonly redirectOauthUrl = "https://www.typo.rip/auth";
  public readonly oauthUrl = `https://discord.com/api/oauth2/authorize?client_id=1071142417987813376&redirect_uri=${encodeURI(this.redirectOauthUrl)}&response_type=code&scope=identify`;

  public get state() {
    if (this.authCode === undefined) {
      return 'idle';
    }
    else if (this.accessToken === null) {
      return 'register';
    }
    else if (this.accessToken === undefined) {
      return 'loading';
    }
    else return 'success';
  }

  private encodeState() {
    return encodeURI(JSON.stringify({ originUrl: this.redirectUrl }));
  }

  private decodeState(state: string) {
    return JSON.parse(decodeURI(state));
  }

  constructor(private activeRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {

    this.redirectUrl = this.activeRoute.snapshot.queryParamMap.get("redirect") ?? undefined;

    // if redirect url present, new login with redirect instead popup
    if (this.redirectUrl) {
      const oauth = `https://discord.com/api/oauth2/authorize?client_id=1071142417987813376&redirect_uri=${encodeURI(this.redirectOauthUrl)}&response_type=code&scope=identify&state=${this.encodeState()}`;
      window.location.href = oauth;
    }

    const accessCodePresent = this.activeRoute.snapshot.queryParamMap.has("code");

    /* user has authenticated */
    if (accessCodePresent) {

      /* set auth code */
      this.authCode = this.activeRoute.snapshot.queryParamMap.get("code") ?? undefined;

      /* get user from API */
      this.authService.getAccessToken(this.authCode!).subscribe({
        next: (data) => {
          // check if state is set, if yes new login method
          const state = this.activeRoute.snapshot.queryParamMap.get("state");
          if (state !== null) {
            const originUrl = new URL(this.decodeState(state).originUrl);
            originUrl.searchParams.set("accessToken", data.accessToken);
            window.location.href = originUrl.toString();
          }

          // else old popup method
          else {
            const bc = new BroadcastChannel("auth");
            bc.postMessage(data);
            this.accessToken = data.accessToken;

            setTimeout(() => window.close(), 2000);
          }
        },
        error: () => {
          this.accessToken = null;
        }
      })
    }

    /* user needs to authenticate; redirect */
    else {
      this.openIntermediate();
    }
  }

  createAccount(connectTypo: boolean) {
    if (!this.authCode) throw new Error("auth code missing");

    this.authService.registerDiscordUser({ code: this.authCode, connectTypo }).subscribe({
      next: (data) => {
        this.accessToken = data.accessToken;

        /* close window and emit data */
        window.opener?.postMessage({ accessToken: this.accessToken, username: data.userName }, "*");
        setTimeout(() => window.close(), 2000);
      }
    });
  }

  openIntermediate(open = true) {
    if (open) setTimeout(() => window.open(this.oauthUrl, '_blank', 'height=650,width=500,right=0,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes'), 2000);
    const bc = new BroadcastChannel("auth");
    bc.onmessage = (message) => {
      window.opener?.postMessage({ accessToken: message.data.accessToken, username: message.data.userName }, "*");
      window.close();
    }
  }


}
