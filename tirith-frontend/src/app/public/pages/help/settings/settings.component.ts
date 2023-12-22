import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, Subject, of } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements AfterViewInit {

  @ViewChild("frame")
  frame?: ElementRef<HTMLIFrameElement>;

  info = "Click a button to reveal what the setting does!";

  constructor(private cdr: ChangeDetectorRef) { }

  async ngAfterViewInit() {
    const html = await this.getHtml();
    const iframe = this.frame!.nativeElement;

    iframe.onload = () => {
      const brect = iframe.contentDocument!.body.getBoundingClientRect();
      iframe.style.height = (brect.height + brect.top * 2) + "px";
      iframe.style.width = (brect.width + brect.left * 2) + "px";

      iframe.contentDocument!.body.addEventListener("click", (e) => {
        const target = e.target as any;

        if (!target.id) return;
        const info = this.getInfo(target.id) ?? (this.getInfo(target.parentElement.id)/*  ?? `Info for ${target.id} not added yet!` */);
        if (!info) return;
        this.info = info;
        console.log(this);
        this.cdr.detectChanges();
      });
    };

    this.frame!.nativeElement.srcdoc = html;
  }

  /**
   * hacky thing to build a pseudo-popup as dynamically as possible from typo sources
   * @returns
   */
  async getHtml() {
    let popup = await (await (fetch("https://rawcdn.githack.com/toobeeh/skribbltypo/master/popup/popup.html"))).text();

    popup = popup.replace("popup.css", "https://rawcdn.githack.com/toobeeh/skribbltypo/master/popup/popup.css");
    popup = popup.replace("jquery.js", "https://rawcdn.githack.com/toobeeh/skribbltypo/master/popup/jquery.js");
    popup = popup.replace("popup.js", "https://rawcdn.githack.com/toobeeh/skribbltypo/master/popup/popup.js");


    const polyfill = `
      chrome = {
        tabs: {
          query: (x, y) => y([{url: "skribbl.io"}]),
          sendMessage: (x, y) => { }
        },
        runtime: { onMessage: { addListener: (a) => { a({settings: "{}"}, { tab: { id: 0}}); }}}
      };
    `;
    popup = popup.replace("<head>", `<head><script>${polyfill}</script>`);

    return popup;
  }

  getInfo(id: string) {
    let info: string | undefined = "";
    // get info string of element
    if (id == 'agent') {
      info = "ImageAgent \n\n"
      info += "When it's your turn to draw, you can choose to display a small picture of the term to draw above the chat.";
      info += "\nYou can choose between topics (logo, flag, or just the term) or enter your own term to search.\n\n"
      info += "Click on the image to show the next search result."
    }
    else if (id == 'markup') {
      info = "Markup \n\n"
      info += "Changes the background color of your chat messages so it's easier for you to keep view.\n";
    }
    else if (id == 'controls') {
      info = "Side Controls \n\n"
      info += "Show or hide side controls like sound, fullscreen, gallery cloud and tablet mode.\n";
    }
    else if (id == 'typoink') {
      info = "Typo Pressure \n\n"
      info += "Typo pressure modifies how pressure sensitivity works:\nInstead of using a thickness range around the selected brushsize, it will use the full range always.\n";
      info += "You can customize the sensitivity in the advanced tab.";
    }
    else if (id == 'awardfx') {
      info = "Award FX \n\n"
      info += "Enables or disables the award effect on the canvas when someone receives an award.";
    }
    else if (id == 'drops') {
      info = "Drops \n\n"
      info += "Set if you want to see and catch Palantir drops, if you're logged in to Palantir.\n";
    }
    else if (id == 'charbar') {
      info = "CharBar \n\n"
      info += "Displays a small field under the chat input. The color indicates if the typed text matches the word length/hints.";
    }
    else if (id == 'emojipicker') {
      info = "Emoji Picker \n\n"
      info += "Displays an emoji-picker like in Discord when you type something after a :.";
    }
    else if (id == 'dropmsgs') {
      info = "Drop Statistics \n\n"
      info += "Toggles the long messages where you can see the statistics for each caught drop.\n";
    }
    else if (id == 'zoomdraw') {
      info = "Zoom Draw \n\n"
      info += "Draw more precise by zooming. Press shift and click where you want to zoom to.\n The choose a level by pressing a number key.\nExit with Shift + Click again.\n";
    }
    else if (id == 'originalPalette') {
      info = "Original Palette\n\n"
      info += "Choose of color palettes! Default palette is the original skribbl palette. \nGet more colors by choosing the sketchful palette!\n";
    }
    else if (id == 'paletteJSON' || id == 'enterJSON') {
      info = "Palette JSON \n\n"
      info += "Create a custom color palette!\nThe palette has to be created in JSON format, example given:\n"
        + '{"rowCount":13, "name":"sketchfulPalette", "colors":[{"color":"rgb(255, 255, 255)","index":100},{"color":"rgb(211, 209, 210)","index":101},{"color":"rgb(247, 15, 15)","index":102},{"color":"rgb(255, 114, 0)","index":103},{"color":"rgb(252, 231, 0)","index":104},{"color":"rgb(2, 203, 0)","index":105}]}\n'
        + "That's an incomplete sketchful palette.\n"
        + "The JSON has to contain following things:\n"
        + "- rowCount: the count of color boxes in a row, important for the formatting\n"
        + "- name: the name of the palette; just don't choose anything too fancy\n"
        + "- colors: the colors. They contain of two things:\n"
        + "- index: rather an id than index, but that's how it is called in skribbl. Important that NONE of your colors have an index of a color of another palette! \nSkribbl colors have indexes from 0-20, the sketchful palette from 100 to 138. Choose anything else.\n"
        + "- color: your color. Can be in hex, rgb, anything (rgba didn't work).\n";
    }
    else if (id == 'commands') {
      info = "Commands \n\n"
      info += "Access features quickly by chat commands. View all with 'help--'. Handy examples are 'like--', 'shame--' and 'kick--'.\n";
    }
    else if (id == 'randomToggle') {
      info = "Random Color \n\n"
      info += "Switches the brush color automatically (VERY fast). Doesn't set white.\n";
      info += "\nClick the dice in the color field to activate and click any color to deactivate.\n Also shows a color picker for private rounds.\nOnyl Typo users see those colors!";
    }
    else if (id == 'palantir') {
      info = "Discord Status \n\n"
      info += "When discord status is activated, you send data about your lobby to Palantir.\nPalantir will show the lobby to all your connected servers.\n";
      info += "If you want to stay incongito, turn this off - absolutely no data will be sent.";
    }
    else if (id == 'quickreact') {
      info = "QuickReact \n\n"
      info += "Press CTRL when the chat box is focused and select a quick action with the arrow keys.\n";
      info += "Makes kicking, liking and disliking easier.";
    }
    else if (id == 'typotools') {
      info = "Typo Tools \n\n"
      info += "Adds icons to the toolbar which unlock the features Brush Lab, Random Color and Color Picker.\n";
    }
    else if (id == 'help') {
      info = "Hello there! ❤️\n\n"
      info += "Typo is on patreon. Consider to support me :>";
    }
    else if (id == 'chatcommands') {
      info = "Chat Commands\n\n"
      info += "Chat commands let you run actions like like/kick/dislike or changing all this settings from the chat. Type 'help--' in the chabox to see the commands!";
    }
    else if (id == 'sensSlider') {
      info = "Sensitivity \n\n"
      info += "Set the pressure sensitivity of the tablet.\n";
      info += "Very low will probably fit best; check out your graphics tablet driver for deeper control.\n";
    }
    else if (id == 'markupSlider') {
      info = "Markup Color \n\n"
      info += "Set color of the markup for your chat messages.\n";
      info += "The slider thumb indicates the selected color.\n";
    }
    else if (id == 'randomSlider') {
      info = "Random Interval \n\n"
      info += "Sets the interval of random color switches.\n";
      info += "Minimum is 10ms, maximum 500ms.\n";
    }
    else info = undefined;

    return info;
  }

}
