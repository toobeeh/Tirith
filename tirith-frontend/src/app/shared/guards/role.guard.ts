import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { UserService, userFlags } from '../services/user-session.service';
import { ToastService } from '../services/toast.service';

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

    let routeFlags = route.data['requiredFlags'] as Partial<userFlags> | undefined;
    const requiredFlags = routeFlags ?? {}; // if undefined: anyone logged-in member can access

    const result = this.userService.getUser().pipe(
      map(user => this.userService.parseFlags(user.flags)),
      map(flags => Object.entries(requiredFlags).every(entry => flags[entry[0] as keyof userFlags] === entry[1])),
      tap(result => {
        if (!result) this.toastService.show({ message: { title: "Unauthorized to access this page" }, durationMs: 1000 })
      }),
      map(result => result ? result : this.router.createUrlTree(["/"])),
      catchError(() => of(this.router.createUrlTree(["/login"])))
    );

    return result;
  }
}
