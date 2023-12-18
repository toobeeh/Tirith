import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';
import { GuildDto, MemberDto, MembersService, SceneDto, ScenesService, SpriteDto, SpritesService } from 'src/api';
import { UserService } from 'src/app/shared/services/user-session.service';

interface sceneInv {
  dto: SceneDto;
  inv: {
    active: boolean;
    id: number;
  } | undefined;
};

interface spriteInv {
  dto: SpriteDto;
  inv: {
    active: number;
    id: number;
  } | undefined;
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  public user$;

  constructor(private userService: UserService, private spritesService: SpritesService, private scenesService: ScenesService, private router: Router) {
    this.user$ = this.userService.getUser().pipe(
      switchMap(user => this.getScenes(user).pipe(map(scenes => ({ user, scenes })))),
      switchMap(data => this.getSprites(data.user).pipe(map(sprites => ({ ...data, sprites })))),
    );
  }

  public logout() {
    this.userService.logout();
    this.router.navigate(["/"]);
  }

  public getScenes(user: MemberDto) {

    const inv = user.scenes
      .split(",")
      .map(s => ({ active: s.startsWith("."), id: Number(s.replaceAll(".", "")) }))
      .filter(s => s.id > 0);

    return this.scenesService.getAllScenes().pipe(
      map(scenes => scenes.map(s => ({ dto: s, inv: inv.find(i => i.id == s.id) }))),
      map(scenes => scenes.filter(s => s.inv !== undefined))
    )
  }

  public getSprites(user: MemberDto) {

    const inv = user.sprites
      .split(",")
      .map(s => ({ active: s.lastIndexOf(".") + 1, id: Number(s.replaceAll(".", "")) }))
      .filter(s => s.id > 0);

    return this.spritesService.getAllSprites().pipe(
      map(sprites => sprites.map(s => ({ dto: s, inv: inv.find(i => i.id == s.id) }))),
      map(sprites => sprites.filter(s => s.inv !== undefined))
    )
  }

  public getActiveSceneUrl(inv: sceneInv[]) {
    return inv.find(s => s.inv?.active)?.dto.url;
  }

  public getActiveSpriteUrls(inv: spriteInv[]) {
    return inv.filter(s => s.inv?.active).sort((a, b) => a.inv!.active - b.inv!.active).map(s => s.dto.url);
  }

  public hasWebhooks(guild: GuildDto) {
    return guild.Webhooks?.length > 0;
  }

}
