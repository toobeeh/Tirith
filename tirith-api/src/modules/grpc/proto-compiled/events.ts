/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "events";

/** A palantir event */
export interface EventReply {
  name: string;
  id: number;
  start: string;
  description: string;
  length: number;
}

function createBaseEventReply(): EventReply {
  return { name: "", id: 0, start: "", description: "", length: 0 };
}

export const EventReply = {
  encode(message: EventReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.id !== 0) {
      writer.uint32(16).int32(message.id);
    }
    if (message.start !== "") {
      writer.uint32(26).string(message.start);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.length !== 0) {
      writer.uint32(40).int32(message.length);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventReply();
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

          message.id = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.start = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.description = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.length = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventReply {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      start: isSet(object.start) ? globalThis.String(object.start) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      length: isSet(object.length) ? globalThis.Number(object.length) : 0,
    };
  },

  toJSON(message: EventReply): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.start !== "") {
      obj.start = message.start;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.length !== 0) {
      obj.length = Math.round(message.length);
    }
    return obj;
  },

  create(base?: DeepPartial<EventReply>): EventReply {
    return EventReply.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<EventReply>): EventReply {
    const message = createBaseEventReply();
    message.name = object.name ?? "";
    message.id = object.id ?? 0;
    message.start = object.start ?? "";
    message.description = object.description ?? "";
    message.length = object.length ?? 0;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
