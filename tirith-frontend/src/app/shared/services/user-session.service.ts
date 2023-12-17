import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { MemberDto, MembersService } from 'src/api';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  private _user?: MemberDto;

  private get token() {
    return localStorage.getItem("AUTH_BEARER");
  }

  constructor(private memberService: MembersService) { }

  public get isLoggedIn() {
    return this._user !== undefined;
  }

  public get user() {
    if (!this._user) throw new Error("Not logged in");
    return this._user;
  }

  public refreshUser() {
    return this.memberService.getAuthenticatedMember().pipe(
      tap(member => this._user = member),
      map(() => void 1)
    );
  }
}
