/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import { FileChunkMessage } from "./content";

export const protobufPackage = "generator";

export interface ColorMapMessage {
  spriteId: number;
  hueShift: number;
}

export interface GenerateComboMessage {
  spriteIds: number[];
  colorMaps: ColorMapMessage[];
}

export interface GenerateCardMessage {
  settingsOwnerLogin: number;
  profileImageUrl: string;
  combo: GenerateComboMessage | undefined;
  username: string;
  bubbles: number;
  drops: number;
  dropRatio: number;
  firstSeen: string;
  spritesCount: number;
  eventsParticipated: number;
  eventsDropValue: number;
  bubbleRank: number;
  dropRank: number;
  serversConnected: number;
  isPatron: boolean;
  isEarlyUser: boolean;
  isModerator: boolean;
}

function createBaseColorMapMessage(): ColorMapMessage {
  return { spriteId: 0, hueShift: 0 };
}

export const ColorMapMessage = {
  encode(message: ColorMapMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.spriteId !== 0) {
      writer.uint32(8).int32(message.spriteId);
    }
    if (message.hueShift !== 0) {
      writer.uint32(24).int32(message.hueShift);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ColorMapMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseColorMapMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.spriteId = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.hueShift = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ColorMapMessage {
    return {
      spriteId: isSet(object.spriteId) ? globalThis.Number(object.spriteId) : 0,
      hueShift: isSet(object.hueShift) ? globalThis.Number(object.hueShift) : 0,
    };
  },

  toJSON(message: ColorMapMessage): unknown {
    const obj: any = {};
    if (message.spriteId !== 0) {
      obj.spriteId = Math.round(message.spriteId);
    }
    if (message.hueShift !== 0) {
      obj.hueShift = Math.round(message.hueShift);
    }
    return obj;
  },
};

function createBaseGenerateComboMessage(): GenerateComboMessage {
  return { spriteIds: [], colorMaps: [] };
}

export const GenerateComboMessage = {
  encode(message: GenerateComboMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.spriteIds) {
      writer.int32(v);
    }
    writer.ldelim();
    for (const v of message.colorMaps) {
      ColorMapMessage.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateComboMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateComboMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.spriteIds.push(reader.int32());

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.spriteIds.push(reader.int32());
            }

            continue;
          }

          break;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.colorMaps.push(ColorMapMessage.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenerateComboMessage {
    return {
      spriteIds: globalThis.Array.isArray(object?.spriteIds)
        ? object.spriteIds.map((e: any) => globalThis.Number(e))
        : [],
      colorMaps: globalThis.Array.isArray(object?.colorMaps)
        ? object.colorMaps.map((e: any) => ColorMapMessage.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenerateComboMessage): unknown {
    const obj: any = {};
    if (message.spriteIds?.length) {
      obj.spriteIds = message.spriteIds.map((e) => Math.round(e));
    }
    if (message.colorMaps?.length) {
      obj.colorMaps = message.colorMaps.map((e) => ColorMapMessage.toJSON(e));
    }
    return obj;
  },
};

function createBaseGenerateCardMessage(): GenerateCardMessage {
  return {
    settingsOwnerLogin: 0,
    profileImageUrl: "",
    combo: undefined,
    username: "",
    bubbles: 0,
    drops: 0,
    dropRatio: 0,
    firstSeen: "",
    spritesCount: 0,
    eventsParticipated: 0,
    eventsDropValue: 0,
    bubbleRank: 0,
    dropRank: 0,
    serversConnected: 0,
    isPatron: false,
    isEarlyUser: false,
    isModerator: false,
  };
}

export const GenerateCardMessage = {
  encode(message: GenerateCardMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.settingsOwnerLogin !== 0) {
      writer.uint32(8).int32(message.settingsOwnerLogin);
    }
    if (message.profileImageUrl !== "") {
      writer.uint32(18).string(message.profileImageUrl);
    }
    if (message.combo !== undefined) {
      GenerateComboMessage.encode(message.combo, writer.uint32(26).fork()).ldelim();
    }
    if (message.username !== "") {
      writer.uint32(34).string(message.username);
    }
    if (message.bubbles !== 0) {
      writer.uint32(40).int32(message.bubbles);
    }
    if (message.drops !== 0) {
      writer.uint32(48).int32(message.drops);
    }
    if (message.dropRatio !== 0) {
      writer.uint32(57).double(message.dropRatio);
    }
    if (message.firstSeen !== "") {
      writer.uint32(66).string(message.firstSeen);
    }
    if (message.spritesCount !== 0) {
      writer.uint32(72).int32(message.spritesCount);
    }
    if (message.eventsParticipated !== 0) {
      writer.uint32(80).int32(message.eventsParticipated);
    }
    if (message.eventsDropValue !== 0) {
      writer.uint32(88).int32(message.eventsDropValue);
    }
    if (message.bubbleRank !== 0) {
      writer.uint32(96).int32(message.bubbleRank);
    }
    if (message.dropRank !== 0) {
      writer.uint32(104).int32(message.dropRank);
    }
    if (message.serversConnected !== 0) {
      writer.uint32(112).int32(message.serversConnected);
    }
    if (message.isPatron === true) {
      writer.uint32(120).bool(message.isPatron);
    }
    if (message.isEarlyUser === true) {
      writer.uint32(128).bool(message.isEarlyUser);
    }
    if (message.isModerator === true) {
      writer.uint32(136).bool(message.isModerator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerateCardMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerateCardMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.settingsOwnerLogin = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.profileImageUrl = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.combo = GenerateComboMessage.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.username = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.bubbles = reader.int32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.drops = reader.int32();
          continue;
        case 7:
          if (tag !== 57) {
            break;
          }

          message.dropRatio = reader.double();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.firstSeen = reader.string();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.spritesCount = reader.int32();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.eventsParticipated = reader.int32();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.eventsDropValue = reader.int32();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.bubbleRank = reader.int32();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.dropRank = reader.int32();
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.serversConnected = reader.int32();
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.isPatron = reader.bool();
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.isEarlyUser = reader.bool();
          continue;
        case 17:
          if (tag !== 136) {
            break;
          }

          message.isModerator = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenerateCardMessage {
    return {
      settingsOwnerLogin: isSet(object.settingsOwnerLogin) ? globalThis.Number(object.settingsOwnerLogin) : 0,
      profileImageUrl: isSet(object.profileImageUrl) ? globalThis.String(object.profileImageUrl) : "",
      combo: isSet(object.combo) ? GenerateComboMessage.fromJSON(object.combo) : undefined,
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      bubbles: isSet(object.bubbles) ? globalThis.Number(object.bubbles) : 0,
      drops: isSet(object.drops) ? globalThis.Number(object.drops) : 0,
      dropRatio: isSet(object.dropRatio) ? globalThis.Number(object.dropRatio) : 0,
      firstSeen: isSet(object.firstSeen) ? globalThis.String(object.firstSeen) : "",
      spritesCount: isSet(object.spritesCount) ? globalThis.Number(object.spritesCount) : 0,
      eventsParticipated: isSet(object.eventsParticipated) ? globalThis.Number(object.eventsParticipated) : 0,
      eventsDropValue: isSet(object.eventsDropValue) ? globalThis.Number(object.eventsDropValue) : 0,
      bubbleRank: isSet(object.bubbleRank) ? globalThis.Number(object.bubbleRank) : 0,
      dropRank: isSet(object.dropRank) ? globalThis.Number(object.dropRank) : 0,
      serversConnected: isSet(object.serversConnected) ? globalThis.Number(object.serversConnected) : 0,
      isPatron: isSet(object.isPatron) ? globalThis.Boolean(object.isPatron) : false,
      isEarlyUser: isSet(object.isEarlyUser) ? globalThis.Boolean(object.isEarlyUser) : false,
      isModerator: isSet(object.isModerator) ? globalThis.Boolean(object.isModerator) : false,
    };
  },

  toJSON(message: GenerateCardMessage): unknown {
    const obj: any = {};
    if (message.settingsOwnerLogin !== 0) {
      obj.settingsOwnerLogin = Math.round(message.settingsOwnerLogin);
    }
    if (message.profileImageUrl !== "") {
      obj.profileImageUrl = message.profileImageUrl;
    }
    if (message.combo !== undefined) {
      obj.combo = GenerateComboMessage.toJSON(message.combo);
    }
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.bubbles !== 0) {
      obj.bubbles = Math.round(message.bubbles);
    }
    if (message.drops !== 0) {
      obj.drops = Math.round(message.drops);
    }
    if (message.dropRatio !== 0) {
      obj.dropRatio = message.dropRatio;
    }
    if (message.firstSeen !== "") {
      obj.firstSeen = message.firstSeen;
    }
    if (message.spritesCount !== 0) {
      obj.spritesCount = Math.round(message.spritesCount);
    }
    if (message.eventsParticipated !== 0) {
      obj.eventsParticipated = Math.round(message.eventsParticipated);
    }
    if (message.eventsDropValue !== 0) {
      obj.eventsDropValue = Math.round(message.eventsDropValue);
    }
    if (message.bubbleRank !== 0) {
      obj.bubbleRank = Math.round(message.bubbleRank);
    }
    if (message.dropRank !== 0) {
      obj.dropRank = Math.round(message.dropRank);
    }
    if (message.serversConnected !== 0) {
      obj.serversConnected = Math.round(message.serversConnected);
    }
    if (message.isPatron === true) {
      obj.isPatron = message.isPatron;
    }
    if (message.isEarlyUser === true) {
      obj.isEarlyUser = message.isEarlyUser;
    }
    if (message.isModerator === true) {
      obj.isModerator = message.isModerator;
    }
    return obj;
  },
};

export type ImageGeneratorDefinition = typeof ImageGeneratorDefinition;
export const ImageGeneratorDefinition = {
  name: "ImageGenerator",
  fullName: "generator.ImageGenerator",
  methods: {
    /** Generate a image that combines the first frames of all sprites in the combo */
    generateSpriteCombo: {
      name: "GenerateSpriteCombo",
      requestType: GenerateComboMessage,
      requestStream: false,
      responseType: FileChunkMessage,
      responseStream: true,
      options: {},
    },
    /** Generate a card image for a user */
    generateCard: {
      name: "GenerateCard",
      requestType: GenerateCardMessage,
      requestStream: false,
      responseType: FileChunkMessage,
      responseStream: true,
      options: {},
    },
  },
} as const;

export interface ImageGeneratorServiceImplementation<CallContextExt = {}> {
  /** Generate a image that combines the first frames of all sprites in the combo */
  generateSpriteCombo(
    request: GenerateComboMessage,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<FileChunkMessage>;
  /** Generate a card image for a user */
  generateCard(
    request: GenerateCardMessage,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<FileChunkMessage>;
}

export interface ImageGeneratorClient<CallOptionsExt = {}> {
  /** Generate a image that combines the first frames of all sprites in the combo */
  generateSpriteCombo(
    request: GenerateComboMessage,
    options?: CallOptions & CallOptionsExt,
  ): AsyncIterable<FileChunkMessage>;
  /** Generate a card image for a user */
  generateCard(request: GenerateCardMessage, options?: CallOptions & CallOptionsExt): AsyncIterable<FileChunkMessage>;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export type ServerStreamingMethodResult<Response> = { [Symbol.asyncIterator](): AsyncIterator<Response, void> };
