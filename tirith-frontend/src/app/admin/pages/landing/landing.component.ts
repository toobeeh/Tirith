import { Component } from '@angular/core';

@Component({
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  cards = [
    {
      name: "Lobby Inspector",
      color: "rgb(251 207 232)",
      image: "url(https://tobeh.host/scenes/scenePortal.gif)",
      link: "lobbies"
    },
    {
      name: "Member Management",
      color: "rgb(219 234 254)",
      image: "url(https://tobeh.host/scenes/sceneSpace.gif)",
      link: "members"
    }/* ,
    {
      name: "Palantir Setup",
      color: "rgb(220 252 231)",
      image: "url(https://tobeh.host/scenes/sceneEmerald_Dust.gif)",
      link: "palantir"
    } */
  ]

}
