/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";
import { Int32Value, StringValue } from "./google/protobuf/wrappers";

export const protobufPackage = "scenes";

/** Response containing a scene's properties. */
export interface SceneReply {
  name: string;
  url: string;
  id: number;
  exclusive: boolean;
  primaryColor: string | undefined;
  guessedColor: string | undefined;
  artist: string | undefined;
  eventId: number | undefined;
}

/** Response containing a scene theme's properties. */
export interface SceneThemeReply {
  name: string;
  sceneId: number;
  shift: number;
}

/** Request containing a scene id */
export interface GetSceneRequest {
  id: number;
}

/** Response containing the ranking of a scene */
export interface SceneRankingReply {
  id: number;
  activeUsers: number;
  totalBought: number;
  rank: number;
}

export interface EventSceneReply {
  scene: SceneReply | undefined;
  price: number;
}

export interface GetEventSceneRequest {
  eventId: number;
}

function createBaseSceneReply(): SceneReply {
  return {
    name: "",
    url: "",
    id: 0,
    exclusive: false,
    primaryColor: undefined,
    guessedColor: undefined,
    artist: undefined,
    eventId: undefined,
  };
}

export const SceneReply = {
  encode(message: SceneReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    if (message.id !== 0) {
      writer.uint32(24).int32(message.id);
    }
    if (message.exclusive === true) {
      writer.uint32(32).bool(message.exclusive);
    }
    if (message.primaryColor !== undefined) {
      StringValue.encode({ value: message.primaryColor! }, writer.uint32(42).fork()).ldelim();
    }
    if (message.guessedColor !== undefined) {
      StringValue.encode({ value: message.guessedColor! }, writer.uint32(50).fork()).ldelim();
    }
    if (message.artist !== undefined) {
      StringValue.encode({ value: message.artist! }, writer.uint32(58).fork()).ldelim();
    }
    if (message.eventId !== undefined) {
      Int32Value.encode({ value: message.eventId! }, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SceneReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSceneReply();
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

          message.exclusive = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.primaryColor = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.guessedColor = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.artist = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.eventId = Int32Value.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SceneReply {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      url: isSet(object.url) ? globalThis.String(object.url) : "",
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      exclusive: isSet(object.exclusive) ? globalThis.Boolean(object.exclusive) : false,
      primaryColor: isSet(object.primaryColor) ? String(object.primaryColor) : undefined,
      guessedColor: isSet(object.guessedColor) ? String(object.guessedColor) : undefined,
      artist: isSet(object.artist) ? String(object.artist) : undefined,
      eventId: isSet(object.eventId) ? Number(object.eventId) : undefined,
    };
  },

  toJSON(message: SceneReply): unknown {
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
    if (message.exclusive === true) {
      obj.exclusive = message.exclusive;
    }
    if (message.primaryColor !== undefined) {
      obj.primaryColor = message.primaryColor;
    }
    if (message.guessedColor !== undefined) {
      obj.guessedColor = message.guessedColor;
    }
    if (message.artist !== undefined) {
      obj.artist = message.artist;
    }
    if (message.eventId !== undefined) {
      obj.eventId = message.eventId;
    }
    return obj;
  },
};

function createBaseSceneThemeReply(): SceneThemeReply {
  return { name: "", sceneId: 0, shift: 0 };
}

export const SceneThemeReply = {
  encode(message: SceneThemeReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.sceneId !== 0) {
      writer.uint32(16).int32(message.sceneId);
    }
    if (message.shift !== 0) {
      writer.uint32(24).int32(message.shift);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SceneThemeReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSceneThemeReply();
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

          message.sceneId = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.shift = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SceneThemeReply {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      sceneId: isSet(object.sceneId) ? globalThis.Number(object.sceneId) : 0,
      shift: isSet(object.shift) ? globalThis.Number(object.shift) : 0,
    };
  },

  toJSON(message: SceneThemeReply): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.sceneId !== 0) {
      obj.sceneId = Math.round(message.sceneId);
    }
    if (message.shift !== 0) {
      obj.shift = Math.round(message.shift);
    }
    return obj;
  },
};

function createBaseGetSceneRequest(): GetSceneRequest {
  return { id: 0 };
}

export const GetSceneRequest = {
  encode(message: GetSceneRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSceneRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSceneRequest();
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

  fromJSON(object: any): GetSceneRequest {
    return { id: isSet(object.id) ? globalThis.Number(object.id) : 0 };
  },

  toJSON(message: GetSceneRequest): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },
};

function createBaseSceneRankingReply(): SceneRankingReply {
  return { id: 0, activeUsers: 0, totalBought: 0, rank: 0 };
}

export const SceneRankingReply = {
  encode(message: SceneRankingReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): SceneRankingReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSceneRankingReply();
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

  fromJSON(object: any): SceneRankingReply {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      activeUsers: isSet(object.activeUsers) ? globalThis.Number(object.activeUsers) : 0,
      totalBought: isSet(object.totalBought) ? globalThis.Number(object.totalBought) : 0,
      rank: isSet(object.rank) ? globalThis.Number(object.rank) : 0,
    };
  },

  toJSON(message: SceneRankingReply): unknown {
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

function createBaseEventSceneReply(): EventSceneReply {
  return { scene: undefined, price: 0 };
}

export const EventSceneReply = {
  encode(message: EventSceneReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.scene !== undefined) {
      SceneReply.encode(message.scene, writer.uint32(10).fork()).ldelim();
    }
    if (message.price !== 0) {
      writer.uint32(16).int32(message.price);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventSceneReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSceneReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.scene = SceneReply.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.price = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventSceneReply {
    return {
      scene: isSet(object.scene) ? SceneReply.fromJSON(object.scene) : undefined,
      price: isSet(object.price) ? globalThis.Number(object.price) : 0,
    };
  },

  toJSON(message: EventSceneReply): unknown {
    const obj: any = {};
    if (message.scene !== undefined) {
      obj.scene = SceneReply.toJSON(message.scene);
    }
    if (message.price !== 0) {
      obj.price = Math.round(message.price);
    }
    return obj;
  },
};

function createBaseGetEventSceneRequest(): GetEventSceneRequest {
  return { eventId: 0 };
}

export const GetEventSceneRequest = {
  encode(message: GetEventSceneRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.eventId !== 0) {
      writer.uint32(8).int32(message.eventId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetEventSceneRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetEventSceneRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.eventId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetEventSceneRequest {
    return { eventId: isSet(object.eventId) ? globalThis.Number(object.eventId) : 0 };
  },

  toJSON(message: GetEventSceneRequest): unknown {
    const obj: any = {};
    if (message.eventId !== 0) {
      obj.eventId = Math.round(message.eventId);
    }
    return obj;
  },
};

/** Service definition for scene resource access */
export type ScenesDefinition = typeof ScenesDefinition;
export const ScenesDefinition = {
  name: "Scenes",
  fullName: "scenes.Scenes",
  methods: {
    /** Gets all scenes */
    getAllScenes: {
      name: "GetAllScenes",
      requestType: Empty,
      requestStream: false,
      responseType: SceneReply,
      responseStream: true,
      options: {},
    },
    /** Gets all scene themes */
    getAllSceneThemes: {
      name: "GetAllSceneThemes",
      requestType: Empty,
      requestStream: false,
      responseType: SceneThemeReply,
      responseStream: true,
      options: {},
    },
    /** Gets all themes of a scene */
    getThemesOfScene: {
      name: "GetThemesOfScene",
      requestType: GetSceneRequest,
      requestStream: false,
      responseType: SceneThemeReply,
      responseStream: true,
      options: {},
    },
    /** Gets a scene by its id */
    getSceneById: {
      name: "GetSceneById",
      requestType: GetSceneRequest,
      requestStream: false,
      responseType: SceneReply,
      responseStream: false,
      options: {},
    },
    /** Gets the ranking of all scenes */
    getSceneRanking: {
      name: "GetSceneRanking",
      requestType: Empty,
      requestStream: false,
      responseType: SceneRankingReply,
      responseStream: true,
      options: {},
    },
    /** Gets the price and scene of an event */
    getEventScene: {
      name: "GetEventScene",
      requestType: GetEventSceneRequest,
      requestStream: false,
      responseType: EventSceneReply,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface ScenesServiceImplementation<CallContextExt = {}> {
  /** Gets all scenes */
  getAllScenes(request: Empty, context: CallContext & CallContextExt): ServerStreamingMethodResult<SceneReply>;
  /** Gets all scene themes */
  getAllSceneThemes(
    request: Empty,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<SceneThemeReply>;
  /** Gets all themes of a scene */
  getThemesOfScene(
    request: GetSceneRequest,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<SceneThemeReply>;
  /** Gets a scene by its id */
  getSceneById(request: GetSceneRequest, context: CallContext & CallContextExt): Promise<SceneReply>;
  /** Gets the ranking of all scenes */
  getSceneRanking(
    request: Empty,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<SceneRankingReply>;
  /** Gets the price and scene of an event */
  getEventScene(request: GetEventSceneRequest, context: CallContext & CallContextExt): Promise<EventSceneReply>;
}

export interface ScenesClient<CallOptionsExt = {}> {
  /** Gets all scenes */
  getAllScenes(request: Empty, options?: CallOptions & CallOptionsExt): AsyncIterable<SceneReply>;
  /** Gets all scene themes */
  getAllSceneThemes(request: Empty, options?: CallOptions & CallOptionsExt): AsyncIterable<SceneThemeReply>;
  /** Gets all themes of a scene */
  getThemesOfScene(request: GetSceneRequest, options?: CallOptions & CallOptionsExt): AsyncIterable<SceneThemeReply>;
  /** Gets a scene by its id */
  getSceneById(request: GetSceneRequest, options?: CallOptions & CallOptionsExt): Promise<SceneReply>;
  /** Gets the ranking of all scenes */
  getSceneRanking(request: Empty, options?: CallOptions & CallOptionsExt): AsyncIterable<SceneRankingReply>;
  /** Gets the price and scene of an event */
  getEventScene(request: GetEventSceneRequest, options?: CallOptions & CallOptionsExt): Promise<EventSceneReply>;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export type ServerStreamingMethodResult<Response> = { [Symbol.asyncIterator](): AsyncIterator<Response, void> };
