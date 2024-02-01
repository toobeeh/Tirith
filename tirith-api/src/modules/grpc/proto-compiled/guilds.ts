/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import Long = require("long");

export const protobufPackage = "guilds";

/** Response containing a guild's properties. */
export interface GuildReply {
  guildId: number;
  channelId: number;
  messageId: number;
  observeToken: number;
  name: string;
  connectedMemberCount: number;
}

/** Request containing a guild observe token */
export interface GetGuildRequest {
  observeToken: number;
}

function createBaseGuildReply(): GuildReply {
  return { guildId: 0, channelId: 0, messageId: 0, observeToken: 0, name: "", connectedMemberCount: 0 };
}

export const GuildReply = {
  encode(message: GuildReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).int64(message.guildId);
    }
    if (message.channelId !== 0) {
      writer.uint32(16).int64(message.channelId);
    }
    if (message.messageId !== 0) {
      writer.uint32(24).int64(message.messageId);
    }
    if (message.observeToken !== 0) {
      writer.uint32(32).int32(message.observeToken);
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

          message.guildId = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.channelId = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.messageId = longToNumber(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.observeToken = reader.int32();
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
      guildId: isSet(object.guildId) ? globalThis.Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? globalThis.Number(object.channelId) : 0,
      messageId: isSet(object.messageId) ? globalThis.Number(object.messageId) : 0,
      observeToken: isSet(object.observeToken) ? globalThis.Number(object.observeToken) : 0,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      connectedMemberCount: isSet(object.connectedMemberCount) ? globalThis.Number(object.connectedMemberCount) : 0,
    };
  },

  toJSON(message: GuildReply): unknown {
    const obj: any = {};
    if (message.guildId !== 0) {
      obj.guildId = Math.round(message.guildId);
    }
    if (message.channelId !== 0) {
      obj.channelId = Math.round(message.channelId);
    }
    if (message.messageId !== 0) {
      obj.messageId = Math.round(message.messageId);
    }
    if (message.observeToken !== 0) {
      obj.observeToken = Math.round(message.observeToken);
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
  return { observeToken: 0 };
}

export const GetGuildRequest = {
  encode(message: GetGuildRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.observeToken !== 0) {
      writer.uint32(8).int32(message.observeToken);
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

          message.observeToken = reader.int32();
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
    return { observeToken: isSet(object.observeToken) ? globalThis.Number(object.observeToken) : 0 };
  },

  toJSON(message: GetGuildRequest): unknown {
    const obj: any = {};
    if (message.observeToken !== 0) {
      obj.observeToken = Math.round(message.observeToken);
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
    getGuildByToken: {
      name: "GetGuildByToken",
      requestType: GetGuildRequest,
      requestStream: false,
      responseType: GuildReply,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface GuildsServiceImplementation<CallContextExt = {}> {
  /** Gets a guild by its observe token */
  getGuildByToken(request: GetGuildRequest, context: CallContext & CallContextExt): Promise<GuildReply>;
}

export interface GuildsClient<CallOptionsExt = {}> {
  /** Gets a guild by its observe token */
  getGuildByToken(request: GetGuildRequest, options?: CallOptions & CallOptionsExt): Promise<GuildReply>;
}

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
