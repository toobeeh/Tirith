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
      image: "url(https://static.typo.rip/scenes/scenePortal.gif)",
      link: "features"
    },
    {
      name: "Discord & Palantir",
      color: "rgb(219 234 254)",
      image: "url(https://static.typo.rip/scenes/sceneSpace.gif)",
      link: "discord"
    },
    {
      name: "Command Help",
      color: "rgb(220 252 231)",
      image: "url(https://static.typo.rip/scenes/sceneEmerald_Dust.gif)",
      link: "new-palantir"
    },
    {
      name: "Typo Server Home",
      color: "rgb(251 207 232)",
      image: "url(https://static.typo.rip/scenes/scenePortal.gif)",
      link: "lobby-bot"
    },
    {
      name: "Extension Settings",
      color: "rgb(219 234 254)",
      image: "url(https://static.typo.rip/scenes/sceneSpace.gif)",
      link: "settings"
    },
    {
      name: "Rules & Fair Play",
      color: "rgb(220 252 231)",
      image: "url(https://static.typo.rip/scenes/sceneEmerald_Dust.gif)",
      link: "rules"
    },
  ]

}
