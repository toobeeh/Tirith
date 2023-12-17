import { Component } from '@angular/core';
import { MemberDto, MembersService } from 'src/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  private member?: MemberDto;

  constructor(private memberService: MembersService) {

  }

}
