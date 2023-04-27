import { Component } from '@angular/core';
import { NavPlanetService } from './shared/services/nav-planet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tirith';

  constructor(public navPlanet: NavPlanetService) { }
}
