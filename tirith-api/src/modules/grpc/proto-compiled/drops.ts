/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import Long = require("long");
import * as _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";
import { Timestamp } from "./google/protobuf/timestamp";
import { Int32Value } from "./google/protobuf/wrappers";

export const protobufPackage = "admin";

export interface ScheduledDropMessage {
  id: Long;
  timestamp: Date | undefined;
  eventDropId: number | undefined;
}

export interface ClaimDropMessage {
  dropId: Long;
  leagueMode: boolean;
}

export interface ClaimDropResultMessage {
  dropId: Long;
  firstClaim: boolean;
  clearedDrop: boolean;
  catchMs: number;
  leagueWeight: number;
  eventDropId: number | undefined;
  leagueMode: boolean;
}

export interface RewardDropMessage {
  login: number;
  eventDropId: number | undefined;
  value: number;
}

export interface LogDropMessage {
  dropId: Long;
  discordId: Long;
  claimTimestamp: Long;
  lobbyKey: string;
  catchMs: number;
  eventDropId: number | undefined;
}

/** request to schedule a new drop */
export interface ScheduleDropRequest {
  delaySeconds: number;
  eventDropId: number | undefined;
}

/** message to calculate the delay bounds for a drop */
export interface CalculateDelayRequest {
  onlinePlayerCount: number;
  boostFactor: number;
}

/** response containing the min and max delay bounds for a drop delay */
export interface DropDelayBoundsReply {
  minDelaySeconds: number;
  maxDelaySeconds: number;
}

/** request to get the current boost factor */
export interface CurrentBoostFactorReply {
  boost: number;
}

function createBaseScheduledDropMessage(): ScheduledDropMessage {
  return { id: Long.ZERO, timestamp: undefined, eventDropId: undefined };
}

export const ScheduledDropMessage = {
  encode(message: ScheduledDropMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).int64(message.id);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(18).fork()).ldelim();
    }
    if (message.eventDropId !== undefined) {
      Int32Value.encode({ value: message.eventDropId! }, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScheduledDropMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScheduledDropMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.eventDropId = Int32Value.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ScheduledDropMessage {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.ZERO,
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
      eventDropId: isSet(object.eventDropId) ? Number(object.eventDropId) : undefined,
    };
  },

  toJSON(message: ScheduledDropMessage): unknown {
    const obj: any = {};
    if (!message.id.isZero()) {
      obj.id = (message.id || Long.ZERO).toString();
    }
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp.toISOString();
    }
    if (message.eventDropId !== undefined) {
      obj.eventDropId = message.eventDropId;
    }
    return obj;
  },
};

function createBaseClaimDropMessage(): ClaimDropMessage {
  return { dropId: Long.ZERO, leagueMode: false };
}

export const ClaimDropMessage = {
  encode(message: ClaimDropMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.dropId.isZero()) {
      writer.uint32(8).int64(message.dropId);
    }
    if (message.leagueMode === true) {
      writer.uint32(16).bool(message.leagueMode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClaimDropMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClaimDropMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.dropId = reader.int64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.leagueMode = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClaimDropMessage {
    return {
      dropId: isSet(object.dropId) ? Long.fromValue(object.dropId) : Long.ZERO,
      leagueMode: isSet(object.leagueMode) ? globalThis.Boolean(object.leagueMode) : false,
    };
  },

  toJSON(message: ClaimDropMessage): unknown {
    const obj: any = {};
    if (!message.dropId.isZero()) {
      obj.dropId = (message.dropId || Long.ZERO).toString();
    }
    if (message.leagueMode === true) {
      obj.leagueMode = message.leagueMode;
    }
    return obj;
  },
};

function createBaseClaimDropResultMessage(): ClaimDropResultMessage {
  return {
    dropId: Long.ZERO,
    firstClaim: false,
    clearedDrop: false,
    catchMs: 0,
    leagueWeight: 0,
    eventDropId: undefined,
    leagueMode: false,
  };
}

export const ClaimDropResultMessage = {
  encode(message: ClaimDropResultMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.dropId.isZero()) {
      writer.uint32(8).int64(message.dropId);
    }
    if (message.firstClaim === true) {
      writer.uint32(24).bool(message.firstClaim);
    }
    if (message.clearedDrop === true) {
      writer.uint32(32).bool(message.clearedDrop);
    }
    if (message.catchMs !== 0) {
      writer.uint32(40).int32(message.catchMs);
    }
    if (message.leagueWeight !== 0) {
      writer.uint32(49).double(message.leagueWeight);
    }
    if (message.eventDropId !== undefined) {
      Int32Value.encode({ value: message.eventDropId! }, writer.uint32(58).fork()).ldelim();
    }
    if (message.leagueMode === true) {
      writer.uint32(64).bool(message.leagueMode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClaimDropResultMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClaimDropResultMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.dropId = reader.int64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.firstClaim = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.clearedDrop = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.catchMs = reader.int32();
          continue;
        case 6:
          if (tag !== 49) {
            break;
          }

          message.leagueWeight = reader.double();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.eventDropId = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.leagueMode = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClaimDropResultMessage {
    return {
      dropId: isSet(object.dropId) ? Long.fromValue(object.dropId) : Long.ZERO,
      firstClaim: isSet(object.firstClaim) ? globalThis.Boolean(object.firstClaim) : false,
      clearedDrop: isSet(object.clearedDrop) ? globalThis.Boolean(object.clearedDrop) : false,
      catchMs: isSet(object.catchMs) ? globalThis.Number(object.catchMs) : 0,
      leagueWeight: isSet(object.leagueWeight) ? globalThis.Number(object.leagueWeight) : 0,
      eventDropId: isSet(object.eventDropId) ? Number(object.eventDropId) : undefined,
      leagueMode: isSet(object.leagueMode) ? globalThis.Boolean(object.leagueMode) : false,
    };
  },

  toJSON(message: ClaimDropResultMessage): unknown {
    const obj: any = {};
    if (!message.dropId.isZero()) {
      obj.dropId = (message.dropId || Long.ZERO).toString();
    }
    if (message.firstClaim === true) {
      obj.firstClaim = message.firstClaim;
    }
    if (message.clearedDrop === true) {
      obj.clearedDrop = message.clearedDrop;
    }
    if (message.catchMs !== 0) {
      obj.catchMs = Math.round(message.catchMs);
    }
    if (message.leagueWeight !== 0) {
      obj.leagueWeight = message.leagueWeight;
    }
    if (message.eventDropId !== undefined) {
      obj.eventDropId = message.eventDropId;
    }
    if (message.leagueMode === true) {
      obj.leagueMode = message.leagueMode;
    }
    return obj;
  },
};

function createBaseRewardDropMessage(): RewardDropMessage {
  return { login: 0, eventDropId: undefined, value: 0 };
}

export const RewardDropMessage = {
  encode(message: RewardDropMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (message.eventDropId !== undefined) {
      Int32Value.encode({ value: message.eventDropId! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.value !== 0) {
      writer.uint32(25).double(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RewardDropMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRewardDropMessage();
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

          message.eventDropId = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.value = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RewardDropMessage {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      eventDropId: isSet(object.eventDropId) ? Number(object.eventDropId) : undefined,
      value: isSet(object.value) ? globalThis.Number(object.value) : 0,
    };
  },

  toJSON(message: RewardDropMessage): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.eventDropId !== undefined) {
      obj.eventDropId = message.eventDropId;
    }
    if (message.value !== 0) {
      obj.value = message.value;
    }
    return obj;
  },
};

function createBaseLogDropMessage(): LogDropMessage {
  return {
    dropId: Long.ZERO,
    discordId: Long.ZERO,
    claimTimestamp: Long.ZERO,
    lobbyKey: "",
    catchMs: 0,
    eventDropId: undefined,
  };
}

export const LogDropMessage = {
  encode(message: LogDropMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.dropId.isZero()) {
      writer.uint32(8).int64(message.dropId);
    }
    if (!message.discordId.isZero()) {
      writer.uint32(16).int64(message.discordId);
    }
    if (!message.claimTimestamp.isZero()) {
      writer.uint32(24).int64(message.claimTimestamp);
    }
    if (message.lobbyKey !== "") {
      writer.uint32(34).string(message.lobbyKey);
    }
    if (message.catchMs !== 0) {
      writer.uint32(40).int32(message.catchMs);
    }
    if (message.eventDropId !== undefined) {
      Int32Value.encode({ value: message.eventDropId! }, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LogDropMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLogDropMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.dropId = reader.int64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.discordId = reader.int64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.claimTimestamp = reader.int64() as Long;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.lobbyKey = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.catchMs = reader.int32();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.eventDropId = Int32Value.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LogDropMessage {
    return {
      dropId: isSet(object.dropId) ? Long.fromValue(object.dropId) : Long.ZERO,
      discordId: isSet(object.discordId) ? Long.fromValue(object.discordId) : Long.ZERO,
      claimTimestamp: isSet(object.claimTimestamp) ? Long.fromValue(object.claimTimestamp) : Long.ZERO,
      lobbyKey: isSet(object.lobbyKey) ? globalThis.String(object.lobbyKey) : "",
      catchMs: isSet(object.catchMs) ? globalThis.Number(object.catchMs) : 0,
      eventDropId: isSet(object.eventDropId) ? Number(object.eventDropId) : undefined,
    };
  },

  toJSON(message: LogDropMessage): unknown {
    const obj: any = {};
    if (!message.dropId.isZero()) {
      obj.dropId = (message.dropId || Long.ZERO).toString();
    }
    if (!message.discordId.isZero()) {
      obj.discordId = (message.discordId || Long.ZERO).toString();
    }
    if (!message.claimTimestamp.isZero()) {
      obj.claimTimestamp = (message.claimTimestamp || Long.ZERO).toString();
    }
    if (message.lobbyKey !== "") {
      obj.lobbyKey = message.lobbyKey;
    }
    if (message.catchMs !== 0) {
      obj.catchMs = Math.round(message.catchMs);
    }
    if (message.eventDropId !== undefined) {
      obj.eventDropId = message.eventDropId;
    }
    return obj;
  },
};

function createBaseScheduleDropRequest(): ScheduleDropRequest {
  return { delaySeconds: 0, eventDropId: undefined };
}

export const ScheduleDropRequest = {
  encode(message: ScheduleDropRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.delaySeconds !== 0) {
      writer.uint32(8).int32(message.delaySeconds);
    }
    if (message.eventDropId !== undefined) {
      Int32Value.encode({ value: message.eventDropId! }, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScheduleDropRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScheduleDropRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.delaySeconds = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.eventDropId = Int32Value.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ScheduleDropRequest {
    return {
      delaySeconds: isSet(object.delaySeconds) ? globalThis.Number(object.delaySeconds) : 0,
      eventDropId: isSet(object.eventDropId) ? Number(object.eventDropId) : undefined,
    };
  },

  toJSON(message: ScheduleDropRequest): unknown {
    const obj: any = {};
    if (message.delaySeconds !== 0) {
      obj.delaySeconds = Math.round(message.delaySeconds);
    }
    if (message.eventDropId !== undefined) {
      obj.eventDropId = message.eventDropId;
    }
    return obj;
  },
};

function createBaseCalculateDelayRequest(): CalculateDelayRequest {
  return { onlinePlayerCount: 0, boostFactor: 0 };
}

export const CalculateDelayRequest = {
  encode(message: CalculateDelayRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.onlinePlayerCount !== 0) {
      writer.uint32(8).int32(message.onlinePlayerCount);
    }
    if (message.boostFactor !== 0) {
      writer.uint32(17).double(message.boostFactor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CalculateDelayRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCalculateDelayRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.onlinePlayerCount = reader.int32();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.boostFactor = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CalculateDelayRequest {
    return {
      onlinePlayerCount: isSet(object.onlinePlayerCount) ? globalThis.Number(object.onlinePlayerCount) : 0,
      boostFactor: isSet(object.boostFactor) ? globalThis.Number(object.boostFactor) : 0,
    };
  },

  toJSON(message: CalculateDelayRequest): unknown {
    const obj: any = {};
    if (message.onlinePlayerCount !== 0) {
      obj.onlinePlayerCount = Math.round(message.onlinePlayerCount);
    }
    if (message.boostFactor !== 0) {
      obj.boostFactor = message.boostFactor;
    }
    return obj;
  },
};

function createBaseDropDelayBoundsReply(): DropDelayBoundsReply {
  return { minDelaySeconds: 0, maxDelaySeconds: 0 };
}

export const DropDelayBoundsReply = {
  encode(message: DropDelayBoundsReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.minDelaySeconds !== 0) {
      writer.uint32(8).int32(message.minDelaySeconds);
    }
    if (message.maxDelaySeconds !== 0) {
      writer.uint32(16).int32(message.maxDelaySeconds);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DropDelayBoundsReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDropDelayBoundsReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.minDelaySeconds = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.maxDelaySeconds = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DropDelayBoundsReply {
    return {
      minDelaySeconds: isSet(object.minDelaySeconds) ? globalThis.Number(object.minDelaySeconds) : 0,
      maxDelaySeconds: isSet(object.maxDelaySeconds) ? globalThis.Number(object.maxDelaySeconds) : 0,
    };
  },

  toJSON(message: DropDelayBoundsReply): unknown {
    const obj: any = {};
    if (message.minDelaySeconds !== 0) {
      obj.minDelaySeconds = Math.round(message.minDelaySeconds);
    }
    if (message.maxDelaySeconds !== 0) {
      obj.maxDelaySeconds = Math.round(message.maxDelaySeconds);
    }
    return obj;
  },
};

function createBaseCurrentBoostFactorReply(): CurrentBoostFactorReply {
  return { boost: 0 };
}

export const CurrentBoostFactorReply = {
  encode(message: CurrentBoostFactorReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.boost !== 0) {
      writer.uint32(9).double(message.boost);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CurrentBoostFactorReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCurrentBoostFactorReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.boost = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CurrentBoostFactorReply {
    return { boost: isSet(object.boost) ? globalThis.Number(object.boost) : 0 };
  },

  toJSON(message: CurrentBoostFactorReply): unknown {
    const obj: any = {};
    if (message.boost !== 0) {
      obj.boost = message.boost;
    }
    return obj;
  },
};

/** Service definition for drop and management actions */
export type DropsDefinition = typeof DropsDefinition;
export const DropsDefinition = {
  name: "Drops",
  fullName: "admin.Drops",
  methods: {
    /** Schedule a new drop to be dispatched */
    scheduleDrop: {
      name: "ScheduleDrop",
      requestType: ScheduleDropRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** Get the enxt scheduled drop */
    getScheduledDrop: {
      name: "GetScheduledDrop",
      requestType: Empty,
      requestStream: false,
      responseType: ScheduledDropMessage,
      responseStream: false,
      options: {},
    },
    /** Get the current boost factor for drop delays */
    getCurrentBoostFactor: {
      name: "GetCurrentBoostFactor",
      requestType: Empty,
      requestStream: false,
      responseType: CurrentBoostFactorReply,
      responseStream: false,
      options: {},
    },
    /** Calculate min and max drop delay bounds for given online count and boost factor */
    calculateDropDelayBounds: {
      name: "CalculateDropDelayBounds",
      requestType: CalculateDelayRequest,
      requestStream: false,
      responseType: DropDelayBoundsReply,
      responseStream: false,
      options: {},
    },
    /** claim a drop and receive result */
    claimDrop: {
      name: "ClaimDrop",
      requestType: ClaimDropMessage,
      requestStream: false,
      responseType: ClaimDropResultMessage,
      responseStream: false,
      options: {},
    },
    /** log a drop claim */
    logDropClaim: {
      name: "LogDropClaim",
      requestType: LogDropMessage,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** reward a drop */
    rewardDrop: {
      name: "RewardDrop",
      requestType: RewardDropMessage,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface DropsServiceImplementation<CallContextExt = {}> {
  /** Schedule a new drop to be dispatched */
  scheduleDrop(request: ScheduleDropRequest, context: CallContext & CallContextExt): Promise<Empty>;
  /** Get the enxt scheduled drop */
  getScheduledDrop(request: Empty, context: CallContext & CallContextExt): Promise<ScheduledDropMessage>;
  /** Get the current boost factor for drop delays */
  getCurrentBoostFactor(request: Empty, context: CallContext & CallContextExt): Promise<CurrentBoostFactorReply>;
  /** Calculate min and max drop delay bounds for given online count and boost factor */
  calculateDropDelayBounds(
    request: CalculateDelayRequest,
    context: CallContext & CallContextExt,
  ): Promise<DropDelayBoundsReply>;
  /** claim a drop and receive result */
  claimDrop(request: ClaimDropMessage, context: CallContext & CallContextExt): Promise<ClaimDropResultMessage>;
  /** log a drop claim */
  logDropClaim(request: LogDropMessage, context: CallContext & CallContextExt): Promise<Empty>;
  /** reward a drop */
  rewardDrop(request: RewardDropMessage, context: CallContext & CallContextExt): Promise<Empty>;
}

export interface DropsClient<CallOptionsExt = {}> {
  /** Schedule a new drop to be dispatched */
  scheduleDrop(request: ScheduleDropRequest, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  /** Get the enxt scheduled drop */
  getScheduledDrop(request: Empty, options?: CallOptions & CallOptionsExt): Promise<ScheduledDropMessage>;
  /** Get the current boost factor for drop delays */
  getCurrentBoostFactor(request: Empty, options?: CallOptions & CallOptionsExt): Promise<CurrentBoostFactorReply>;
  /** Calculate min and max drop delay bounds for given online count and boost factor */
  calculateDropDelayBounds(
    request: CalculateDelayRequest,
    options?: CallOptions & CallOptionsExt,
  ): Promise<DropDelayBoundsReply>;
  /** claim a drop and receive result */
  claimDrop(request: ClaimDropMessage, options?: CallOptions & CallOptionsExt): Promise<ClaimDropResultMessage>;
  /** log a drop claim */
  logDropClaim(request: LogDropMessage, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  /** reward a drop */
  rewardDrop(request: RewardDropMessage, options?: CallOptions & CallOptionsExt): Promise<Empty>;
}

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds.toNumber() || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
