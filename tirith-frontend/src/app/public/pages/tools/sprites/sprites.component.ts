import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounce, debounceTime, map, of } from 'rxjs';
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
  private orderMode: "price" | "id" = "id";
  private orderDirection: "asc" | "desc" = "asc";

  constructor(spriteService: SpritesService) {

    this.sprites$ = this.filterInput.valueChanges
      .pipe(debounceTime(100), map(() => this.filterSprites()));

    spriteService.getAllSprites().subscribe(sprites => {
      this.sprites = sprites;
      this.filterInput.setValue(this.filterInput.value);
    });
  }

  public get orderModeCaption() {
    return this.orderMode == "price" ? "Ordered By Price" : "Ordered By ID";
  }

  public get orderDirectionCaption() {
    return this.orderDirection == "asc" ? "Ascending" : "Descending";
  }

  private filterSprites() {
    const filter = this.filterInput.value ?? "";

    return this.sprites
      .map(s => ({ ...s, tags: this.getSpriteTags(s) }))
      .filter(s => s.tags.some(tag => tag.toLocaleLowerCase().includes(filter.toLocaleLowerCase())))
      .sort((a, b) => {
        let propA = this.orderMode === "id" ? a.id : a.cost;
        let propB = this.orderMode === "id" ? b.id : b.cost;
        return this.orderDirection === "asc" ? propA - propB : propB - propA;
      });
  }

  private getSpriteTags(sprite: SpriteDto) {
    const tags = [];
    tags.push(sprite.name);
    if (sprite.artist) tags.push(sprite.artist);
    if (sprite.eventDrop) tags.push(sprite.eventDrop.event.name);
    if (sprite.eventDrop) tags.push(sprite.eventDrop.name);
    if (!sprite.eventDrop && sprite.id < 1000) tags.push("regular");
    if (sprite.id >= 1000) tags.push("unreleased");
    if (sprite.isSpecial) tags.push("special");
    if (sprite.isRainbowAllowed) tags.push("rainbow");

    return tags.map(t => `#${t}`);
  }

  public toggleOrderMode() {
    this.orderMode = this.orderMode === "id" ? "price" : "id";
    this.filterInput.setValue(this.filterInput.value);
  }

  public toggleOrderDirection() {
    this.orderDirection = this.orderDirection === "asc" ? "desc" : "asc";
    this.filterInput.setValue(this.filterInput.value);
  }

}
