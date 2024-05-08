/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import Long = require("long");
import * as _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";
import { Int64Value } from "./google/protobuf/wrappers";

export const protobufPackage = "guilds";

/** Response containing a guild's properties. */
export interface GuildReply {
  guildId: Long;
  invite: number;
  name: string;
  connectedMemberCount: number;
}

/** Request containing a guild observe token */
export interface GetGuildRequest {
  invite: number;
}

/** Request containing a guild discord ID */
export interface GetGuildByIdMessage {
  discordId: Long;
}

export interface GetGuildOptionsByIdMessage {
  guildId: Long;
}

export interface GuildOptionsMessage {
  guildId: Long;
  channelId: Long | undefined;
  name: string;
  invite: number;
  prefix: string;
}

function createBaseGuildReply(): GuildReply {
  return { guildId: Long.ZERO, invite: 0, name: "", connectedMemberCount: 0 };
}

export const GuildReply = {
  encode(message: GuildReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.guildId.isZero()) {
      writer.uint32(8).int64(message.guildId);
    }
    if (message.invite !== 0) {
      writer.uint32(32).int32(message.invite);
    }
    if (message.name !== "") {
      writer.uint32(42).string(message.name);
    }
    if (message.connectedMemberCount !== 0) {
      writer.uint32(48).int32(message.connectedMemberCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GuildReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGuildReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.guildId = reader.int64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.invite = reader.int32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.name = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.connectedMemberCount = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GuildReply {
    return {
      guildId: isSet(object.guildId) ? Long.fromValue(object.guildId) : Long.ZERO,
      invite: isSet(object.invite) ? globalThis.Number(object.invite) : 0,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      connectedMemberCount: isSet(object.connectedMemberCount) ? globalThis.Number(object.connectedMemberCount) : 0,
    };
  },

  toJSON(message: GuildReply): unknown {
    const obj: any = {};
    if (!message.guildId.isZero()) {
      obj.guildId = (message.guildId || Long.ZERO).toString();
    }
    if (message.invite !== 0) {
      obj.invite = Math.round(message.invite);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.connectedMemberCount !== 0) {
      obj.connectedMemberCount = Math.round(message.connectedMemberCount);
    }
    return obj;
  },
};

function createBaseGetGuildRequest(): GetGuildRequest {
  return { invite: 0 };
}

export const GetGuildRequest = {
  encode(message: GetGuildRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.invite !== 0) {
      writer.uint32(8).int32(message.invite);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetGuildRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGuildRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.invite = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetGuildRequest {
    return { invite: isSet(object.invite) ? globalThis.Number(object.invite) : 0 };
  },

  toJSON(message: GetGuildRequest): unknown {
    const obj: any = {};
    if (message.invite !== 0) {
      obj.invite = Math.round(message.invite);
    }
    return obj;
  },
};

function createBaseGetGuildByIdMessage(): GetGuildByIdMessage {
  return { discordId: Long.ZERO };
}

export const GetGuildByIdMessage = {
  encode(message: GetGuildByIdMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.discordId.isZero()) {
      writer.uint32(8).int64(message.discordId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetGuildByIdMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGuildByIdMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.discordId = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetGuildByIdMessage {
    return { discordId: isSet(object.discordId) ? Long.fromValue(object.discordId) : Long.ZERO };
  },

  toJSON(message: GetGuildByIdMessage): unknown {
    const obj: any = {};
    if (!message.discordId.isZero()) {
      obj.discordId = (message.discordId || Long.ZERO).toString();
    }
    return obj;
  },
};

function createBaseGetGuildOptionsByIdMessage(): GetGuildOptionsByIdMessage {
  return { guildId: Long.ZERO };
}

export const GetGuildOptionsByIdMessage = {
  encode(message: GetGuildOptionsByIdMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.guildId.isZero()) {
      writer.uint32(8).int64(message.guildId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetGuildOptionsByIdMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGuildOptionsByIdMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.guildId = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetGuildOptionsByIdMessage {
    return { guildId: isSet(object.guildId) ? Long.fromValue(object.guildId) : Long.ZERO };
  },

  toJSON(message: GetGuildOptionsByIdMessage): unknown {
    const obj: any = {};
    if (!message.guildId.isZero()) {
      obj.guildId = (message.guildId || Long.ZERO).toString();
    }
    return obj;
  },
};

function createBaseGuildOptionsMessage(): GuildOptionsMessage {
  return { guildId: Long.ZERO, channelId: undefined, name: "", invite: 0, prefix: "" };
}

export const GuildOptionsMessage = {
  encode(message: GuildOptionsMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.guildId.isZero()) {
      writer.uint32(8).int64(message.guildId);
    }
    if (message.channelId !== undefined) {
      Int64Value.encode({ value: message.channelId! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.invite !== 0) {
      writer.uint32(32).int32(message.invite);
    }
    if (message.prefix !== "") {
      writer.uint32(42).string(message.prefix);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GuildOptionsMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGuildOptionsMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.guildId = reader.int64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channelId = Int64Value.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.invite = reader.int32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.prefix = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GuildOptionsMessage {
    return {
      guildId: isSet(object.guildId) ? Long.fromValue(object.guildId) : Long.ZERO,
      channelId: isSet(object.channelId) ? Long.fromValue(object.channelId) : undefined,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      invite: isSet(object.invite) ? globalThis.Number(object.invite) : 0,
      prefix: isSet(object.prefix) ? globalThis.String(object.prefix) : "",
    };
  },

  toJSON(message: GuildOptionsMessage): unknown {
    const obj: any = {};
    if (!message.guildId.isZero()) {
      obj.guildId = (message.guildId || Long.ZERO).toString();
    }
    if (message.channelId !== undefined) {
      obj.channelId = message.channelId;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.invite !== 0) {
      obj.invite = Math.round(message.invite);
    }
    if (message.prefix !== "") {
      obj.prefix = message.prefix;
    }
    return obj;
  },
};

/** Service definition for guilds resource access */
export type GuildsDefinition = typeof GuildsDefinition;
export const GuildsDefinition = {
  name: "Guilds",
  fullName: "guilds.Guilds",
  methods: {
    /** Gets a guild by its observe token */
    getGuildByInvite: {
      name: "GetGuildByInvite",
      requestType: GetGuildRequest,
      requestStream: false,
      responseType: GuildReply,
      responseStream: false,
      options: {},
    },
    /** Gets a guild by its discord ID */
    getGuildById: {
      name: "GetGuildById",
      requestType: GetGuildByIdMessage,
      requestStream: false,
      responseType: GuildReply,
      responseStream: false,
      options: {},
    },
    getGuildOptionsById: {
      name: "GetGuildOptionsById",
      requestType: GetGuildOptionsByIdMessage,
      requestStream: false,
      responseType: GuildOptionsMessage,
      responseStream: false,
      options: {},
    },
    setGuildOptions: {
      name: "SetGuildOptions",
      requestType: GuildOptionsMessage,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface GuildsServiceImplementation<CallContextExt = {}> {
  /** Gets a guild by its observe token */
  getGuildByInvite(request: GetGuildRequest, context: CallContext & CallContextExt): Promise<GuildReply>;
  /** Gets a guild by its discord ID */
  getGuildById(request: GetGuildByIdMessage, context: CallContext & CallContextExt): Promise<GuildReply>;
  getGuildOptionsById(
    request: GetGuildOptionsByIdMessage,
    context: CallContext & CallContextExt,
  ): Promise<GuildOptionsMessage>;
  setGuildOptions(request: GuildOptionsMessage, context: CallContext & CallContextExt): Promise<Empty>;
}

export interface GuildsClient<CallOptionsExt = {}> {
  /** Gets a guild by its observe token */
  getGuildByInvite(request: GetGuildRequest, options?: CallOptions & CallOptionsExt): Promise<GuildReply>;
  /** Gets a guild by its discord ID */
  getGuildById(request: GetGuildByIdMessage, options?: CallOptions & CallOptionsExt): Promise<GuildReply>;
  getGuildOptionsById(
    request: GetGuildOptionsByIdMessage,
    options?: CallOptions & CallOptionsExt,
  ): Promise<GuildOptionsMessage>;
  setGuildOptions(request: GuildOptionsMessage, options?: CallOptions & CallOptionsExt): Promise<Empty>;
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
