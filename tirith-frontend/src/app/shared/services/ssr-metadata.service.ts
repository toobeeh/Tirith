import { Inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { HOST_URL } from '../tokens/hostUrl.token';
import { Router } from '@angular/router';

@Injectable()
export class SsrMetadataService {

  private readonly defaultMetadata = {
    title: "Typo.rip ⚰️",
    description: "Skribbl Typo is the most advanced toolbox for skribbl.io. Theme skribbl, find friends and draw better.",
    keywords: ["skribbl", "typo", "skribbltypo", "ipad", "Pressure support", "friend finder", "fullscreen mode", "dark mode", "themes", "emojis", "download image", "create gif", "post image on discord", "connect discord", "player sprites", "random color", "canvas zoom", "straight lines", "free draw", "image template", "gallery cloud", "draw over", " mute players", "commands", "chat focus", "extension", "browser", "palette", "tobeh"],
    themeColor: "#36aac7",
    ogTitle: "typo.rip",
    ogSiteName: "skribbl typo ✨ by @tobeh",
    ogDescription: `💎 Skribbl Typo is the most advanced toolbox for skribbl.io.
    🖌️ Customize skribbl, find friends and draw better.
    👀 Get it for Chrome, Firefox, Opera and Edge.`,
    ogImage: "https://www.typo.rip/res/og-image.png",
    ogImageType: "image/png",
    ogImageWidth: "1200",
    ogImageHeight: "630",
    author: "tobeh",
    twitterCard: "summary_large_image"
  };

  private addedTags: HTMLMetaElement[] = [];

  constructor(private metaService: Meta, private titleService: Title, @Inject(HOST_URL) private hostUrl: string, private router: Router) { }

  public updateMetadata(metadata?: Partial<SsrMetadataService["defaultMetadata"]>, defaults: boolean = true, index: boolean = true): void {
    const pageMetadata = defaults ? { ...this.defaultMetadata, ...metadata } : (metadata ?? {});
    const metatags: MetaDefinition[] = this.generateMetaDefinitions(pageMetadata);

    const tags = [
      ...metatags,
      { property: 'og:url', content: `${this.hostUrl}${this.router.url}` },
      { name: 'robots', content: index ? 'index, follow' : 'noindex' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
    ];

    this.addedTags.forEach(t => t.remove());
    this.addedTags = this.metaService.addTags(tags);

    this.titleService.setTitle(pageMetadata.title ?? this.defaultMetadata.title);
  }

  private generateMetaDefinitions(metadata: Partial<SsrMetadataService["defaultMetadata"]>): MetaDefinition[] {
    return [
      metadata.title ? { name: 'title', content: metadata.title } : null,
      metadata.ogTitle ? { property: 'og:title', content: metadata.ogTitle } : null,
      metadata.ogSiteName ? { property: 'og:site_name', content: metadata.ogSiteName } : null,

      metadata.description ? { name: 'description', content: metadata.description } : null,
      metadata.ogDescription ? { property: 'og:description', content: metadata.ogDescription } : null,

      metadata.author ? { name: 'author', content: metadata.author } : null,
      metadata.author ? { property: 'og:author', content: metadata.author } : null,

      metadata.keywords ? { name: 'keywords', content: metadata.keywords.join(', ') } : null,

      metadata.ogImage ? { property: 'og:image', content: metadata.ogImage } : null,
      metadata.ogImageType ? { property: 'og:image:type', content: metadata.ogImageType } : null,
      metadata.ogImageWidth ? { property: 'og:image:width', content: metadata.ogImageWidth } : null,
      metadata.ogImageHeight ? { property: 'og:image:height', content: metadata.ogImageHeight } : null,
      metadata.ogImage ? { name: 'twitter:image', content: metadata.ogImage } : null,
      metadata.twitterCard ? { name: "twitter:card", content: "summary_large_image" } : null,

      metadata.themeColor ? { name: 'theme-color', content: metadata.themeColor } : null,

    ].filter(e => e != null) as MetaDefinition[];
  }
}
