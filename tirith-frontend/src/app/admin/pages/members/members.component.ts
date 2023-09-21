import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberSearchDto, MembersService } from 'src/api';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent {

  membersSearch$?: Observable<MemberSearchDto[]>;

  constructor(private memberService: MembersService, private router: Router, private route: ActivatedRoute) { }

  loadByLogin(login: number | string) {
    this.router.navigate(["./", login], { relativeTo: this.route });
  }

  loadByID(id: string) {
    this.memberService.getMemberByDiscordID(id).subscribe({
      next: data => {
        this.loadByLogin(data.userLogin);
      },
      error: () => {
        throw new Error("no member found for this discord ID")
      }
    });
  }

  searchMembers(content: string) {
    this.membersSearch$ = this.memberService.findMembersWildcardSearch(content);
  }
}
