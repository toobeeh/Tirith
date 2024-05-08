/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import Long = require("long");
import * as _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";
import { StringValue } from "./google/protobuf/wrappers";
import { GuildOptionsMessage } from "./guilds";

export const protobufPackage = "workers";

export interface AssignInstanceToServerMessage {
  login: number;
  serverId: Long;
}

export interface GetAssignedGuildOptionsMessage {
  instanceId: number;
}

export interface ClaimInstanceMessage {
  instanceId: number;
  /** provide if the claim is a renewal of a previous, still valid claim */
  lastClaimUlid: string | undefined;
  claimUlid: string;
  workerUlid: string;
}

export interface InstanceDetailsMessage {
  botToken: string;
  botId: Long;
  id: number;
}

function createBaseAssignInstanceToServerMessage(): AssignInstanceToServerMessage {
  return { login: 0, serverId: Long.ZERO };
}

export const AssignInstanceToServerMessage = {
  encode(message: AssignInstanceToServerMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (!message.serverId.isZero()) {
      writer.uint32(16).int64(message.serverId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AssignInstanceToServerMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAssignInstanceToServerMessage();
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
          if (tag !== 16) {
            break;
          }

          message.serverId = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AssignInstanceToServerMessage {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      serverId: isSet(object.serverId) ? Long.fromValue(object.serverId) : Long.ZERO,
    };
  },

  toJSON(message: AssignInstanceToServerMessage): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (!message.serverId.isZero()) {
      obj.serverId = (message.serverId || Long.ZERO).toString();
    }
    return obj;
  },
};

function createBaseGetAssignedGuildOptionsMessage(): GetAssignedGuildOptionsMessage {
  return { instanceId: 0 };
}

export const GetAssignedGuildOptionsMessage = {
  encode(message: GetAssignedGuildOptionsMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.instanceId !== 0) {
      writer.uint32(8).int32(message.instanceId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAssignedGuildOptionsMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAssignedGuildOptionsMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.instanceId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetAssignedGuildOptionsMessage {
    return { instanceId: isSet(object.instanceId) ? globalThis.Number(object.instanceId) : 0 };
  },

  toJSON(message: GetAssignedGuildOptionsMessage): unknown {
    const obj: any = {};
    if (message.instanceId !== 0) {
      obj.instanceId = Math.round(message.instanceId);
    }
    return obj;
  },
};

function createBaseClaimInstanceMessage(): ClaimInstanceMessage {
  return { instanceId: 0, lastClaimUlid: undefined, claimUlid: "", workerUlid: "" };
}

export const ClaimInstanceMessage = {
  encode(message: ClaimInstanceMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.instanceId !== 0) {
      writer.uint32(8).int32(message.instanceId);
    }
    if (message.lastClaimUlid !== undefined) {
      StringValue.encode({ value: message.lastClaimUlid! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.claimUlid !== "") {
      writer.uint32(26).string(message.claimUlid);
    }
    if (message.workerUlid !== "") {
      writer.uint32(34).string(message.workerUlid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClaimInstanceMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClaimInstanceMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.instanceId = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.lastClaimUlid = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.claimUlid = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.workerUlid = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClaimInstanceMessage {
    return {
      instanceId: isSet(object.instanceId) ? globalThis.Number(object.instanceId) : 0,
      lastClaimUlid: isSet(object.lastClaimUlid) ? String(object.lastClaimUlid) : undefined,
      claimUlid: isSet(object.claimUlid) ? globalThis.String(object.claimUlid) : "",
      workerUlid: isSet(object.workerUlid) ? globalThis.String(object.workerUlid) : "",
    };
  },

  toJSON(message: ClaimInstanceMessage): unknown {
    const obj: any = {};
    if (message.instanceId !== 0) {
      obj.instanceId = Math.round(message.instanceId);
    }
    if (message.lastClaimUlid !== undefined) {
      obj.lastClaimUlid = message.lastClaimUlid;
    }
    if (message.claimUlid !== "") {
      obj.claimUlid = message.claimUlid;
    }
    if (message.workerUlid !== "") {
      obj.workerUlid = message.workerUlid;
    }
    return obj;
  },
};

function createBaseInstanceDetailsMessage(): InstanceDetailsMessage {
  return { botToken: "", botId: Long.ZERO, id: 0 };
}

export const InstanceDetailsMessage = {
  encode(message: InstanceDetailsMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.botToken !== "") {
      writer.uint32(10).string(message.botToken);
    }
    if (!message.botId.isZero()) {
      writer.uint32(16).int64(message.botId);
    }
    if (message.id !== 0) {
      writer.uint32(24).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InstanceDetailsMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstanceDetailsMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.botToken = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.botId = reader.int64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
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

  fromJSON(object: any): InstanceDetailsMessage {
    return {
      botToken: isSet(object.botToken) ? globalThis.String(object.botToken) : "",
      botId: isSet(object.botId) ? Long.fromValue(object.botId) : Long.ZERO,
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
    };
  },

  toJSON(message: InstanceDetailsMessage): unknown {
    const obj: any = {};
    if (message.botToken !== "") {
      obj.botToken = message.botToken;
    }
    if (!message.botId.isZero()) {
      obj.botId = (message.botId || Long.ZERO).toString();
    }
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },
};

/** Service definition for manging lobby workers */
export type WorkersDefinition = typeof WorkersDefinition;
export const WorkersDefinition = {
  name: "Workers",
  fullName: "workers.Workers",
  methods: {
    getUnclaimedInstance: {
      name: "GetUnclaimedInstance",
      requestType: Empty,
      requestStream: false,
      responseType: InstanceDetailsMessage,
      responseStream: false,
      options: {},
    },
    claimInstance: {
      name: "ClaimInstance",
      requestType: ClaimInstanceMessage,
      requestStream: false,
      responseType: InstanceDetailsMessage,
      responseStream: false,
      options: {},
    },
    getAssignedGuildOptions: {
      name: "GetAssignedGuildOptions",
      requestType: GetAssignedGuildOptionsMessage,
      requestStream: false,
      responseType: GuildOptionsMessage,
      responseStream: false,
      options: {},
    },
    assignInstanceToServer: {
      name: "AssignInstanceToServer",
      requestType: AssignInstanceToServerMessage,
      requestStream: false,
      responseType: InstanceDetailsMessage,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface WorkersServiceImplementation<CallContextExt = {}> {
  getUnclaimedInstance(request: Empty, context: CallContext & CallContextExt): Promise<InstanceDetailsMessage>;
  claimInstance(request: ClaimInstanceMessage, context: CallContext & CallContextExt): Promise<InstanceDetailsMessage>;
  getAssignedGuildOptions(
    request: GetAssignedGuildOptionsMessage,
    context: CallContext & CallContextExt,
  ): Promise<GuildOptionsMessage>;
  assignInstanceToServer(
    request: AssignInstanceToServerMessage,
    context: CallContext & CallContextExt,
  ): Promise<InstanceDetailsMessage>;
}

export interface WorkersClient<CallOptionsExt = {}> {
  getUnclaimedInstance(request: Empty, options?: CallOptions & CallOptionsExt): Promise<InstanceDetailsMessage>;
  claimInstance(request: ClaimInstanceMessage, options?: CallOptions & CallOptionsExt): Promise<InstanceDetailsMessage>;
  getAssignedGuildOptions(
    request: GetAssignedGuildOptionsMessage,
    options?: CallOptions & CallOptionsExt,
  ): Promise<GuildOptionsMessage>;
  assignInstanceToServer(
    request: AssignInstanceToServerMessage,
    options?: CallOptions & CallOptionsExt,
  ): Promise<InstanceDetailsMessage>;
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
