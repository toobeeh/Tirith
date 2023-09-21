import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MemberDto, MembersService } from 'src/api';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  member$?: Observable<MemberDto>;

  constructor(private route: ActivatedRoute, private router: Router, private memberService: MembersService) { }

  ngOnInit(): void {
    const login = Number(this.route.snapshot.paramMap.get("login"));
    if (Number.isNaN(login)) this.router.navigate(["../"], { relativeTo: this.route });

    this.member$ = this.memberService.getMemberByLogin(login);
  }

  updateDiscordID(login: string, newID: string) {
    this.memberService.updateMemberDiscordID(Number(login), { id: newID }).subscribe({
      next: data => {
        this.member$ = of(data);
      },
      error: () => {
        throw new Error("error updating member discord ID");
      }
    })
  }

}
