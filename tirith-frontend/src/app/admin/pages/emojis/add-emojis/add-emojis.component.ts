import {Component, OnInit} from '@angular/core';
import {catchError, Observable} from "rxjs";
import {EmojiDto, EmojisService} from "../../../../../api";
import {FormControl} from "@angular/forms";
import {ToastService} from "../../../../shared/services/toast.service";

@Component({
  selector: 'app-add-emojis',
  templateUrl: './add-emojis.component.html',
  styleUrls: ['./add-emojis.component.css']
})
export class AddEmojisComponent implements OnInit {

  public emotes$?: Observable<EmojiDto[]>;
  public editEmote?: EmojiDto;

  public filterInput = new FormControl("");
  public limitInput = new FormControl(100);
  public nameInput = new FormControl("");

  private lastEmoteClicks: Map<string, number> = new Map<string, number>();

  constructor(private emojiService: EmojisService, private notifications: ToastService) {
  }

  ngOnInit(): void {  }

  loadAnimatedEmotes() {
    if(this.limitInput.value !== null && this.limitInput.value > 1000) {
      this.notifications.show({message: {
          title: "Nerfed",
          content: "You can't load more than 1000 emotes at once"
        }});
      return;
    }
    this.emotes$ = this.emojiService.getNewEmojis(this.limitInput.value ?? 100, true, false, this.filterInput.value ?? "").pipe(catchError(e => {
      this.notifications.show({message: {title: "Failed to search animated emojis", content: e.status}, durationMs: 3000});
      throw e;
    }));
  }

  loadStaticEmotes() {
    if(this.limitInput.value !== null && this.limitInput.value > 1000) {
      this.notifications.show({message: {
          title: "Nerfed",
          content: "You can't load more than 1000 emotes at once"
        }});
      return;
    }
    this.emotes$ = this.emojiService.getNewEmojis(this.limitInput.value ?? 100, false, true, this.filterInput.value ?? "").pipe(catchError(e => {
      this.notifications.show({message: {title: "Failed to search static emojis", content: e.status}, durationMs: 3000});
      throw e;
    }));
  }

  emoteEditClicked(emote: EmojiDto) {
    if(this.editEmote == emote) this.editEmote = undefined;
    else {
      this.editEmote = emote;
      this.nameInput.setValue(emote.name);
    }
  }

  async selectEmote(emote: EmojiDto, event: MouseEvent){
    event.preventDefault();
    event.stopPropagation();

    this.emojiService.addEmoji(emote).pipe(catchError(e => {
      this.notifications.show({message: {title: "Failed to add emote", content: e.status}, durationMs: 3000});
      throw e;
    })).subscribe(data => {
      (event.target as HTMLElement).closest(".emote")?.remove();
    });
  }

  renameEmote(emoji: EmojiDto, event: MouseEvent){
    event.stopPropagation();
    emoji.name = this.nameInput.value ?? "";
    this.emoteEditClicked(emoji);
  }

  removeEmote(event: MouseEvent){
    event.preventDefault();
    (event.target as HTMLElement).remove();
  }
}
