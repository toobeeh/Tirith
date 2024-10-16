import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {catchError, Observable} from "rxjs";
import {EmojiDto, EmojisService} from "../../../../api";
import {ToastService} from "../../../shared/services/toast.service";

@Component({
  selector: 'app-emojis',
  templateUrl: './emojis.component.html',
  styleUrls: ['./emojis.component.css']
})
export class EmojisComponent implements OnInit {

  public emotes$?: Observable<EmojiDto[]>;

  public filterInput = new FormControl("");
  public limitInput = new FormControl(500);

  constructor(private emojiService: EmojisService, private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.loadEmotes();
  }

  loadEmotes() {
    this.emotes$ = this.emojiService.getAllEmojis(this.limitInput.value ?? 10000, true, true, this.filterInput.value ?? "").pipe(catchError(e => {
      this.toastService.show({message: {title: "Failed to search emojis", content: e.status}, durationMs: 3000});
      throw e;
    }));
  }

  removeEmote(emoji: EmojiDto, event: MouseEvent) {
    this.emojiService.deleteEmoji(emoji.name, emoji.nameId).pipe(catchError(e => {
      this.toastService.show({message: {title: "Failed to delete emote", content: e.status}, durationMs: 3000});
      throw e;
    })).subscribe(() => {
      (event.target as HTMLElement).closest(".emote")?.remove();
    });
  }
}
