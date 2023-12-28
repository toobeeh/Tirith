/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "themes";

/** Response containing a theme's share id. */
export interface ThemeShareReply {
  id: string;
}

/** Response containing a theme JSON */
export interface ThemeDataReply {
  themeJson: string;
}

/** Response containing a published theme listing */
export interface ThemeListingReply {
  id: string;
  name: string;
  author: string;
  downloads: number;
  version: number;
}

/** Request containing theme data for sharing */
export interface ShareThemeRequest {
  themeJson: string;
}

/** Request containing a theme id */
export interface GetThemeRequest {
  id: string;
  incrementDownloads: boolean;
}

/** Request containing a theme id and the owner who publishes it */
export interface PublishThemeRequest {
  id: string;
  owner: string;
}

/** Request containing a theme id and the id to fetch the new theme from */
export interface UpdateThemeRequest {
  id: string;
  newId: string;
}

function createBaseThemeShareReply(): ThemeShareReply {
  return { id: "" };
}

export const ThemeShareReply = {
  encode(message: ThemeShareReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ThemeShareReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseThemeShareReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ThemeShareReply {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: ThemeShareReply): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },
};

function createBaseThemeDataReply(): ThemeDataReply {
  return { themeJson: "" };
}

export const ThemeDataReply = {
  encode(message: ThemeDataReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.themeJson !== "") {
      writer.uint32(10).string(message.themeJson);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ThemeDataReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseThemeDataReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.themeJson = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ThemeDataReply {
    return { themeJson: isSet(object.themeJson) ? globalThis.String(object.themeJson) : "" };
  },

  toJSON(message: ThemeDataReply): unknown {
    const obj: any = {};
    if (message.themeJson !== "") {
      obj.themeJson = message.themeJson;
    }
    return obj;
  },
};

function createBaseThemeListingReply(): ThemeListingReply {
  return { id: "", name: "", author: "", downloads: 0, version: 0 };
}

export const ThemeListingReply = {
  encode(message: ThemeListingReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.author !== "") {
      writer.uint32(26).string(message.author);
    }
    if (message.downloads !== 0) {
      writer.uint32(32).int32(message.downloads);
    }
    if (message.version !== 0) {
      writer.uint32(40).int32(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ThemeListingReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseThemeListingReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.author = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.downloads = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.version = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ThemeListingReply {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      author: isSet(object.author) ? globalThis.String(object.author) : "",
      downloads: isSet(object.downloads) ? globalThis.Number(object.downloads) : 0,
      version: isSet(object.version) ? globalThis.Number(object.version) : 0,
    };
  },

  toJSON(message: ThemeListingReply): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.author !== "") {
      obj.author = message.author;
    }
    if (message.downloads !== 0) {
      obj.downloads = Math.round(message.downloads);
    }
    if (message.version !== 0) {
      obj.version = Math.round(message.version);
    }
    return obj;
  },
};

function createBaseShareThemeRequest(): ShareThemeRequest {
  return { themeJson: "" };
}

export const ShareThemeRequest = {
  encode(message: ShareThemeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.themeJson !== "") {
      writer.uint32(10).string(message.themeJson);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ShareThemeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseShareThemeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.themeJson = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ShareThemeRequest {
    return { themeJson: isSet(object.themeJson) ? globalThis.String(object.themeJson) : "" };
  },

  toJSON(message: ShareThemeRequest): unknown {
    const obj: any = {};
    if (message.themeJson !== "") {
      obj.themeJson = message.themeJson;
    }
    return obj;
  },
};

function createBaseGetThemeRequest(): GetThemeRequest {
  return { id: "", incrementDownloads: false };
}

export const GetThemeRequest = {
  encode(message: GetThemeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.incrementDownloads === true) {
      writer.uint32(16).bool(message.incrementDownloads);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetThemeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetThemeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.incrementDownloads = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetThemeRequest {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      incrementDownloads: isSet(object.incrementDownloads) ? globalThis.Boolean(object.incrementDownloads) : false,
    };
  },

  toJSON(message: GetThemeRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.incrementDownloads === true) {
      obj.incrementDownloads = message.incrementDownloads;
    }
    return obj;
  },
};

function createBasePublishThemeRequest(): PublishThemeRequest {
  return { id: "", owner: "" };
}

export const PublishThemeRequest = {
  encode(message: PublishThemeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PublishThemeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublishThemeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.owner = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PublishThemeRequest {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
    };
  },

  toJSON(message: PublishThemeRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    return obj;
  },
};

function createBaseUpdateThemeRequest(): UpdateThemeRequest {
  return { id: "", newId: "" };
}

export const UpdateThemeRequest = {
  encode(message: UpdateThemeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.newId !== "") {
      writer.uint32(18).string(message.newId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateThemeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateThemeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.newId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateThemeRequest {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      newId: isSet(object.newId) ? globalThis.String(object.newId) : "",
    };
  },

  toJSON(message: UpdateThemeRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.newId !== "") {
      obj.newId = message.newId;
    }
    return obj;
  },
};

/** Service definition for theme resource access */
export type ThemesDefinition = typeof ThemesDefinition;
export const ThemesDefinition = {
  name: "Themes",
  fullName: "themes.Themes",
  methods: {
    /** Gets all themes */
    getPublishedThemes: {
      name: "GetPublishedThemes",
      requestType: Empty,
      requestStream: false,
      responseType: ThemeListingReply,
      responseStream: true,
      options: {},
    },
    /** Gets an theme by its id */
    getThemeById: {
      name: "GetThemeById",
      requestType: GetThemeRequest,
      requestStream: false,
      responseType: ThemeDataReply,
      responseStream: false,
      options: {},
    },
    /** Publishes a theme */
    publishTheme: {
      name: "PublishTheme",
      requestType: PublishThemeRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** Shares a theme */
    shareTheme: {
      name: "ShareTheme",
      requestType: ShareThemeRequest,
      requestStream: false,
      responseType: ThemeShareReply,
      responseStream: false,
      options: {},
    },
    /** Updates a published theme */
    updateTheme: {
      name: "UpdateTheme",
      requestType: UpdateThemeRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface ThemesServiceImplementation<CallContextExt = {}> {
  /** Gets all themes */
  getPublishedThemes(
    request: Empty,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<ThemeListingReply>;
  /** Gets an theme by its id */
  getThemeById(request: GetThemeRequest, context: CallContext & CallContextExt): Promise<ThemeDataReply>;
  /** Publishes a theme */
  publishTheme(request: PublishThemeRequest, context: CallContext & CallContextExt): Promise<Empty>;
  /** Shares a theme */
  shareTheme(request: ShareThemeRequest, context: CallContext & CallContextExt): Promise<ThemeShareReply>;
  /** Updates a published theme */
  updateTheme(request: UpdateThemeRequest, context: CallContext & CallContextExt): Promise<Empty>;
}

export interface ThemesClient<CallOptionsExt = {}> {
  /** Gets all themes */
  getPublishedThemes(request: Empty, options?: CallOptions & CallOptionsExt): AsyncIterable<ThemeListingReply>;
  /** Gets an theme by its id */
  getThemeById(request: GetThemeRequest, options?: CallOptions & CallOptionsExt): Promise<ThemeDataReply>;
  /** Publishes a theme */
  publishTheme(request: PublishThemeRequest, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  /** Shares a theme */
  shareTheme(request: ShareThemeRequest, options?: CallOptions & CallOptionsExt): Promise<ThemeShareReply>;
  /** Updates a published theme */
  updateTheme(request: UpdateThemeRequest, options?: CallOptions & CallOptionsExt): Promise<Empty>;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export type ServerStreamingMethodResult<Response> = { [Symbol.asyncIterator](): AsyncIterator<Response, void> };
