import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpComponent {

  cards = [
    {
      name: "Skribbl Features",
      color: "rgb(251 207 232)",
      image: "url(https://tobeh.host/scenes/scenePortal.gif)",
      link: "features"
    },
    {
      name: "Discord & Palantir",
      color: "rgb(219 234 254)",
      image: "url(https://tobeh.host/scenes/sceneSpace.gif)",
      link: "discord"
    },
    {
      name: "Palantir Setup",
      color: "rgb(220 252 231)",
      image: "url(https://tobeh.host/scenes/sceneEmerald_Dust.gif)",
      link: "palantir"
    },
    {
      name: "Extension Settings",
      color: "rgb(251 207 232)",
      image: "url(https://tobeh.host/scenes/scenePortal.gif)",
      link: "settings"
    },
  ]

}
