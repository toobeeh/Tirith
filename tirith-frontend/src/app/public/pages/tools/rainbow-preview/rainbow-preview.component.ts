import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from "@angular/forms";
import { SpriteDto, SpritesService } from 'src/api';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-rainbow-preview',
  templateUrl: './rainbow-preview.component.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class RainbowPreviewComponent {

  public sprite?: SpriteDto;
  public spriteInput = new FormControl<number | null>(null);
  public rainbowInput = new FormControl<number | null>(null);

  constructor(private spriteService: SpritesService, private toastService: ToastService) { }

  setSpriteSource() {
    const rainbow = this.rainbowInput.value ?? 100;
    const sprite = this.spriteInput.value ?? 0;

    if (rainbow < 0 || rainbow > 200) {
      this.toastService.show({ message: { title: "Invalid Rainbow Shift", content: "The rainbow shift number must me between 0 and 200." } });
      this.sprite = undefined;
      return;
    }

    this.spriteService.getSpriteById(sprite).subscribe({
      next: (s) => {
        if (!s.isRainbowAllowed) {
          this.toastService.show({ message: { title: "Invalid Sprite", content: `"${s.name}" is no Rainbow Sprite.` } });
          this.sprite = undefined;
          return;
        }

        s.url = `https://static.typo.rip/sprites/rainbow/modulate.php?url=${s.url}&hue=${rainbow}`;
        this.sprite = s;
      },
      error: () => {
        this.sprite = undefined;
        this.toastService.show({ message: { title: "Could not load Sprite", content: `The Sprite with ID ${sprite} could not be loaded.` } });
      }
    })
  }

}
