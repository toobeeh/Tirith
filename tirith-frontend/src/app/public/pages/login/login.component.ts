import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {MembersService, Oauth2Service} from "../../../../api";
import {UserService} from "../../../shared/services/user-session.service";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private readonly clientId = 4;

  constructor(private router: Router, private route: ActivatedRoute, private oauthService: Oauth2Service) { }

  initLogin() {
    const continueParam = this.route.snapshot.queryParamMap.get("continue");
    window.location.href = 'https://www.typo.rip/auth/authorize?client_id=' + this.clientId + '&response_type=code&state=' + continueParam;
  }

  ngOnInit(): void {

    // check if redirected back from login (new method
    const continueParam = this.route.snapshot.queryParamMap.get("state");
    const authCode = this.route.snapshot.queryParamMap.get("code");
    if(authCode !== null){
      this.oauthService.getAccessToken({
        code: authCode,
        client_id: this.clientId,
        grant_type: "authorization_code"
      }).subscribe(token => {
        const accessToken = token.access_token;
        console.log("Logged in with token: ", accessToken);
        console.log("Continuing to: ", continueParam);
        UserService.setToken(accessToken);
        this.router.navigate([continueParam ? decodeURI(continueParam) : "/user"]);
      });
    }
  }

}

