/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";
import { Int32Value } from "./google/protobuf/wrappers";
import { SpriteSlotConfigurationReply } from "./inventory";

export const protobufPackage = "outfits";

/** Request message for GetOutfits */
export interface GetOutfitsRequest {
  login: number;
}

/** configuration for a sprite/scene outfit */
export interface OutfitMessage {
  name: string;
  spriteSlotConfiguration: SpriteSlotConfigurationReply[];
  sceneId: number | undefined;
  sceneShift: number | undefined;
}

export interface SaveOutfitRequest {
  login: number;
  outfit: OutfitMessage | undefined;
}

export interface GetOutfitRequest {
  login: number;
  outfitName: string;
}

export interface DeleteOutfitRequest {
  login: number;
  outfitName: string;
}

export interface UseOutfitRequest {
  login: number;
  outfitName: string;
}

function createBaseGetOutfitsRequest(): GetOutfitsRequest {
  return { login: 0 };
}

export const GetOutfitsRequest = {
  encode(message: GetOutfitsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetOutfitsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetOutfitsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.login = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetOutfitsRequest {
    return { login: isSet(object.login) ? globalThis.Number(object.login) : 0 };
  },

  toJSON(message: GetOutfitsRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    return obj;
  },
};

function createBaseOutfitMessage(): OutfitMessage {
  return { name: "", spriteSlotConfiguration: [], sceneId: undefined, sceneShift: undefined };
}

export const OutfitMessage = {
  encode(message: OutfitMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.spriteSlotConfiguration) {
      SpriteSlotConfigurationReply.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.sceneId !== undefined) {
      Int32Value.encode({ value: message.sceneId! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.sceneShift !== undefined) {
      Int32Value.encode({ value: message.sceneShift! }, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OutfitMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOutfitMessage();
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

          message.spriteSlotConfiguration.push(SpriteSlotConfigurationReply.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.sceneId = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.sceneShift = Int32Value.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OutfitMessage {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      spriteSlotConfiguration: globalThis.Array.isArray(object?.spriteSlotConfiguration)
        ? object.spriteSlotConfiguration.map((e: any) => SpriteSlotConfigurationReply.fromJSON(e))
        : [],
      sceneId: isSet(object.sceneId) ? Number(object.sceneId) : undefined,
      sceneShift: isSet(object.sceneShift) ? Number(object.sceneShift) : undefined,
    };
  },

  toJSON(message: OutfitMessage): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.spriteSlotConfiguration?.length) {
      obj.spriteSlotConfiguration = message.spriteSlotConfiguration.map((e) => SpriteSlotConfigurationReply.toJSON(e));
    }
    if (message.sceneId !== undefined) {
      obj.sceneId = message.sceneId;
    }
    if (message.sceneShift !== undefined) {
      obj.sceneShift = message.sceneShift;
    }
    return obj;
  },
};

function createBaseSaveOutfitRequest(): SaveOutfitRequest {
  return { login: 0, outfit: undefined };
}

export const SaveOutfitRequest = {
  encode(message: SaveOutfitRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (message.outfit !== undefined) {
      OutfitMessage.encode(message.outfit, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SaveOutfitRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSaveOutfitRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.login = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.outfit = OutfitMessage.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SaveOutfitRequest {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      outfit: isSet(object.outfit) ? OutfitMessage.fromJSON(object.outfit) : undefined,
    };
  },

  toJSON(message: SaveOutfitRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.outfit !== undefined) {
      obj.outfit = OutfitMessage.toJSON(message.outfit);
    }
    return obj;
  },
};

function createBaseGetOutfitRequest(): GetOutfitRequest {
  return { login: 0, outfitName: "" };
}

export const GetOutfitRequest = {
  encode(message: GetOutfitRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (message.outfitName !== "") {
      writer.uint32(18).string(message.outfitName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetOutfitRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetOutfitRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.login = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.outfitName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetOutfitRequest {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      outfitName: isSet(object.outfitName) ? globalThis.String(object.outfitName) : "",
    };
  },

  toJSON(message: GetOutfitRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.outfitName !== "") {
      obj.outfitName = message.outfitName;
    }
    return obj;
  },
};

function createBaseDeleteOutfitRequest(): DeleteOutfitRequest {
  return { login: 0, outfitName: "" };
}

export const DeleteOutfitRequest = {
  encode(message: DeleteOutfitRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (message.outfitName !== "") {
      writer.uint32(18).string(message.outfitName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteOutfitRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteOutfitRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.login = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.outfitName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteOutfitRequest {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      outfitName: isSet(object.outfitName) ? globalThis.String(object.outfitName) : "",
    };
  },

  toJSON(message: DeleteOutfitRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.outfitName !== "") {
      obj.outfitName = message.outfitName;
    }
    return obj;
  },
};

function createBaseUseOutfitRequest(): UseOutfitRequest {
  return { login: 0, outfitName: "" };
}

export const UseOutfitRequest = {
  encode(message: UseOutfitRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (message.outfitName !== "") {
      writer.uint32(18).string(message.outfitName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UseOutfitRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUseOutfitRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.login = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.outfitName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UseOutfitRequest {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      outfitName: isSet(object.outfitName) ? globalThis.String(object.outfitName) : "",
    };
  },

  toJSON(message: UseOutfitRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.outfitName !== "") {
      obj.outfitName = message.outfitName;
    }
    return obj;
  },
};

/** Service definition for outfits resource access */
export type OutfitsDefinition = typeof OutfitsDefinition;
export const OutfitsDefinition = {
  name: "Outfits",
  fullName: "outfits.Outfits",
  methods: {
    /** Gets all outfits of a member */
    getOutfits: {
      name: "GetOutfits",
      requestType: GetOutfitsRequest,
      requestStream: false,
      responseType: OutfitMessage,
      responseStream: true,
      options: {},
    },
    /** Gets an outfit by name of a member */
    getOutfit: {
      name: "GetOutfit",
      requestType: GetOutfitRequest,
      requestStream: false,
      responseType: OutfitMessage,
      responseStream: false,
      options: {},
    },
    /** Saves a new outfit */
    saveOutfit: {
      name: "SaveOutfit",
      requestType: SaveOutfitRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** Deletes an outfit */
    deleteOutfit: {
      name: "DeleteOutfit",
      requestType: DeleteOutfitRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** Uses an outfit */
    useOutfit: {
      name: "UseOutfit",
      requestType: UseOutfitRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface OutfitsServiceImplementation<CallContextExt = {}> {
  /** Gets all outfits of a member */
  getOutfits(
    request: GetOutfitsRequest,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<OutfitMessage>;
  /** Gets an outfit by name of a member */
  getOutfit(request: GetOutfitRequest, context: CallContext & CallContextExt): Promise<OutfitMessage>;
  /** Saves a new outfit */
  saveOutfit(request: SaveOutfitRequest, context: CallContext & CallContextExt): Promise<Empty>;
  /** Deletes an outfit */
  deleteOutfit(request: DeleteOutfitRequest, context: CallContext & CallContextExt): Promise<Empty>;
  /** Uses an outfit */
  useOutfit(request: UseOutfitRequest, context: CallContext & CallContextExt): Promise<Empty>;
}

export interface OutfitsClient<CallOptionsExt = {}> {
  /** Gets all outfits of a member */
  getOutfits(request: GetOutfitsRequest, options?: CallOptions & CallOptionsExt): AsyncIterable<OutfitMessage>;
  /** Gets an outfit by name of a member */
  getOutfit(request: GetOutfitRequest, options?: CallOptions & CallOptionsExt): Promise<OutfitMessage>;
  /** Saves a new outfit */
  saveOutfit(request: SaveOutfitRequest, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  /** Deletes an outfit */
  deleteOutfit(request: DeleteOutfitRequest, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  /** Uses an outfit */
  useOutfit(request: UseOutfitRequest, options?: CallOptions & CallOptionsExt): Promise<Empty>;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export type ServerStreamingMethodResult<Response> = { [Symbol.asyncIterator](): AsyncIterator<Response, void> };
