import { Component } from '@angular/core';
import { NavPlanetService } from './shared/services/nav-planet.service';
import { ToastService } from './shared/services/toast.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
  title = 'SKribbl Typo';

  public toastOpened = false;

  public get toastMessages() {
    return this.toastService.currentMessages;
  }

  constructor(public navPlanet: NavPlanetService, private toastService: ToastService) {
    toastService.changes.subscribe(state => this.toastOpened = state);
  }
}
