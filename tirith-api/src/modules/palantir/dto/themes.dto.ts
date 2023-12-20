import { XApiProperty } from "src/decorators/apiProperty.decorator";

export class ThemeMetaDto {

    @XApiProperty({ description: "Name of the theme creator" })
    author: string;

    @XApiProperty({ description: "Unix epoch ms representing the creation date" })
    created: number;

    @XApiProperty({ description: "Item type" })
    type: "theme";

    @XApiProperty({ description: "Local item id" })
    id: number;

    @XApiProperty({ description: "Name of the theme" })
    name: string;
}

export class ThemeDto {

    @XApiProperty({ description: "Skribbl color hooks settings" })
    colors: { [colorName: string]: number[] };

    @XApiProperty({ description: "Skribbl color hooks additional styles" })
    hooks: { [colorName: string]: any };

    @XApiProperty({ description: "Image settings" })
    images: { [imageName: string]: any };

    @XApiProperty({ description: "Miscellaneous settings" })
    misc: { [imageName: string]: any };

    @XApiProperty({ description: "Theme metadata" })
    meta: ThemeMetaDto;
}

export class ThemeShareDto {

    @XApiProperty({ description: "Public theme id / share" })
    id: string;
}

export class ThemeListingDto extends ThemeShareDto {

    @XApiProperty({ description: "Amount of downloads" })
    downloads: number;

    @XApiProperty({ description: "Version counter" })
    version: number;

    @XApiProperty({ description: "Name of the theme" })
    name: string;

    @XApiProperty({ description: "Name of the theme creator" })
    author: string;
}

export class ThemePublishRequestDto {

    @XApiProperty({ description: "Creator discord id" })
    owner: string;
}

export class ThemeUpdateRequestDto {

    @XApiProperty({ description: "The theme id of the updated theme" })
    newId: string;
}