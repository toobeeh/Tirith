/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";
import { Timestamp } from "./google/protobuf/timestamp";
import { Int32Value, StringValue } from "./google/protobuf/wrappers";
import Long = require("long");

export const protobufPackage = "splits";

/** Request to get the splits credits of a member */
export interface GetMemberSplitRewardsRequest {
  login: number;
}

export interface GetAvailableSplitsRequest {
  login: number;
}

export interface AvailableSplitsReply {
  totalSplits: number;
  availableSplits: number;
  activeDropboosts: ActiveDropboostReply[];
  canStartBoost: boolean;
}

/** Request to get a static split definition by id */
export interface GetSplitByIdRequest {
  id: number;
}

/** Request to reward a member with a split credit */
export interface RewardSplitRequest {
  splitId: number;
  rewardeeLogin: number;
  comment: string | undefined;
  valueOverride: number | undefined;
}

/** A static split definition */
export interface SplitReply {
  id: number;
  name: string;
  description: string;
  creationDate: Date | undefined;
  value: number;
}

/** A split reward of a member */
export interface SplitRewardReply {
  rewardeeLogin: number;
  split: SplitReply | undefined;
  rewardDate: Date | undefined;
  comment: string | undefined;
  valueOverride: number | undefined;
  expired: boolean;
}

export interface StartDropboostRequest {
  login: number;
  durationSplits: number;
  factorSplits: number;
  cooldownSplits: number;
}

export interface UpgradeDropboostRequest {
  login: number;
  startDate: Date | undefined;
  durationSplitsIncrease: number;
  factorSplitsIncrease: number;
  cooldownSplitsIncrease: number;
}

export interface ActiveDropboostReply {
  login: number;
  /** the value of this boost in splits */
  value: number;
  startDate: Date | undefined;
  durationSeconds: number;
  factor: number;
  cooldownSeconds: number;
  endDate: Date | undefined;
  cooldownEndDate: Date | undefined;
}

export interface GetActiveDropboostsForMemberRequest {
  login: number;
}

export interface BoostCostInformationReply {
  factorSplitCost: number;
  factorIncrease: number;
  defaultFactor: number;
  durationSplitCost: number;
  durationIncreaseMinutes: number;
  defaultDurationMinutes: number;
  cooldownSplitCost: number;
  cooldownIncreaseHours: number;
  defaultCooldownHours: number;
}

function createBaseGetMemberSplitRewardsRequest(): GetMemberSplitRewardsRequest {
  return { login: 0 };
}

export const GetMemberSplitRewardsRequest = {
  encode(message: GetMemberSplitRewardsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMemberSplitRewardsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMemberSplitRewardsRequest();
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

  fromJSON(object: any): GetMemberSplitRewardsRequest {
    return { login: isSet(object.login) ? globalThis.Number(object.login) : 0 };
  },

  toJSON(message: GetMemberSplitRewardsRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    return obj;
  },
};

function createBaseGetAvailableSplitsRequest(): GetAvailableSplitsRequest {
  return { login: 0 };
}

export const GetAvailableSplitsRequest = {
  encode(message: GetAvailableSplitsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAvailableSplitsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAvailableSplitsRequest();
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

  fromJSON(object: any): GetAvailableSplitsRequest {
    return { login: isSet(object.login) ? globalThis.Number(object.login) : 0 };
  },

  toJSON(message: GetAvailableSplitsRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    return obj;
  },
};

function createBaseAvailableSplitsReply(): AvailableSplitsReply {
  return { totalSplits: 0, availableSplits: 0, activeDropboosts: [], canStartBoost: false };
}

export const AvailableSplitsReply = {
  encode(message: AvailableSplitsReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.totalSplits !== 0) {
      writer.uint32(8).int32(message.totalSplits);
    }
    if (message.availableSplits !== 0) {
      writer.uint32(16).int32(message.availableSplits);
    }
    for (const v of message.activeDropboosts) {
      ActiveDropboostReply.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.canStartBoost === true) {
      writer.uint32(32).bool(message.canStartBoost);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AvailableSplitsReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAvailableSplitsReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.totalSplits = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.availableSplits = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.activeDropboosts.push(ActiveDropboostReply.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.canStartBoost = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AvailableSplitsReply {
    return {
      totalSplits: isSet(object.totalSplits) ? globalThis.Number(object.totalSplits) : 0,
      availableSplits: isSet(object.availableSplits) ? globalThis.Number(object.availableSplits) : 0,
      activeDropboosts: globalThis.Array.isArray(object?.activeDropboosts)
        ? object.activeDropboosts.map((e: any) => ActiveDropboostReply.fromJSON(e))
        : [],
      canStartBoost: isSet(object.canStartBoost) ? globalThis.Boolean(object.canStartBoost) : false,
    };
  },

  toJSON(message: AvailableSplitsReply): unknown {
    const obj: any = {};
    if (message.totalSplits !== 0) {
      obj.totalSplits = Math.round(message.totalSplits);
    }
    if (message.availableSplits !== 0) {
      obj.availableSplits = Math.round(message.availableSplits);
    }
    if (message.activeDropboosts?.length) {
      obj.activeDropboosts = message.activeDropboosts.map((e) => ActiveDropboostReply.toJSON(e));
    }
    if (message.canStartBoost === true) {
      obj.canStartBoost = message.canStartBoost;
    }
    return obj;
  },
};

function createBaseGetSplitByIdRequest(): GetSplitByIdRequest {
  return { id: 0 };
}

export const GetSplitByIdRequest = {
  encode(message: GetSplitByIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSplitByIdRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSplitByIdRequest();
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

  fromJSON(object: any): GetSplitByIdRequest {
    return { id: isSet(object.id) ? globalThis.Number(object.id) : 0 };
  },

  toJSON(message: GetSplitByIdRequest): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },
};

function createBaseRewardSplitRequest(): RewardSplitRequest {
  return { splitId: 0, rewardeeLogin: 0, comment: undefined, valueOverride: undefined };
}

export const RewardSplitRequest = {
  encode(message: RewardSplitRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.splitId !== 0) {
      writer.uint32(8).int32(message.splitId);
    }
    if (message.rewardeeLogin !== 0) {
      writer.uint32(16).int32(message.rewardeeLogin);
    }
    if (message.comment !== undefined) {
      StringValue.encode({ value: message.comment! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.valueOverride !== undefined) {
      Int32Value.encode({ value: message.valueOverride! }, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RewardSplitRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRewardSplitRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.splitId = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.rewardeeLogin = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.comment = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.valueOverride = Int32Value.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RewardSplitRequest {
    return {
      splitId: isSet(object.splitId) ? globalThis.Number(object.splitId) : 0,
      rewardeeLogin: isSet(object.rewardeeLogin) ? globalThis.Number(object.rewardeeLogin) : 0,
      comment: isSet(object.comment) ? String(object.comment) : undefined,
      valueOverride: isSet(object.valueOverride) ? Number(object.valueOverride) : undefined,
    };
  },

  toJSON(message: RewardSplitRequest): unknown {
    const obj: any = {};
    if (message.splitId !== 0) {
      obj.splitId = Math.round(message.splitId);
    }
    if (message.rewardeeLogin !== 0) {
      obj.rewardeeLogin = Math.round(message.rewardeeLogin);
    }
    if (message.comment !== undefined) {
      obj.comment = message.comment;
    }
    if (message.valueOverride !== undefined) {
      obj.valueOverride = message.valueOverride;
    }
    return obj;
  },
};

function createBaseSplitReply(): SplitReply {
  return { id: 0, name: "", description: "", creationDate: undefined, value: 0 };
}

export const SplitReply = {
  encode(message: SplitReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.creationDate !== undefined) {
      Timestamp.encode(toTimestamp(message.creationDate), writer.uint32(34).fork()).ldelim();
    }
    if (message.value !== 0) {
      writer.uint32(40).int32(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SplitReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSplitReply();
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
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.creationDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.value = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SplitReply {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      creationDate: isSet(object.creationDate) ? fromJsonTimestamp(object.creationDate) : undefined,
      value: isSet(object.value) ? globalThis.Number(object.value) : 0,
    };
  },

  toJSON(message: SplitReply): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.creationDate !== undefined) {
      obj.creationDate = message.creationDate.toISOString();
    }
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },
};

function createBaseSplitRewardReply(): SplitRewardReply {
  return {
    rewardeeLogin: 0,
    split: undefined,
    rewardDate: undefined,
    comment: undefined,
    valueOverride: undefined,
    expired: false,
  };
}

export const SplitRewardReply = {
  encode(message: SplitRewardReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rewardeeLogin !== 0) {
      writer.uint32(16).int32(message.rewardeeLogin);
    }
    if (message.split !== undefined) {
      SplitReply.encode(message.split, writer.uint32(26).fork()).ldelim();
    }
    if (message.rewardDate !== undefined) {
      Timestamp.encode(toTimestamp(message.rewardDate), writer.uint32(34).fork()).ldelim();
    }
    if (message.comment !== undefined) {
      StringValue.encode({ value: message.comment! }, writer.uint32(42).fork()).ldelim();
    }
    if (message.valueOverride !== undefined) {
      Int32Value.encode({ value: message.valueOverride! }, writer.uint32(50).fork()).ldelim();
    }
    if (message.expired === true) {
      writer.uint32(56).bool(message.expired);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SplitRewardReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSplitRewardReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 16) {
            break;
          }

          message.rewardeeLogin = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.split = SplitReply.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.rewardDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.comment = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.valueOverride = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.expired = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SplitRewardReply {
    return {
      rewardeeLogin: isSet(object.rewardeeLogin) ? globalThis.Number(object.rewardeeLogin) : 0,
      split: isSet(object.split) ? SplitReply.fromJSON(object.split) : undefined,
      rewardDate: isSet(object.rewardDate) ? fromJsonTimestamp(object.rewardDate) : undefined,
      comment: isSet(object.comment) ? String(object.comment) : undefined,
      valueOverride: isSet(object.valueOverride) ? Number(object.valueOverride) : undefined,
      expired: isSet(object.expired) ? globalThis.Boolean(object.expired) : false,
    };
  },

  toJSON(message: SplitRewardReply): unknown {
    const obj: any = {};
    if (message.rewardeeLogin !== 0) {
      obj.rewardeeLogin = Math.round(message.rewardeeLogin);
    }
    if (message.split !== undefined) {
      obj.split = SplitReply.toJSON(message.split);
    }
    if (message.rewardDate !== undefined) {
      obj.rewardDate = message.rewardDate.toISOString();
    }
    if (message.comment !== undefined) {
      obj.comment = message.comment;
    }
    if (message.valueOverride !== undefined) {
      obj.valueOverride = message.valueOverride;
    }
    if (message.expired === true) {
      obj.expired = message.expired;
    }
    return obj;
  },
};

function createBaseStartDropboostRequest(): StartDropboostRequest {
  return { login: 0, durationSplits: 0, factorSplits: 0, cooldownSplits: 0 };
}

export const StartDropboostRequest = {
  encode(message: StartDropboostRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (message.durationSplits !== 0) {
      writer.uint32(40).int32(message.durationSplits);
    }
    if (message.factorSplits !== 0) {
      writer.uint32(48).int32(message.factorSplits);
    }
    if (message.cooldownSplits !== 0) {
      writer.uint32(56).int32(message.cooldownSplits);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StartDropboostRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStartDropboostRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.login = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.durationSplits = reader.int32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.factorSplits = reader.int32();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.cooldownSplits = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StartDropboostRequest {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      durationSplits: isSet(object.durationSplits) ? globalThis.Number(object.durationSplits) : 0,
      factorSplits: isSet(object.factorSplits) ? globalThis.Number(object.factorSplits) : 0,
      cooldownSplits: isSet(object.cooldownSplits) ? globalThis.Number(object.cooldownSplits) : 0,
    };
  },

  toJSON(message: StartDropboostRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.durationSplits !== 0) {
      obj.durationSplits = Math.round(message.durationSplits);
    }
    if (message.factorSplits !== 0) {
      obj.factorSplits = Math.round(message.factorSplits);
    }
    if (message.cooldownSplits !== 0) {
      obj.cooldownSplits = Math.round(message.cooldownSplits);
    }
    return obj;
  },
};

function createBaseUpgradeDropboostRequest(): UpgradeDropboostRequest {
  return {
    login: 0,
    startDate: undefined,
    durationSplitsIncrease: 0,
    factorSplitsIncrease: 0,
    cooldownSplitsIncrease: 0,
  };
}

export const UpgradeDropboostRequest = {
  encode(message: UpgradeDropboostRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (message.startDate !== undefined) {
      Timestamp.encode(toTimestamp(message.startDate), writer.uint32(18).fork()).ldelim();
    }
    if (message.durationSplitsIncrease !== 0) {
      writer.uint32(24).int32(message.durationSplitsIncrease);
    }
    if (message.factorSplitsIncrease !== 0) {
      writer.uint32(32).int32(message.factorSplitsIncrease);
    }
    if (message.cooldownSplitsIncrease !== 0) {
      writer.uint32(40).int32(message.cooldownSplitsIncrease);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpgradeDropboostRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpgradeDropboostRequest();
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

          message.startDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.durationSplitsIncrease = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.factorSplitsIncrease = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.cooldownSplitsIncrease = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpgradeDropboostRequest {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      startDate: isSet(object.startDate) ? fromJsonTimestamp(object.startDate) : undefined,
      durationSplitsIncrease: isSet(object.durationSplitsIncrease)
        ? globalThis.Number(object.durationSplitsIncrease)
        : 0,
      factorSplitsIncrease: isSet(object.factorSplitsIncrease) ? globalThis.Number(object.factorSplitsIncrease) : 0,
      cooldownSplitsIncrease: isSet(object.cooldownSplitsIncrease)
        ? globalThis.Number(object.cooldownSplitsIncrease)
        : 0,
    };
  },

  toJSON(message: UpgradeDropboostRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.startDate !== undefined) {
      obj.startDate = message.startDate.toISOString();
    }
    if (message.durationSplitsIncrease !== 0) {
      obj.durationSplitsIncrease = Math.round(message.durationSplitsIncrease);
    }
    if (message.factorSplitsIncrease !== 0) {
      obj.factorSplitsIncrease = Math.round(message.factorSplitsIncrease);
    }
    if (message.cooldownSplitsIncrease !== 0) {
      obj.cooldownSplitsIncrease = Math.round(message.cooldownSplitsIncrease);
    }
    return obj;
  },
};

function createBaseActiveDropboostReply(): ActiveDropboostReply {
  return {
    login: 0,
    value: 0,
    startDate: undefined,
    durationSeconds: 0,
    factor: 0,
    cooldownSeconds: 0,
    endDate: undefined,
    cooldownEndDate: undefined,
  };
}

export const ActiveDropboostReply = {
  encode(message: ActiveDropboostReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (message.value !== 0) {
      writer.uint32(24).int32(message.value);
    }
    if (message.startDate !== undefined) {
      Timestamp.encode(toTimestamp(message.startDate), writer.uint32(34).fork()).ldelim();
    }
    if (message.durationSeconds !== 0) {
      writer.uint32(40).int32(message.durationSeconds);
    }
    if (message.factor !== 0) {
      writer.uint32(49).double(message.factor);
    }
    if (message.cooldownSeconds !== 0) {
      writer.uint32(56).int32(message.cooldownSeconds);
    }
    if (message.endDate !== undefined) {
      Timestamp.encode(toTimestamp(message.endDate), writer.uint32(66).fork()).ldelim();
    }
    if (message.cooldownEndDate !== undefined) {
      Timestamp.encode(toTimestamp(message.cooldownEndDate), writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActiveDropboostReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActiveDropboostReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.login = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.value = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.startDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.durationSeconds = reader.int32();
          continue;
        case 6:
          if (tag !== 49) {
            break;
          }

          message.factor = reader.double();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.cooldownSeconds = reader.int32();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.endDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.cooldownEndDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ActiveDropboostReply {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      value: isSet(object.value) ? globalThis.Number(object.value) : 0,
      startDate: isSet(object.startDate) ? fromJsonTimestamp(object.startDate) : undefined,
      durationSeconds: isSet(object.durationSeconds) ? globalThis.Number(object.durationSeconds) : 0,
      factor: isSet(object.factor) ? globalThis.Number(object.factor) : 0,
      cooldownSeconds: isSet(object.cooldownSeconds) ? globalThis.Number(object.cooldownSeconds) : 0,
      endDate: isSet(object.endDate) ? fromJsonTimestamp(object.endDate) : undefined,
      cooldownEndDate: isSet(object.cooldownEndDate) ? fromJsonTimestamp(object.cooldownEndDate) : undefined,
    };
  },

  toJSON(message: ActiveDropboostReply): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    if (message.startDate !== undefined) {
      obj.startDate = message.startDate.toISOString();
    }
    if (message.durationSeconds !== 0) {
      obj.durationSeconds = Math.round(message.durationSeconds);
    }
    if (message.factor !== 0) {
      obj.factor = message.factor;
    }
    if (message.cooldownSeconds !== 0) {
      obj.cooldownSeconds = Math.round(message.cooldownSeconds);
    }
    if (message.endDate !== undefined) {
      obj.endDate = message.endDate.toISOString();
    }
    if (message.cooldownEndDate !== undefined) {
      obj.cooldownEndDate = message.cooldownEndDate.toISOString();
    }
    return obj;
  },
};

function createBaseGetActiveDropboostsForMemberRequest(): GetActiveDropboostsForMemberRequest {
  return { login: 0 };
}

export const GetActiveDropboostsForMemberRequest = {
  encode(message: GetActiveDropboostsForMemberRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetActiveDropboostsForMemberRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetActiveDropboostsForMemberRequest();
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

  fromJSON(object: any): GetActiveDropboostsForMemberRequest {
    return { login: isSet(object.login) ? globalThis.Number(object.login) : 0 };
  },

  toJSON(message: GetActiveDropboostsForMemberRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    return obj;
  },
};

function createBaseBoostCostInformationReply(): BoostCostInformationReply {
  return {
    factorSplitCost: 0,
    factorIncrease: 0,
    defaultFactor: 0,
    durationSplitCost: 0,
    durationIncreaseMinutes: 0,
    defaultDurationMinutes: 0,
    cooldownSplitCost: 0,
    cooldownIncreaseHours: 0,
    defaultCooldownHours: 0,
  };
}

export const BoostCostInformationReply = {
  encode(message: BoostCostInformationReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.factorSplitCost !== 0) {
      writer.uint32(8).int32(message.factorSplitCost);
    }
    if (message.factorIncrease !== 0) {
      writer.uint32(17).double(message.factorIncrease);
    }
    if (message.defaultFactor !== 0) {
      writer.uint32(25).double(message.defaultFactor);
    }
    if (message.durationSplitCost !== 0) {
      writer.uint32(32).int32(message.durationSplitCost);
    }
    if (message.durationIncreaseMinutes !== 0) {
      writer.uint32(40).int32(message.durationIncreaseMinutes);
    }
    if (message.defaultDurationMinutes !== 0) {
      writer.uint32(48).int32(message.defaultDurationMinutes);
    }
    if (message.cooldownSplitCost !== 0) {
      writer.uint32(56).int32(message.cooldownSplitCost);
    }
    if (message.cooldownIncreaseHours !== 0) {
      writer.uint32(64).int32(message.cooldownIncreaseHours);
    }
    if (message.defaultCooldownHours !== 0) {
      writer.uint32(72).int32(message.defaultCooldownHours);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BoostCostInformationReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBoostCostInformationReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.factorSplitCost = reader.int32();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.factorIncrease = reader.double();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.defaultFactor = reader.double();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.durationSplitCost = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.durationIncreaseMinutes = reader.int32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.defaultDurationMinutes = reader.int32();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.cooldownSplitCost = reader.int32();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.cooldownIncreaseHours = reader.int32();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.defaultCooldownHours = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BoostCostInformationReply {
    return {
      factorSplitCost: isSet(object.factorSplitCost) ? globalThis.Number(object.factorSplitCost) : 0,
      factorIncrease: isSet(object.factorIncrease) ? globalThis.Number(object.factorIncrease) : 0,
      defaultFactor: isSet(object.defaultFactor) ? globalThis.Number(object.defaultFactor) : 0,
      durationSplitCost: isSet(object.durationSplitCost) ? globalThis.Number(object.durationSplitCost) : 0,
      durationIncreaseMinutes: isSet(object.durationIncreaseMinutes)
        ? globalThis.Number(object.durationIncreaseMinutes)
        : 0,
      defaultDurationMinutes: isSet(object.defaultDurationMinutes)
        ? globalThis.Number(object.defaultDurationMinutes)
        : 0,
      cooldownSplitCost: isSet(object.cooldownSplitCost) ? globalThis.Number(object.cooldownSplitCost) : 0,
      cooldownIncreaseHours: isSet(object.cooldownIncreaseHours) ? globalThis.Number(object.cooldownIncreaseHours) : 0,
      defaultCooldownHours: isSet(object.defaultCooldownHours) ? globalThis.Number(object.defaultCooldownHours) : 0,
    };
  },

  toJSON(message: BoostCostInformationReply): unknown {
    const obj: any = {};
    if (message.factorSplitCost !== 0) {
      obj.factorSplitCost = Math.round(message.factorSplitCost);
    }
    if (message.factorIncrease !== 0) {
      obj.factorIncrease = message.factorIncrease;
    }
    if (message.defaultFactor !== 0) {
      obj.defaultFactor = message.defaultFactor;
    }
    if (message.durationSplitCost !== 0) {
      obj.durationSplitCost = Math.round(message.durationSplitCost);
    }
    if (message.durationIncreaseMinutes !== 0) {
      obj.durationIncreaseMinutes = Math.round(message.durationIncreaseMinutes);
    }
    if (message.defaultDurationMinutes !== 0) {
      obj.defaultDurationMinutes = Math.round(message.defaultDurationMinutes);
    }
    if (message.cooldownSplitCost !== 0) {
      obj.cooldownSplitCost = Math.round(message.cooldownSplitCost);
    }
    if (message.cooldownIncreaseHours !== 0) {
      obj.cooldownIncreaseHours = Math.round(message.cooldownIncreaseHours);
    }
    if (message.defaultCooldownHours !== 0) {
      obj.defaultCooldownHours = Math.round(message.defaultCooldownHours);
    }
    return obj;
  },
};

/** Service definition for splits and dropboosts */
export type SplitsDefinition = typeof SplitsDefinition;
export const SplitsDefinition = {
  name: "Splits",
  fullName: "splits.Splits",
  methods: {
    /** Get all split definitions */
    getSplits: {
      name: "GetSplits",
      requestType: Empty,
      requestStream: false,
      responseType: SplitReply,
      responseStream: true,
      options: {},
    },
    /** Get a split reply by id */
    getSplitById: {
      name: "GetSplitById",
      requestType: GetSplitByIdRequest,
      requestStream: false,
      responseType: SplitReply,
      responseStream: false,
      options: {},
    },
    /** Get all split rewards for a member */
    getMemberSplitRewards: {
      name: "GetMemberSplitRewards",
      requestType: GetMemberSplitRewardsRequest,
      requestStream: false,
      responseType: SplitRewardReply,
      responseStream: true,
      options: {},
    },
    /** Reward a member with a split */
    rewardSplit: {
      name: "RewardSplit",
      requestType: RewardSplitRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** Get information of the cost of a dropboost */
    getBoostCostInformation: {
      name: "GetBoostCostInformation",
      requestType: Empty,
      requestStream: false,
      responseType: BoostCostInformationReply,
      responseStream: false,
      options: {},
    },
    /** Gets all active dropboosts */
    getActiveDropboosts: {
      name: "GetActiveDropboosts",
      requestType: Empty,
      requestStream: false,
      responseType: ActiveDropboostReply,
      responseStream: true,
      options: {},
    },
    /** Gets all active dropboosts for a member */
    getActiveDropboostsOfMember: {
      name: "GetActiveDropboostsOfMember",
      requestType: GetActiveDropboostsForMemberRequest,
      requestStream: false,
      responseType: ActiveDropboostReply,
      responseStream: true,
      options: {},
    },
    /** Starts a new dropboost for a member */
    startDropboost: {
      name: "StartDropboost",
      requestType: StartDropboostRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** Upgrades an existing dropboost of a member */
    upgradeDropboost: {
      name: "UpgradeDropboost",
      requestType: UpgradeDropboostRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** Gets the currently available splits of a member */
    getAvailableSplits: {
      name: "GetAvailableSplits",
      requestType: GetAvailableSplitsRequest,
      requestStream: false,
      responseType: AvailableSplitsReply,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface SplitsServiceImplementation<CallContextExt = {}> {
  /** Get all split definitions */
  getSplits(request: Empty, context: CallContext & CallContextExt): ServerStreamingMethodResult<SplitReply>;
  /** Get a split reply by id */
  getSplitById(request: GetSplitByIdRequest, context: CallContext & CallContextExt): Promise<SplitReply>;
  /** Get all split rewards for a member */
  getMemberSplitRewards(
    request: GetMemberSplitRewardsRequest,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<SplitRewardReply>;
  /** Reward a member with a split */
  rewardSplit(request: RewardSplitRequest, context: CallContext & CallContextExt): Promise<Empty>;
  /** Get information of the cost of a dropboost */
  getBoostCostInformation(request: Empty, context: CallContext & CallContextExt): Promise<BoostCostInformationReply>;
  /** Gets all active dropboosts */
  getActiveDropboosts(
    request: Empty,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<ActiveDropboostReply>;
  /** Gets all active dropboosts for a member */
  getActiveDropboostsOfMember(
    request: GetActiveDropboostsForMemberRequest,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<ActiveDropboostReply>;
  /** Starts a new dropboost for a member */
  startDropboost(request: StartDropboostRequest, context: CallContext & CallContextExt): Promise<Empty>;
  /** Upgrades an existing dropboost of a member */
  upgradeDropboost(request: UpgradeDropboostRequest, context: CallContext & CallContextExt): Promise<Empty>;
  /** Gets the currently available splits of a member */
  getAvailableSplits(
    request: GetAvailableSplitsRequest,
    context: CallContext & CallContextExt,
  ): Promise<AvailableSplitsReply>;
}

export interface SplitsClient<CallOptionsExt = {}> {
  /** Get all split definitions */
  getSplits(request: Empty, options?: CallOptions & CallOptionsExt): AsyncIterable<SplitReply>;
  /** Get a split reply by id */
  getSplitById(request: GetSplitByIdRequest, options?: CallOptions & CallOptionsExt): Promise<SplitReply>;
  /** Get all split rewards for a member */
  getMemberSplitRewards(
    request: GetMemberSplitRewardsRequest,
    options?: CallOptions & CallOptionsExt,
  ): AsyncIterable<SplitRewardReply>;
  /** Reward a member with a split */
  rewardSplit(request: RewardSplitRequest, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  /** Get information of the cost of a dropboost */
  getBoostCostInformation(request: Empty, options?: CallOptions & CallOptionsExt): Promise<BoostCostInformationReply>;
  /** Gets all active dropboosts */
  getActiveDropboosts(request: Empty, options?: CallOptions & CallOptionsExt): AsyncIterable<ActiveDropboostReply>;
  /** Gets all active dropboosts for a member */
  getActiveDropboostsOfMember(
    request: GetActiveDropboostsForMemberRequest,
    options?: CallOptions & CallOptionsExt,
  ): AsyncIterable<ActiveDropboostReply>;
  /** Starts a new dropboost for a member */
  startDropboost(request: StartDropboostRequest, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  /** Upgrades an existing dropboost of a member */
  upgradeDropboost(request: UpgradeDropboostRequest, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  /** Gets the currently available splits of a member */
  getAvailableSplits(
    request: GetAvailableSplitsRequest,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AvailableSplitsReply>;
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

export type ServerStreamingMethodResult<Response> = { [Symbol.asyncIterator](): AsyncIterator<Response, void> };
