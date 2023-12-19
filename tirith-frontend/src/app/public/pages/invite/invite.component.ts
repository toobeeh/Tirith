import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { GuildInviteDto, GuildsService, MemberDto, MembersService } from 'src/api';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UserService } from 'src/app/shared/services/user-session.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  invite$?: Observable<{ invite: GuildInviteDto, user?: MemberDto }>;

  constructor(private route: ActivatedRoute, private guildsService: GuildsService, private userService: UserService, private router: Router, private toastService: ToastService, private memberService: MembersService) { }

  ngOnInit(): void {
    const token = Number(this.route.snapshot.paramMap.get('token'));

    if (Number.isNaN(token)) {
      this.toastService.show({ message: { title: "Invalid Server Invite :(" } });
      this.router.navigate(["/"]);
    }
    else {
      this.invite$ = this.guildsService.getGuildInvite(token).pipe(
        switchMap(invite => this.userService.getUser().pipe(
          catchError(() => of(undefined)),
          map(user => ({ user, invite }))
        ))
      );
    }
  }

  redirectToLogin(invite: number) {
    this.router.navigate(["/login"], { queryParams: { continue: encodeURI(`/invite/${invite}`) } });
  }

  userHasJoined(invite: GuildInviteDto, user: MemberDto) {
    return user.guilds.some(g => g.ObserveToken == invite.token);
  }

  connect(invite: GuildInviteDto, user: MemberDto) {
    const token = this.toastService.show({ message: { title: `Connecting to ${invite.name}...` } });
    this.memberService.connectMemberToGuild(Number(user.userLogin), invite.token).pipe(
      catchError(() => {
        this.toastService.cancelMessage(token);
        this.toastService.show({ message: { title: `Something went wrong :(`, content: `Could not connect to ${invite.name}` } });
        return of(false);
      }),
      tap(result => {
        if (result !== false) {
          this.toastService.cancelMessage(token);
          this.userService.invalidateUser();
          this.router.navigate(["/user"]);
        }
      })
    ).subscribe();
  }
}
