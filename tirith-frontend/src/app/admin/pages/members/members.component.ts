import { Component } from '@angular/core';
import { MembersService } from '../../services/members.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent {

  membersSearch$?: Observable<any>;

  constructor(private memberService: MembersService, private router: Router, private route: ActivatedRoute) { }

  loadByLogin(login: number) {
    this.router.navigate(["./", login], { relativeTo: this.route });
  }

  loadByID(id: string) {
    this.memberService.getLobinByDiscordID(id).subscribe({
      next: data => {
        this.loadByLogin(data);
      },
      error: () => {
        throw new Error("no member found for this discord ID")
      }
    });
  }

  searchMembers(content: string) {
    this.membersSearch$ = this.memberService.searchMembers(content);
  }

  nameOfMember(member: string) {
    return JSON.parse(member).UserName;
  }

}
