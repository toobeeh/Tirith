import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LobbiesService} from "../../../../api";
import {UserService} from "../../../shared/services/user-session.service";
import {catchError, map, Observable, of, tap} from "rxjs";
import {ToastService} from "../../../shared/services/toast.service";

@Component({
  selector: 'app-lobby-join',
  templateUrl: './lobby-join.component.html',
  styleUrls: ['./lobby-join.component.css']
})
export class LobbyJoinComponent implements OnInit {

  result$?: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lobbiesService: LobbiesService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams["token"];

    /* check if lobby token provided */
    if(!token) {
      this.result$ = of("No lobby token provided");
    }

    /* if not logged in, redirect */
    if(!UserService.getToken()) {
      this.toastService.show({ message: { title: "Not logged in", content: "You need to be logged in to join a protected lobby" }, durationMs: 3000 });
      this.router.navigate(["/login"], { queryParams: { continue: encodeURI(this.router.routerState.snapshot.url) } });
    }

    /* load invite  */
    else {
      this.result$ = this.lobbiesService.getDecryptedLobbyLink(decodeURIComponent(token)).pipe(
        map((link) => {
          window.location.href = link.link;
          return "Success";
        }),
        catchError((e) => {
          if(e?.error?.statusCode === 401){
            this.toastService.show({ message: {
              title: "Unauthorized",
                content: "You are not authorized to join this protected lobby.\nMake sure you are connected to the server!"
              }, durationMs: 3000 });
            return of("Unauthorized to join protected lobby");
          }

          return of(e.error.message as string)
        })
      );
    }
  }
}
