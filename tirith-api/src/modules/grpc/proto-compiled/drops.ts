/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";
import { Int32Value } from "./google/protobuf/wrappers";

export const protobufPackage = "admin";

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
  },
} as const;

export interface DropsServiceImplementation<CallContextExt = {}> {
  /** Schedule a new drop to be dispatched */
  scheduleDrop(request: ScheduleDropRequest, context: CallContext & CallContextExt): Promise<Empty>;
  /** Get the current boost factor for drop delays */
  getCurrentBoostFactor(request: Empty, context: CallContext & CallContextExt): Promise<CurrentBoostFactorReply>;
  /** Calculate min and max drop delay bounds for given online count and boost factor */
  calculateDropDelayBounds(
    request: CalculateDelayRequest,
    context: CallContext & CallContextExt,
  ): Promise<DropDelayBoundsReply>;
}

export interface DropsClient<CallOptionsExt = {}> {
  /** Schedule a new drop to be dispatched */
  scheduleDrop(request: ScheduleDropRequest, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  /** Get the current boost factor for drop delays */
  getCurrentBoostFactor(request: Empty, options?: CallOptions & CallOptionsExt): Promise<CurrentBoostFactorReply>;
  /** Calculate min and max drop delay bounds for given online count and boost factor */
  calculateDropDelayBounds(
    request: CalculateDelayRequest,
    options?: CallOptions & CallOptionsExt,
  ): Promise<DropDelayBoundsReply>;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
