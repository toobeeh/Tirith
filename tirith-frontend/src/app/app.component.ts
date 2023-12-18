import { Component } from '@angular/core';
import { NavPlanetService } from './shared/services/nav-planet.service';
import { ToastService } from './shared/services/toast.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { GuardsCheckEnd, GuardsCheckStart, NavigationCancel, Router } from '@angular/router';

const fadeInOut = trigger('fadeInOut', [
  state('void', style({
    opacity: 0
  })),
  transition('void <=> *', animate(300)),
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeInOut]
})
export class AppComponent {
  title = 'Skribbl Typo';

  public toastOpened = false;

  public get toastMessages() {
    return this.toastService.currentMessages;
  }

  constructor(public navPlanet: NavPlanetService, private toastService: ToastService, router: Router) {
    toastService.changes.subscribe(state => this.toastOpened = state);

    let lastGuardToken: Symbol | undefined;
    router.events.subscribe(event => {
      if (event instanceof GuardsCheckStart) {
        if (lastGuardToken) toastService.cancelMessage(lastGuardToken);
        lastGuardToken = toastService.show({ message: { title: "Loading.." } });
      }
      if (event instanceof GuardsCheckEnd || event instanceof NavigationCancel) {
        if (lastGuardToken) toastService.cancelMessage(lastGuardToken);
      }
    });
  }
}
