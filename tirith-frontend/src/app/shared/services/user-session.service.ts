import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import {MemberDto, MembersService} from "../../../api";

export interface userFlags {
  bubbleFarming: boolean;
  admin: boolean;
  moderator: boolean;
  contentModerator: boolean;
  unlimitedCloud: boolean;
  patron: boolean;
  permaBan: boolean;
  dropBan: boolean;
  patronizer: boolean;
  booster: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user?: MemberDto;
  private static readonly tokenKey = "AUTH_BEARER";

  constructor(private memberService: MembersService) { }

  public get isLoggedIn() {
    return this._user !== undefined;
  }

  public static getToken() {
    return localStorage.getItem(UserService.tokenKey);
  }

  public logout() {
    this._user = undefined;
    localStorage.removeItem(UserService.tokenKey);
  }

  public getUser(forceFetch = false) {
    return of(this._user).pipe(
      switchMap(user => user && !forceFetch ? of(user) : this.memberService.getAuthenticatedMember()),
      tap(user => this._user = user)
    );
  }

  public invalidateUser() {
    this._user = undefined;
  }

  parseFlags(flags: number): userFlags {
    const flagArray = ("00000000" + (flags >>> 0).toString(2)).slice(-11).split("")
      .map(f => Number(f)).reverse();

    // parse array to interface
    return ({
      bubbleFarming: flagArray[0] == 1,
      admin: flagArray[1] == 1,
      moderator: flagArray[2] == 1,
      unlimitedCloud: flagArray[3] == 1,
      patron: flagArray[4] == 1,
      permaBan: flagArray[5] == 1,
      dropBan: flagArray[6] == 1,
      patronizer: flagArray[7] == 1,
      booster: flagArray[8] == 1,
      contentModerator: flagArray[10] == 1,
    });
  }
}
