/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "emojis";

export interface SearchEmojisMessage {
  name: string;
  animated: boolean;
  static: boolean;
  maxCount: number;
}

export interface EmojiCandidateMessage {
  url: string;
  animated: boolean;
  name: string;
}

export interface EmojiMessage {
  id: EmojiIdentificationMessage | undefined;
  url: string;
  animated: boolean;
}

export interface EmojiIdentificationMessage {
  name: string;
  nameId: number;
}

function createBaseSearchEmojisMessage(): SearchEmojisMessage {
  return { name: "", animated: false, static: false, maxCount: 0 };
}

export const SearchEmojisMessage = {
  encode(message: SearchEmojisMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.animated === true) {
      writer.uint32(16).bool(message.animated);
    }
    if (message.static === true) {
      writer.uint32(24).bool(message.static);
    }
    if (message.maxCount !== 0) {
      writer.uint32(32).int32(message.maxCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SearchEmojisMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSearchEmojisMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.animated = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.static = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.maxCount = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SearchEmojisMessage {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      animated: isSet(object.animated) ? globalThis.Boolean(object.animated) : false,
      static: isSet(object.static) ? globalThis.Boolean(object.static) : false,
      maxCount: isSet(object.maxCount) ? globalThis.Number(object.maxCount) : 0,
    };
  },

  toJSON(message: SearchEmojisMessage): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.animated === true) {
      obj.animated = message.animated;
    }
    if (message.static === true) {
      obj.static = message.static;
    }
    if (message.maxCount !== 0) {
      obj.maxCount = Math.round(message.maxCount);
    }
    return obj;
  },
};

function createBaseEmojiCandidateMessage(): EmojiCandidateMessage {
  return { url: "", animated: false, name: "" };
}

export const EmojiCandidateMessage = {
  encode(message: EmojiCandidateMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.url !== "") {
      writer.uint32(10).string(message.url);
    }
    if (message.animated === true) {
      writer.uint32(16).bool(message.animated);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EmojiCandidateMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmojiCandidateMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.url = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.animated = reader.bool();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EmojiCandidateMessage {
    return {
      url: isSet(object.url) ? globalThis.String(object.url) : "",
      animated: isSet(object.animated) ? globalThis.Boolean(object.animated) : false,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
    };
  },

  toJSON(message: EmojiCandidateMessage): unknown {
    const obj: any = {};
    if (message.url !== "") {
      obj.url = message.url;
    }
    if (message.animated === true) {
      obj.animated = message.animated;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },
};

function createBaseEmojiMessage(): EmojiMessage {
  return { id: undefined, url: "", animated: false };
}

export const EmojiMessage = {
  encode(message: EmojiMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      EmojiIdentificationMessage.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    if (message.animated === true) {
      writer.uint32(24).bool(message.animated);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EmojiMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmojiMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = EmojiIdentificationMessage.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.url = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.animated = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EmojiMessage {
    return {
      id: isSet(object.id) ? EmojiIdentificationMessage.fromJSON(object.id) : undefined,
      url: isSet(object.url) ? globalThis.String(object.url) : "",
      animated: isSet(object.animated) ? globalThis.Boolean(object.animated) : false,
    };
  },

  toJSON(message: EmojiMessage): unknown {
    const obj: any = {};
    if (message.id !== undefined) {
      obj.id = EmojiIdentificationMessage.toJSON(message.id);
    }
    if (message.url !== "") {
      obj.url = message.url;
    }
    if (message.animated === true) {
      obj.animated = message.animated;
    }
    return obj;
  },
};

function createBaseEmojiIdentificationMessage(): EmojiIdentificationMessage {
  return { name: "", nameId: 0 };
}

export const EmojiIdentificationMessage = {
  encode(message: EmojiIdentificationMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.nameId !== 0) {
      writer.uint32(16).int32(message.nameId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EmojiIdentificationMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmojiIdentificationMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.nameId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EmojiIdentificationMessage {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      nameId: isSet(object.nameId) ? globalThis.Number(object.nameId) : 0,
    };
  },

  toJSON(message: EmojiIdentificationMessage): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.nameId !== 0) {
      obj.nameId = Math.round(message.nameId);
    }
    return obj;
  },
};

export type EmojisDefinition = typeof EmojisDefinition;
export const EmojisDefinition = {
  name: "Emojis",
  fullName: "emojis.Emojis",
  methods: {
    loadNewEmojiCandidates: {
      name: "LoadNewEmojiCandidates",
      requestType: SearchEmojisMessage,
      requestStream: false,
      responseType: EmojiCandidateMessage,
      responseStream: true,
      options: {},
    },
    listEmojis: {
      name: "ListEmojis",
      requestType: SearchEmojisMessage,
      requestStream: false,
      responseType: EmojiMessage,
      responseStream: true,
      options: {},
    },
    addEmoji: {
      name: "AddEmoji",
      requestType: EmojiCandidateMessage,
      requestStream: false,
      responseType: EmojiIdentificationMessage,
      responseStream: false,
      options: {},
    },
    removeEmoji: {
      name: "RemoveEmoji",
      requestType: EmojiIdentificationMessage,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    getEmoji: {
      name: "GetEmoji",
      requestType: EmojiIdentificationMessage,
      requestStream: false,
      responseType: EmojiMessage,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface EmojisServiceImplementation<CallContextExt = {}> {
  loadNewEmojiCandidates(
    request: SearchEmojisMessage,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<EmojiCandidateMessage>;
  listEmojis(
    request: SearchEmojisMessage,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<EmojiMessage>;
  addEmoji(request: EmojiCandidateMessage, context: CallContext & CallContextExt): Promise<EmojiIdentificationMessage>;
  removeEmoji(request: EmojiIdentificationMessage, context: CallContext & CallContextExt): Promise<Empty>;
  getEmoji(request: EmojiIdentificationMessage, context: CallContext & CallContextExt): Promise<EmojiMessage>;
}

export interface EmojisClient<CallOptionsExt = {}> {
  loadNewEmojiCandidates(
    request: SearchEmojisMessage,
    options?: CallOptions & CallOptionsExt,
  ): AsyncIterable<EmojiCandidateMessage>;
  listEmojis(request: SearchEmojisMessage, options?: CallOptions & CallOptionsExt): AsyncIterable<EmojiMessage>;
  addEmoji(request: EmojiCandidateMessage, options?: CallOptions & CallOptionsExt): Promise<EmojiIdentificationMessage>;
  removeEmoji(request: EmojiIdentificationMessage, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  getEmoji(request: EmojiIdentificationMessage, options?: CallOptions & CallOptionsExt): Promise<EmojiMessage>;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export type ServerStreamingMethodResult<Response> = { [Symbol.asyncIterator](): AsyncIterator<Response, void> };
