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
  private readonly oauthURL = 'https://discord.com/api/oauth2/authorize?client_id=715874397025468417&redirect_uri=https%3A%2F%2Fwww.typo.rip%2Fauth&response_type=code&scope=identify';

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

  constructor(private activeRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    const accessCodePresent = this.activeRoute.snapshot.queryParamMap.has("code");

    /* user has authenticated */
    if (accessCodePresent) {

      /* set auth code */
      this.authCode = this.activeRoute.snapshot.queryParamMap.get("code") ?? undefined;

      /* get user from API */
      this.authService.getAccessToken(this.authCode!).subscribe({
        next: (data) => {
          const bc = new BroadcastChannel("auth");
          bc.postMessage(data);
          this.accessToken = data.accessToken;
          setTimeout(() => window.close(), 2000);
        },
        error: () => {
          this.accessToken = null;
        }
      })
    }

    /* user needs to authenticate; redirect */
    else {
      setTimeout(() => window.open(this.oauthURL, '_blank', 'height=650,width=500,right=0,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes'), 2000);
      const bc = new BroadcastChannel("auth");
      bc.onmessage = (message) => {
        window.opener?.postMessage({ accessToken: message.data.accessToken, username: message.data.userName }, "*");
        window.close();
      }
      //window.location.href = this.oauthURL;
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


}
