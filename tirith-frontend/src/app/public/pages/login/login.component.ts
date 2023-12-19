import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

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

    window.open('https://www.typo.rip/auth/', 'Log in to Palantir', 'height=650,width=500,right=0,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
  }

}

