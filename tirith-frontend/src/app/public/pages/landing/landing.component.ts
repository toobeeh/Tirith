import { Component } from '@angular/core';
import { NavPlanetService } from 'src/app/shared/services/nav-planet.service';

@Component({
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  constructor(private navService: NavPlanetService) { }

  public openNav() {
    this.navService.openNav();
  }
}
