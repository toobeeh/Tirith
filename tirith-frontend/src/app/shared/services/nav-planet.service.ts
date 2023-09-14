import { Injectable } from '@angular/core';

type navArray = Array<[string, string, "external" | "route", boolean?]>;

@Injectable({
  providedIn: 'root'
})
export class NavPlanetService {

  private navLinks: navArray = [];
  private openStyle?: HTMLStyleElement;
  private hideAllStyle?: HTMLStyleElement;

  public set content(value: navArray) {
    this.navLinks = value;
  }

  public get content() {
    return this.navLinks;
  }

  public get hideAll() {
    return this.hideAllStyle !== undefined;
  }

  public set hideAll(value: boolean) {
    if (this.hideAll === value) return;

    if (this.hideAllStyle) {
      this.hideAllStyle.remove();
    }
    else {
      const style = this.openStyle = document.createElement("style");
      document.head.appendChild(this.openStyle);
      style.id = "hideAllStyle";
      style.type = "text/css";
      this.hideAllStyle = style;

      style.innerHTML = `
        .backgroundLeft, .backgroundRight, #logoContainer, #footerSection { display:none !important};
      `;
    }
  }

  constructor() { }

  openNav(navPlanet: HTMLDivElement) {

    // get position of current planet peek
    let planRect = navPlanet.getBoundingClientRect();

    // create stylesheet
    const style = this.openStyle = document.createElement("style");
    document.head.appendChild(this.openStyle);
    style.id = "navStyle";
    style.type = "text/css";

    // make peek planet disappear and show the clone at exact the same position
    style.innerHTML = `
        #navPlanCont{
            opacity:0;
        }
        #navBack{
            opacity:0;
            position:fixed;
            z-index:99;
            background:black;
            width:100vw;
            height:100vh;
            top:0; left:0;
        }
        #navClone{
            display:flex;
            position:fixed;
            height:${planRect.height}px;
            width:${planRect.width}px;
            top:${planRect.top}px;
            left:${planRect.left}px;
            background-image: url(res/navPlan.gif);
            background-size: cover;
            z-index:100;
            /*filter: drop-shadow(0px 0px 1em rgba(255, 255, 255, 0.3));*/
            transition: all 0.5s ease !important;
        }
        .content {opacity: 0}
    `;
    // set the end position of the navigation planet; animates a zoom move to the center
    setTimeout(() => {
      style.innerHTML += `
        #navClone{
            height:80vh;
            width:80vh;
            top:10vh;
            animation-name:hopUp;
            animation-duration: 4s;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
            left:calc(50vw - 40vh);
        }
        #navClone h1{
            transition: opacity 0.5s;
            transition-delay: 0.25s;
            opacity: 1;
        }
        #navBack{opacity:0.7;}
        .backgroundSide{opacity:0 !important}
        .contentSection{opacity:0 !important}
    `;
    }, 50);
  }

  closeNav() {
    this.openStyle?.remove();
  }
}
