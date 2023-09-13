import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  private authCode?: string;
  private accessToken?: string | null;
  private readonly oauthURL = 'https://discord.com/api/oauth2/authorize?client_id=715874397025468417&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fauth&response_type=code&scope=identify'//;'https://discord.com/api/oauth2/authorize?client_id=715874397025468417&redirect_uri=https%3A%2F%2Fwww.typo.rip%2Fauth&response_type=code&scope=identify';

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

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const accessCodePresent = this.activeRoute.snapshot.queryParamMap.has("code");

    /* user has authenticated */
    if (accessCodePresent) {

      /* set auth code */
      this.authCode = this.activeRoute.snapshot.queryParamMap.get("code") ?? undefined;

      /* get user from API */
      console.log(this.authCode);
    }

    /* user needs to authenticate; redirect */
    else {
      window.location.href = this.oauthURL;
    }
  }


}
