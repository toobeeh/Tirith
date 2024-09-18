import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  initLogin() {
    const continueParam = this.route.snapshot.queryParamMap.get("continue");

    /* handler for window messages */
    const listenOnce = () => {
      window.addEventListener("message", async event => {

        if (!event.data || !event.data.accessToken || event.data.accessToken == "") listenOnce();
        else {
          const accessToken = event.data.accessToken;
          console.log("Logged in with token: ", accessToken);
          localStorage.setItem("AUTH_BEARER", accessToken);
          this.router.navigate([continueParam ? decodeURI(continueParam) : "/user"]);
        }
      }, { once: true });
    }

    listenOnce();

    window.location.href = 'https://www.typo.rip/auth?redirect=' + encodeURI(window.location.href);

    /* old login */
    //window.open('http://localhost:4200/auth/', 'Log in to Palantir', 'height=650,width=500,right=0,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
  }

  ngOnInit(): void {

    // check if redirected back from login (new method
    const continueParam = this.route.snapshot.queryParamMap.get("continue");
    const accessToken = this.route.snapshot.queryParamMap.get("accessToken");
    if(accessToken !== null){
      console.log("Logged in with token: ", accessToken);
      console.log("Continuing to: ", continueParam);
      localStorage.setItem("AUTH_BEARER", accessToken);
      this.router.navigate([continueParam ? decodeURI(continueParam) : "/user"]);
    }
  }

}

