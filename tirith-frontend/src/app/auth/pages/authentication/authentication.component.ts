import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
          this.accessToken = data.accessToken;

          /* close window and emit data */
          window.opener?.postMessage({ accessToken: this.accessToken, username: data.user.username }, "*");
          setTimeout(() => window.close(), 1000);
        },
        error: () => {
          this.accessToken = null;
        }
      })
    }

    /* user needs to authenticate; redirect */
    else {
      window.location.href = this.oauthURL;
    }
  }

  createAccount(connectTypo: boolean) {
    if (!this.authCode) throw new Error("auth code missing");

    this.authService.createNewMember(this.authCode, connectTypo).subscribe({
      next: (data) => {
        this.accessToken = data.accessToken;

        /* close window and emit data */
        window.opener?.postMessage({ accessToken: this.accessToken, username: data.user.username }, "*");
        setTimeout(() => window.close(), 2000);
      }
    });
  }


}
