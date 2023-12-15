import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sprites',
  templateUrl: './sprites.component.html',
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpritesComponent { }
