import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from "@angular/forms";
import { debounceTime, map } from "rxjs";
import { SceneDto, ScenesService } from "src/api";

@Component({
  selector: 'app-scenes',
  templateUrl: './scenes.component.html',
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScenesComponent {

  private scenes: SceneDto[] = [];
  public filterInput = new FormControl("");

  public scenes$;

  constructor(scenesService: ScenesService) {

    this.scenes$ = this.filterInput.valueChanges
      .pipe(debounceTime(200), map(() => this.filterSprites()));

    scenesService.getAllScenes().subscribe(scenes => {
      this.scenes = scenes;
      this.filterInput.setValue(this.filterInput.value);
    });
  }

  private filterSprites() {
    const filter = this.filterInput.value ?? "";

    return this.scenes
      .map(s => ({ ...s, tags: this.getSceneTags(s) }))
      .filter(s => s.tags.some(tag => tag.toLocaleLowerCase().includes(filter.toLocaleLowerCase())));
  }

  private getSceneTags(scenes: SceneDto) {
    const tags = [];
    tags.push(scenes.name);
    if (scenes.artist) tags.push(scenes.artist);
    if (scenes.event) tags.push(scenes.event.name);
    if (!scenes.event) tags.push("regular");

    return tags.map(t => `#${t}`);
  }
}
