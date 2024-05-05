/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "awards";

export enum AwardRarityMessage {
  Common = 0,
  Special = 1,
  Epic = 2,
  Legendary = 3,
  UNRECOGNIZED = -1,
}

export function awardRarityMessageFromJSON(object: any): AwardRarityMessage {
  switch (object) {
    case 0:
    case "Common":
      return AwardRarityMessage.Common;
    case 1:
    case "Special":
      return AwardRarityMessage.Special;
    case 2:
    case "Epic":
      return AwardRarityMessage.Epic;
    case 3:
    case "Legendary":
      return AwardRarityMessage.Legendary;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AwardRarityMessage.UNRECOGNIZED;
  }
}

export function awardRarityMessageToJSON(object: AwardRarityMessage): string {
  switch (object) {
    case AwardRarityMessage.Common:
      return "Common";
    case AwardRarityMessage.Special:
      return "Special";
    case AwardRarityMessage.Epic:
      return "Epic";
    case AwardRarityMessage.Legendary:
      return "Legendary";
    case AwardRarityMessage.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Response containing a award's properties. */
export interface AwardReply {
  name: string;
  url: string;
  id: number;
  description: string;
  /** @deprecated */
  rarityNum: number;
  rarity: AwardRarityMessage;
}

/** Request containing a award id */
export interface GetAwardRequest {
  id: number;
}

function createBaseAwardReply(): AwardReply {
  return { name: "", url: "", id: 0, description: "", rarityNum: 0, rarity: 0 };
}

export const AwardReply = {
  encode(message: AwardReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    if (message.id !== 0) {
      writer.uint32(24).int32(message.id);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.rarityNum !== 0) {
      writer.uint32(40).int32(message.rarityNum);
    }
    if (message.rarity !== 0) {
      writer.uint32(48).int32(message.rarity);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AwardReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAwardReply();
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
          if (tag !== 18) {
            break;
          }

          message.url = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.id = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.description = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.rarityNum = reader.int32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.rarity = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AwardReply {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      url: isSet(object.url) ? globalThis.String(object.url) : "",
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      rarityNum: isSet(object.rarityNum) ? globalThis.Number(object.rarityNum) : 0,
      rarity: isSet(object.rarity) ? awardRarityMessageFromJSON(object.rarity) : 0,
    };
  },

  toJSON(message: AwardReply): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.url !== "") {
      obj.url = message.url;
    }
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.rarityNum !== 0) {
      obj.rarityNum = Math.round(message.rarityNum);
    }
    if (message.rarity !== 0) {
      obj.rarity = awardRarityMessageToJSON(message.rarity);
    }
    return obj;
  },
};

function createBaseGetAwardRequest(): GetAwardRequest {
  return { id: 0 };
}

export const GetAwardRequest = {
  encode(message: GetAwardRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAwardRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAwardRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetAwardRequest {
    return { id: isSet(object.id) ? globalThis.Number(object.id) : 0 };
  },

  toJSON(message: GetAwardRequest): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },
};

/** Service definition for award resource access */
export type AwardsDefinition = typeof AwardsDefinition;
export const AwardsDefinition = {
  name: "Awards",
  fullName: "awards.Awards",
  methods: {
    /** Gets all awards */
    getAllAwards: {
      name: "GetAllAwards",
      requestType: Empty,
      requestStream: false,
      responseType: AwardReply,
      responseStream: true,
      options: {},
    },
    /** Gets an award by its id */
    getAwardById: {
      name: "GetAwardById",
      requestType: GetAwardRequest,
      requestStream: false,
      responseType: AwardReply,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface AwardsServiceImplementation<CallContextExt = {}> {
  /** Gets all awards */
  getAllAwards(request: Empty, context: CallContext & CallContextExt): ServerStreamingMethodResult<AwardReply>;
  /** Gets an award by its id */
  getAwardById(request: GetAwardRequest, context: CallContext & CallContextExt): Promise<AwardReply>;
}

export interface AwardsClient<CallOptionsExt = {}> {
  /** Gets all awards */
  getAllAwards(request: Empty, options?: CallOptions & CallOptionsExt): AsyncIterable<AwardReply>;
  /** Gets an award by its id */
  getAwardById(request: GetAwardRequest, options?: CallOptions & CallOptionsExt): Promise<AwardReply>;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export type ServerStreamingMethodResult<Response> = { [Symbol.asyncIterator](): AsyncIterator<Response, void> };
