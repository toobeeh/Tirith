/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import { Empty } from "./google/protobuf/empty";
import Long = require("long");
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "admin";

/** Request to update the flags of members */
export interface UpdateMemberFlagsRequest {
  memberIds: Long[];
  invertOthers: boolean;
  state: boolean;
  flagId: number;
}

function createBaseUpdateMemberFlagsRequest(): UpdateMemberFlagsRequest {
  return { memberIds: [], invertOthers: false, state: false, flagId: 0 };
}

export const UpdateMemberFlagsRequest = {
  encode(message: UpdateMemberFlagsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.memberIds) {
      writer.int64(v);
    }
    writer.ldelim();
    if (message.invertOthers === true) {
      writer.uint32(16).bool(message.invertOthers);
    }
    if (message.state === true) {
      writer.uint32(24).bool(message.state);
    }
    if (message.flagId !== 0) {
      writer.uint32(32).int32(message.flagId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateMemberFlagsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateMemberFlagsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.memberIds.push(reader.int64() as Long);

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.memberIds.push(reader.int64() as Long);
            }

            continue;
          }

          break;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.invertOthers = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.state = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.flagId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateMemberFlagsRequest {
    return {
      memberIds: globalThis.Array.isArray(object?.memberIds) ? object.memberIds.map((e: any) => Long.fromValue(e)) : [],
      invertOthers: isSet(object.invertOthers) ? globalThis.Boolean(object.invertOthers) : false,
      state: isSet(object.state) ? globalThis.Boolean(object.state) : false,
      flagId: isSet(object.flagId) ? globalThis.Number(object.flagId) : 0,
    };
  },

  toJSON(message: UpdateMemberFlagsRequest): unknown {
    const obj: any = {};
    if (message.memberIds?.length) {
      obj.memberIds = message.memberIds.map((e) => (e || Long.ZERO).toString());
    }
    if (message.invertOthers === true) {
      obj.invertOthers = message.invertOthers;
    }
    if (message.state === true) {
      obj.state = message.state;
    }
    if (message.flagId !== 0) {
      obj.flagId = Math.round(message.flagId);
    }
    return obj;
  },
};

/** Service definition for administration and management actions */
export type AdminDefinition = typeof AdminDefinition;
export const AdminDefinition = {
  name: "Admin",
  fullName: "admin.Admin",
  methods: {
    /** Reevaluates the last chunk of the drop cache */
    reevaluateDropChunks: {
      name: "ReevaluateDropChunks",
      requestType: Empty,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** Update the flags of members */
    updateMemberFlags: {
      name: "UpdateMemberFlags",
      requestType: UpdateMemberFlagsRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface AdminServiceImplementation<CallContextExt = {}> {
  /** Reevaluates the last chunk of the drop cache */
  reevaluateDropChunks(request: Empty, context: CallContext & CallContextExt): Promise<Empty>;
  /** Update the flags of members */
  updateMemberFlags(request: UpdateMemberFlagsRequest, context: CallContext & CallContextExt): Promise<Empty>;
}

export interface AdminClient<CallOptionsExt = {}> {
  /** Reevaluates the last chunk of the drop cache */
  reevaluateDropChunks(request: Empty, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  /** Update the flags of members */
  updateMemberFlags(request: UpdateMemberFlagsRequest, options?: CallOptions & CallOptionsExt): Promise<Empty>;
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
