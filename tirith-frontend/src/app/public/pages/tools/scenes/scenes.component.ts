import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from "@angular/forms";
import { debounceTime, map } from "rxjs";
import {SceneDto, ScenesService, SceneThemeDto} from "src/api";

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
  private currentThemes: Map<number, SceneThemeDto | undefined> = new Map<number, SceneThemeDto | undefined>();
  public filterInput = new FormControl("");

  public scenes$;

  constructor(scenesService: ScenesService) {

    this.scenes$ = this.filterInput.valueChanges
      .pipe(debounceTime(200), map(() => this.filterScenes()));

    scenesService.getAllScenes().subscribe(scenes => {
      this.scenes = scenes;
      this.filterInput.setValue(this.filterInput.value);
    });
  }

  private filterScenes() {
    const filter = this.filterInput.value ?? "";

    return this.scenes
      .map(s => ({ ...s, tags: this.getSceneTags(s) }))
      .filter(s => s.tags.some(tag => tag.toLocaleLowerCase().includes(filter.toLocaleLowerCase())));
  }

  public getSceneTags(scene: SceneDto) {
    const tags = [];
    tags.push(scene.name);
    if (scene.artist) tags.push(scene.artist);
    if (scene.event) tags.push(scene.event.name);
    if (!scene.event) tags.push("regular");
    if(scene.themes.length > 0) tags.push("themes");
    const theme = this.currentThemes.get(scene.id);
    if (theme) {
      tags.push(`#${theme.name}`);
    }

    return tags.map(t => `#${t}`);
  }

  public cycleSceneTheme(scene: SceneDto) {
    if(scene.themes.length === 0) return;

    const currentThemeIndex = scene.themes.findIndex(t => t.shift === this.currentThemes.get(scene.id)?.shift);
    const nextThemeIndex = (currentThemeIndex + 1) % (scene.themes.length + 1);
    this.currentThemes.set(scene.id, nextThemeIndex === scene.themes.length ? undefined : scene.themes[nextThemeIndex]);
  }

  public getSceneUrl(scene: SceneDto): string {
    const theme = this.currentThemes.get(scene.id);
    return theme ? `https://static.typo.rip/sprites/rainbow/modulate.php?url=${scene.url}&hue=${theme.shift}` : scene.url;
  }
}
