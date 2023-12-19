import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NavPlanetService } from '../services/nav-planet.service';

/**
 * A guard that updates the nav items depending on route metadata.
 * The guard just has to be called on the parent route with canactivate & canactivate to be active on all child routes.
 * the child rotues can set the content wit the "navigation" route data.
 */
@Injectable({
  providedIn: 'root'
})
export class NavContentGuard implements CanActivate, CanActivateChild {

  constructor(private navPlanet: NavPlanetService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const nav = route.data["navigation"];
    if (nav) this.navPlanet.content = nav;

    const hideAll = route.data["hideAll"];
    this.navPlanet.hideAll = hideAll === true;

    return true;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(route, state);
  }

}
