import { Injectable } from '@angular/core';
import { of, switchMap, tap } from 'rxjs';
import {MemberDto, MembersService} from "../../../api";

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

  public static setToken(token: string) {
    return localStorage.setItem(UserService.tokenKey, token);
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
}
