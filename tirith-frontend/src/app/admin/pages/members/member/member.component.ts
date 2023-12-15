import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MemberDto, MembersService } from 'src/api';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  member$?: Observable<MemberDto>;

  constructor(private route: ActivatedRoute, private router: Router, private memberService: MembersService, private toast: ToastService) { }

  ngOnInit(): void {
    const login = Number(this.route.snapshot.paramMap.get("login"));
    if (Number.isNaN(login)) this.router.navigate(["../"], { relativeTo: this.route });

    this.member$ = this.memberService.getMemberByLogin(login);
  }

  updateDiscordID(login: string, newID: string) {
    this.memberService.updateMemberDiscordID(Number(login), { id: newID }).subscribe({
      next: data => {
        this.member$ = of(data);
        this.toast.show({ message: { title: "Successfully updated", content: "The member's discord ID has been changed to " + newID } });
      },
      error: () => {
        this.toast.show({ message: { title: "Something went wrong", content: "The member's discord ID could not be changed. " } });
        throw new Error("error updating member discord ID");
      }
    })
  }

  clearDropboost(login: string) {
    this.memberService.clearMemberDropboost(Number(login)).subscribe({
      next: data => {
        this.toast.show({ message: { title: "Cleared Dropboost", content: "The member's dropboost has been cleared. " } });
        console.log("dropboost cleared");
      },
      error: () => {
        this.toast.show({ message: { title: "Something went wrong", content: "The member'sdrop boost could not be cleared. " } });
        throw new Error("error updating member discord ID");
      }
    });
  }

  copyToken(login: string) {
    this.memberService.getMemberAccessToken(Number(login)).subscribe({
      next: data => {
        navigator.clipboard.writeText(data.Token);
        this.toast.show({ message: { title: "Copied token to clipboard" }, durationMs: 1000 });
      },
      error: (e) => {
        this.toast.show({ message: { title: "Failed to fetch the token" } });
        throw new Error("error copying token");
      }
    });
  }

}
