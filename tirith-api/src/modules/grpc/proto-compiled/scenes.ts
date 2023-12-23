/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";
import { Int32Value, StringValue } from "./google/protobuf/wrappers";

export const protobufPackage = "scenes";

/** The request message containing the user's name. */
export interface SceneReply {
  name: string;
  url: string;
  id: number;
  eventId: number | undefined;
  primaryColor: string | undefined;
  guessedColor: string | undefined;
  artist: string | undefined;
}

function createBaseSceneReply(): SceneReply {
  return {
    name: "",
    url: "",
    id: 0,
    eventId: undefined,
    primaryColor: undefined,
    guessedColor: undefined,
    artist: undefined,
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
    if (message.eventId !== undefined) {
      Int32Value.encode({ value: message.eventId! }, writer.uint32(34).fork()).ldelim();
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
          if (tag !== 34) {
            break;
          }

          message.eventId = Int32Value.decode(reader, reader.uint32()).value;
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
      eventId: isSet(object.eventId) ? Number(object.eventId) : undefined,
      primaryColor: isSet(object.primaryColor) ? String(object.primaryColor) : undefined,
      guessedColor: isSet(object.guessedColor) ? String(object.guessedColor) : undefined,
      artist: isSet(object.artist) ? String(object.artist) : undefined,
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
    if (message.eventId !== undefined) {
      obj.eventId = message.eventId;
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
    return obj;
  },

  create(base?: DeepPartial<SceneReply>): SceneReply {
    return SceneReply.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SceneReply>): SceneReply {
    const message = createBaseSceneReply();
    message.name = object.name ?? "";
    message.url = object.url ?? "";
    message.id = object.id ?? 0;
    message.eventId = object.eventId ?? undefined;
    message.primaryColor = object.primaryColor ?? undefined;
    message.guessedColor = object.guessedColor ?? undefined;
    message.artist = object.artist ?? undefined;
    return message;
  },
};

/** The greeting service definition. */
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
  },
} as const;

export interface ScenesServiceImplementation<CallContextExt = {}> {
  /** Gets all scenes */
  getAllScenes(
    request: Empty,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<DeepPartial<SceneReply>>;
}

export interface ScenesClient<CallOptionsExt = {}> {
  /** Gets all scenes */
  getAllScenes(request: DeepPartial<Empty>, options?: CallOptions & CallOptionsExt): AsyncIterable<SceneReply>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export type ServerStreamingMethodResult<Response> = { [Symbol.asyncIterator](): AsyncIterator<Response, void> };
