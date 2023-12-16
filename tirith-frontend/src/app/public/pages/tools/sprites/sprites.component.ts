import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounce, debounceTime, map } from 'rxjs';
import { SpriteDto, SpritesService } from 'src/api';

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
export class SpritesComponent {

  private sprites: SpriteDto[] = [];
  public filterInput = new FormControl("#regular");

  public sprites$;

  constructor(spriteService: SpritesService) {

    this.sprites$ = this.filterInput.valueChanges
      .pipe(debounceTime(200), map(() => this.filterSprites()));

    spriteService.getAllSprites().subscribe(sprites => {
      this.sprites = sprites;
      this.filterInput.setValue(this.filterInput.value);
    });
  }

  private filterSprites() {
    const filter = this.filterInput.value ?? "";

    return this.sprites
      .map(s => ({ ...s, tags: this.getSpriteTags(s) }))
      .filter(s => s.tags.some(tag => tag.toLocaleLowerCase().includes(filter.toLocaleLowerCase())));
  }

  private getSpriteTags(sprite: SpriteDto) {
    const tags = [];
    tags.push(sprite.name);
    if (sprite.artist) tags.push(sprite.artist);
    if (sprite.eventDrop) tags.push(sprite.eventDrop.event.name);
    if (sprite.eventDrop) tags.push(sprite.eventDrop.name);
    if (!sprite.eventDrop) tags.push("regular");
    if (sprite.isSpecial) tags.push("special");
    if (sprite.isRainbowAllowed) tags.push("rainbow");

    return tags.map(t => `#${t}`);
  }

}
