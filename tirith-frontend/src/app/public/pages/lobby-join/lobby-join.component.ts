import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LobbiesService} from "../../../../api";
import {UserService} from "../../../shared/services/user-session.service";
import {catchError, map, Observable, of, tap} from "rxjs";

@Component({
  selector: 'app-lobby-join',
  templateUrl: './lobby-join.component.html',
  styleUrls: ['./lobby-join.component.css']
})
export class LobbyJoinComponent implements OnInit {

  result$?: Observable<string>;

  constructor(private route: ActivatedRoute, private router: Router, private lobbiesService: LobbiesService, private useService: UserService) { }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams["token"];

    /* check if lobby token provided */
    if(!token) this.result$ = of("No lobby token provided");

    /* if not logged in, redirect */
    if(!UserService.getToken()) {
      this.router.navigate(["/login"], { queryParams: { continue: encodeURI(this.router.routerState.snapshot.url) } });
    }

    /* load invite  */
    else {
      this.result$ = this.lobbiesService.getDecryptedLobbyLink(token).pipe(
        map((link) => {
          window.location.href = decodeURIComponent(link.link);
          return "Success";
        }),
        catchError((e) => of(e.error.message as string))
      );
    }
  }
}
