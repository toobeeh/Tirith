import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Color, ColorEvent } from 'ngx-color';
import { SpriteDto, SpritesService } from 'src/api';
import { ToastService } from 'src/app/shared/services/toast.service';
import { TinyColor } from '@ctrl/tinycolor'

enum colorInput {
  header = "Header Color",
  light = "Light Color",
  dark = "Dark Color",
  backgroundOpacity = "Background Opacity"
}

@Component({
  selector: 'app-card-builder',
  templateUrl: './card-builder.component.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CardBuilderComponent {

  private activeColorInput: colorInput = colorInput.header;
  private templateSvg = "";
  private templateProfilePicture = "";
  private templateSpriteCombo = "";
  private imgur?: { imgurTag: string, cardBase64: string };
  private readonly emptyBase64_1x1 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

  public loadingImage = false;
  public colors = new Map<colorInput, string>();
  public backgroundUrlInput = new FormControl<string | null>(null);
  public readonly inputModes = Object.entries(colorInput);

  constructor(private toastService: ToastService) {
    this.initAsync();
  }

  async initAsync() {
    this.templateSvg = await (await fetch("/assets/card-template.svg")).text();
    this.templateProfilePicture = this.getCroppedImageBackground(await this.loadImage("/assets/profile-template.jpg", false), 320, 320);
    this.templateSpriteCombo = this.getCroppedImageBackground(await this.loadImage("/assets/combo-template.png", false), 80, 80);
    this.updateCustomcard();
  }

  setActiveMode(mode: colorInput) {
    this.activeColorInput = mode;
  }

  getActiveMode() {
    return this.activeColorInput;
  }

  getInputAllowedForMode(input: "alpha" | "hue" | "tone") {
    const mode = this.activeColorInput;
    if (input == "alpha") return mode !== colorInput.dark && mode !== colorInput.light;
    if (input == "hue") return mode !== colorInput.backgroundOpacity;
    if (input == "tone") return mode !== colorInput.backgroundOpacity;
    throw new Error("invalid mode");
  }

  getModeDefault(mode: colorInput) {
    if (mode == colorInput.backgroundOpacity) return "#ffffff99";
    if (mode == colorInput.dark) return "#919191"
    if (mode == colorInput.light) return "#fff"
    else return "#1682d1";
  }

  getColorOfMode() {
    if (!this.colors.get(this.activeColorInput)) {
      this.colors.set(this.activeColorInput, this.getModeDefault(this.activeColorInput));
    }
    return this.colors.get(this.activeColorInput)!;
  }

  colorChanged(event: ColorEvent) {
    const color = new TinyColor(event.color.rgb).toHex8String();
    this.colors.set(this.activeColorInput, color);

    this.updateCustomcard();
  }

  getCurrentColorConfig() {
    const bgOpacity = (Math.round(new TinyColor(this.colors.get(colorInput.backgroundOpacity) ?? this.getModeDefault(colorInput.backgroundOpacity)).getAlpha() * 100) / 100).toString();
    const lightText = new TinyColor(this.colors.get(colorInput.light) ?? this.getModeDefault(colorInput.light)).toHexString();
    const darkText = new TinyColor(this.colors.get(colorInput.dark) ?? this.getModeDefault(colorInput.dark)).toHexString();
    const headerColor = new TinyColor(this.colors.get(colorInput.header) ?? this.getModeDefault(colorInput.header)).toHex8String();
    const headerOpacity = (Math.round(new TinyColor(this.colors.get(colorInput.header) ?? this.getModeDefault(colorInput.header)).getAlpha() * 100) / 100).toString();

    return { bgOpacity, lightText, darkText, headerColor, headerOpacity };
  }

  updateCustomcard() {
    const cardObject = document.querySelector("#cardObject") as HTMLObjectElement;

    const { bgOpacity, lightText, darkText, headerColor, headerOpacity } = this.getCurrentColorConfig();

    const headerStyle = `
      #header, #border {stroke: ${headerOpacity == "1" ? headerColor : "none"}}
      #header {fill: ${headerColor}; opacity: ${headerOpacity}}
      *{font-style:'Roboto' !important}
    `;

    const badgesStyle = `
      #early, #moderator * {opacity: .5}
    `;

    const svg = this.templateSvg
      .replaceAll("$username$", "General Kenobi")
      .replaceAll("$bubbles$", "1000 Bubbles")
      .replaceAll("$drops$", "100 Drops")
      .replaceAll("$dropratio$", "69: Space Jesus")
      .replaceAll("$firstseen$", "1.1.2000")
      .replaceAll("$sprites$", "0 bought")
      .replaceAll("$events$", "0")
      .replaceAll("$hours$", "666")
      .replaceAll("$brank$", " #1")
      .replaceAll("$drank$", " #1")
      .replaceAll("$lighttext$", lightText)
      .replaceAll("$darktext$", darkText)
      .replaceAll("$bgbase64$", this.imgur?.cardBase64 ?? this.emptyBase64_1x1)
      .replaceAll("$bgopacity$", bgOpacity)
      .replaceAll("$bgheight$", "332")
      .replaceAll("$servers$", "1")
      .replaceAll("data:image/png;base64,$profilebase64$", this.templateProfilePicture)
      .replaceAll("data:image/png;base64,$spritebase64$", this.templateSpriteCombo)
      .replaceAll("$customstyle$", headerStyle + badgesStyle);

    cardObject.contentDocument!.firstElementChild!.innerHTML = svg;
  }

  async setBackgroundImage(url: string | null) {
    if (url === null) {
      this.toastService.show({ message: { title: "Invalid URL", content: "Please enter a URL which points to an image." } });
      return;
    }

    try {
      this.loadingImage = true;
      this.imgur = await this.uploadImageToImgur(url);
    }
    catch (e: any) {
      this.toastService.show({ message: { title: "Failed to process image", content: e.toString() } });
      return;
    }
    finally {
      this.loadingImage = false;
    }

    this.updateCustomcard();
  }

  getCommandName() {
    const colors = this.getCurrentColorConfig();
    const tag = this.imgur?.imgurTag ?? "-";

    return `>customcard ${colors.headerColor.slice(0, -2)} ${colors.lightText} ${colors.darkText} ${tag} ${colors.bgOpacity} ${colors.headerOpacity}`
  }

  /* HELPERS FOR PROCESSING BACKGROUND */

  async uploadImageToImgur(url: string) {
    let image: HTMLImageElement;
    try {
      image = await this.loadImage(url, false);
    }
    catch {
      this.toastService.show({ message: { title: "Be patient...", content: "This image might take longer to load, since the source does not allow direct access.\nTry sources like discord for faster processng." } });
      image = await this.loadImage(url);
    }

    const croppedImage = this.getCroppedImageBackground(image);

    const formdata = new FormData();
    formdata.append("image", this.dataUriToBlob(croppedImage));
    const response = await (await fetch("https://api.imgur.com/3/image/", {
      method: "post",
      headers: {
        Authorization: "Client-ID f35028dc12789c5"
      },
      body: formdata
    })).json();

    if (response.status !== 200) throw new Error("Failed to upload to imgur")

    const cardBase64 = croppedImage.replace("data:image/png;base64,", "");
    const imgurTag = (response.data.link as string).replace("https://i.imgur.com/", "");
    return { cardBase64, imgurTag };
  }

  dataUriToBlob(dataUri: string) {
    const splitDataURI = dataUri.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  }

  async loadImage(url: string, cors: boolean = true) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = function () {
        resolve(img);
      }
      img.onerror = (e) => { reject("Could not load image from source URL.") };
      img.src = cors ? "https://api.allorigins.win/raw?url=" + encodeURI(url) : url;
    });
  }

  getBackgroundCropPosition(originalWidth: number, originalHeight: number, ratio: number) {
    let height, cropX, cropY, width;
    if (originalWidth / originalHeight > ratio) height = originalHeight;
    else height = originalWidth / ratio;

    width = ratio * height;
    cropX = (originalWidth - width) / 2;
    cropY = (originalHeight - height) / 2;

    return { h: height, w: width, x: cropX, y: cropY };
  }

  getCroppedImageBackground(img: HTMLImageElement, width: number = 1024, height: number = 695) {
    let cropPosition = this.getBackgroundCropPosition(img.width, img.height, width / height);
    let canvas = document.createElement("canvas");
    canvas.height = height;
    canvas.width = width;
    canvas.getContext("2d")!.drawImage(img, cropPosition.x, cropPosition.y, cropPosition.w, cropPosition.h, 0, 0, width, height);
    return canvas.toDataURL();
  }
}
