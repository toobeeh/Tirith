import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { UserService } from '../services/user-session.service';
import { ToastService } from '../services/toast.service';
import {MemberDto} from "../../../api";
import MemberFlagsEnum = MemberDto.MemberFlagsEnum;

/**
 * A guard that restricts access to certain pages.
 * When the guard is present, all logged-in users can access the page.
 * If additionally "requiredFlags" are present, the need to be fulfilled too.
 */
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private userService: UserService, private toastService: ToastService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let routeFlags = route.data['requiredFlags'] as MemberFlagsEnum[] | undefined;
    const requiredFlags = routeFlags ?? []; // if undefined: anyone logged-in member can access

    const url = state.url;

    return this.userService.getUser().pipe(
      map(user => user.memberFlags),
      map(flags => {
        return requiredFlags.length == 0 || requiredFlags.some(flag => flags.includes(flag))
      }),
      tap(result => {
        if (!result) this.toastService.show({ message: { title: "Unauthorized to access this page" }, durationMs: 1000 })
      }),
      map(result => result ? result : false),
      catchError(() => of(this.router.createUrlTree(["/login"], { queryParams: { continue: encodeURI(url) } })))
    );
  }
}
