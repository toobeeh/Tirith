/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import { Int32Value } from "./google/protobuf/wrappers";

export const protobufPackage = "greet";

/** The request message containing the user's name. */
export interface HelloRequest {
  name: string;
}

/** The response message containing the greetings. */
export interface HelloReply {
  message: string;
  id: number | undefined;
}

function createBaseHelloRequest(): HelloRequest {
  return { name: "" };
}

export const HelloRequest = {
  encode(message: HelloRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HelloRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHelloRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HelloRequest {
    return { name: isSet(object.name) ? globalThis.String(object.name) : "" };
  },

  toJSON(message: HelloRequest): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create(base?: DeepPartial<HelloRequest>): HelloRequest {
    return HelloRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<HelloRequest>): HelloRequest {
    const message = createBaseHelloRequest();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseHelloReply(): HelloReply {
  return { message: "", id: undefined };
}

export const HelloReply = {
  encode(message: HelloReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    if (message.id !== undefined) {
      Int32Value.encode({ value: message.id! }, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HelloReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHelloReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = Int32Value.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HelloReply {
    return {
      message: isSet(object.message) ? globalThis.String(object.message) : "",
      id: isSet(object.id) ? Number(object.id) : undefined,
    };
  },

  toJSON(message: HelloReply): unknown {
    const obj: any = {};
    if (message.message !== "") {
      obj.message = message.message;
    }
    if (message.id !== undefined) {
      obj.id = message.id;
    }
    return obj;
  },

  create(base?: DeepPartial<HelloReply>): HelloReply {
    return HelloReply.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<HelloReply>): HelloReply {
    const message = createBaseHelloReply();
    message.message = object.message ?? "";
    message.id = object.id ?? undefined;
    return message;
  },
};

/** The greeting service definition. */
export type GreeterDefinition = typeof GreeterDefinition;
export const GreeterDefinition = {
  name: "Greeter",
  fullName: "greet.Greeter",
  methods: {
    /** Sends a greeting */
    sayHello: {
      name: "SayHello",
      requestType: HelloRequest,
      requestStream: false,
      responseType: HelloReply,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface GreeterServiceImplementation<CallContextExt = {}> {
  /** Sends a greeting */
  sayHello(request: HelloRequest, context: CallContext & CallContextExt): Promise<DeepPartial<HelloReply>>;
}

export interface GreeterClient<CallOptionsExt = {}> {
  /** Sends a greeting */
  sayHello(request: DeepPartial<HelloRequest>, options?: CallOptions & CallOptionsExt): Promise<HelloReply>;
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
