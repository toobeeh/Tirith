/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";
import { Int32Value, StringValue } from "./google/protobuf/wrappers";

export const protobufPackage = "sprites";

/** Response containing a sprite's properties. */
export interface SpriteReply {
  name: string;
  url: string;
  id: number;
  cost: number;
  isRainbow: boolean;
  isSpecial: boolean;
  eventDropId: number | undefined;
  artist: string | undefined;
  isReleased: boolean;
}

/** Request containing a sprite id */
export interface GetSpriteRequest {
  id: number;
}

/** Response containing the ranking of a sprite */
export interface SpriteRankingReply {
  id: number;
  activeUsers: number;
  totalBought: number;
  rank: number;
}

function createBaseSpriteReply(): SpriteReply {
  return {
    name: "",
    url: "",
    id: 0,
    cost: 0,
    isRainbow: false,
    isSpecial: false,
    eventDropId: undefined,
    artist: undefined,
    isReleased: false,
  };
}

export const SpriteReply = {
  encode(message: SpriteReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    if (message.id !== 0) {
      writer.uint32(24).int32(message.id);
    }
    if (message.cost !== 0) {
      writer.uint32(32).int32(message.cost);
    }
    if (message.isRainbow === true) {
      writer.uint32(40).bool(message.isRainbow);
    }
    if (message.isSpecial === true) {
      writer.uint32(48).bool(message.isSpecial);
    }
    if (message.eventDropId !== undefined) {
      Int32Value.encode({ value: message.eventDropId! }, writer.uint32(58).fork()).ldelim();
    }
    if (message.artist !== undefined) {
      StringValue.encode({ value: message.artist! }, writer.uint32(66).fork()).ldelim();
    }
    if (message.isReleased === true) {
      writer.uint32(72).bool(message.isReleased);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SpriteReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpriteReply();
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
          if (tag !== 32) {
            break;
          }

          message.cost = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.isRainbow = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.isSpecial = reader.bool();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.eventDropId = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.artist = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.isReleased = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SpriteReply {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      url: isSet(object.url) ? globalThis.String(object.url) : "",
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      cost: isSet(object.cost) ? globalThis.Number(object.cost) : 0,
      isRainbow: isSet(object.isRainbow) ? globalThis.Boolean(object.isRainbow) : false,
      isSpecial: isSet(object.isSpecial) ? globalThis.Boolean(object.isSpecial) : false,
      eventDropId: isSet(object.eventDropId) ? Number(object.eventDropId) : undefined,
      artist: isSet(object.artist) ? String(object.artist) : undefined,
      isReleased: isSet(object.isReleased) ? globalThis.Boolean(object.isReleased) : false,
    };
  },

  toJSON(message: SpriteReply): unknown {
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
    if (message.cost !== 0) {
      obj.cost = Math.round(message.cost);
    }
    if (message.isRainbow === true) {
      obj.isRainbow = message.isRainbow;
    }
    if (message.isSpecial === true) {
      obj.isSpecial = message.isSpecial;
    }
    if (message.eventDropId !== undefined) {
      obj.eventDropId = message.eventDropId;
    }
    if (message.artist !== undefined) {
      obj.artist = message.artist;
    }
    if (message.isReleased === true) {
      obj.isReleased = message.isReleased;
    }
    return obj;
  },
};

function createBaseGetSpriteRequest(): GetSpriteRequest {
  return { id: 0 };
}

export const GetSpriteRequest = {
  encode(message: GetSpriteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSpriteRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSpriteRequest();
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

  fromJSON(object: any): GetSpriteRequest {
    return { id: isSet(object.id) ? globalThis.Number(object.id) : 0 };
  },

  toJSON(message: GetSpriteRequest): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },
};

function createBaseSpriteRankingReply(): SpriteRankingReply {
  return { id: 0, activeUsers: 0, totalBought: 0, rank: 0 };
}

export const SpriteRankingReply = {
  encode(message: SpriteRankingReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.activeUsers !== 0) {
      writer.uint32(16).int32(message.activeUsers);
    }
    if (message.totalBought !== 0) {
      writer.uint32(24).int32(message.totalBought);
    }
    if (message.rank !== 0) {
      writer.uint32(32).int32(message.rank);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SpriteRankingReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpriteRankingReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.activeUsers = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.totalBought = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.rank = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SpriteRankingReply {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      activeUsers: isSet(object.activeUsers) ? globalThis.Number(object.activeUsers) : 0,
      totalBought: isSet(object.totalBought) ? globalThis.Number(object.totalBought) : 0,
      rank: isSet(object.rank) ? globalThis.Number(object.rank) : 0,
    };
  },

  toJSON(message: SpriteRankingReply): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.activeUsers !== 0) {
      obj.activeUsers = Math.round(message.activeUsers);
    }
    if (message.totalBought !== 0) {
      obj.totalBought = Math.round(message.totalBought);
    }
    if (message.rank !== 0) {
      obj.rank = Math.round(message.rank);
    }
    return obj;
  },
};

/** Service definition for sprite resource access */
export type SpritesDefinition = typeof SpritesDefinition;
export const SpritesDefinition = {
  name: "Sprites",
  fullName: "sprites.Sprites",
  methods: {
    /** Gets all sprites */
    getAllSprites: {
      name: "GetAllSprites",
      requestType: Empty,
      requestStream: false,
      responseType: SpriteReply,
      responseStream: true,
      options: {},
    },
    /** Gets a sprite by its id */
    getSpriteById: {
      name: "GetSpriteById",
      requestType: GetSpriteRequest,
      requestStream: false,
      responseType: SpriteReply,
      responseStream: false,
      options: {},
    },
    /** Gets the ranking of all sprites */
    getSpriteRanking: {
      name: "GetSpriteRanking",
      requestType: Empty,
      requestStream: false,
      responseType: SpriteRankingReply,
      responseStream: true,
      options: {},
    },
  },
} as const;

export interface SpritesServiceImplementation<CallContextExt = {}> {
  /** Gets all sprites */
  getAllSprites(request: Empty, context: CallContext & CallContextExt): ServerStreamingMethodResult<SpriteReply>;
  /** Gets a sprite by its id */
  getSpriteById(request: GetSpriteRequest, context: CallContext & CallContextExt): Promise<SpriteReply>;
  /** Gets the ranking of all sprites */
  getSpriteRanking(
    request: Empty,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<SpriteRankingReply>;
}

export interface SpritesClient<CallOptionsExt = {}> {
  /** Gets all sprites */
  getAllSprites(request: Empty, options?: CallOptions & CallOptionsExt): AsyncIterable<SpriteReply>;
  /** Gets a sprite by its id */
  getSpriteById(request: GetSpriteRequest, options?: CallOptions & CallOptionsExt): Promise<SpriteReply>;
  /** Gets the ranking of all sprites */
  getSpriteRanking(request: Empty, options?: CallOptions & CallOptionsExt): AsyncIterable<SpriteRankingReply>;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export type ServerStreamingMethodResult<Response> = { [Symbol.asyncIterator](): AsyncIterator<Response, void> };
