import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolsComponent {

  toolsCard = {
    color: "rgb(251 207 232)",
    image: "url(https://tobeh.host/scenes/scenePortal.gif)",
  };

  listCard = {
    color: "rgb(219 234 254)",
    image: "url(https://tobeh.host/scenes/sceneSpace.gif)",
  };

  cards = [
    {
      name: "Sprite List",
      link: "sprites",
      ... this.listCard
    },
    {
      name: "Scenes List",
      link: "scenes",
      ... this.listCard
    },
    {
      name: "Rainbow Sprite Preview",
      link: "rainbow-preview",
      ... this.toolsCard
    },
    {
      name: "Card Builder",
      link: "card-builder",
      ... this.toolsCard
    }
  ];
}
