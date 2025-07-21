/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";
import Long = require("long");

export const protobufPackage = "authorization";

export interface GetAvailableScopesMessage {
}

export interface ScopeMessage {
  name: string;
  description: string;
}

export interface JwtParametersMessage {
  typoId: number;
  scopes: string[];
  expiry: Date | undefined;
  applicationName: string;
  redirectUri: string;
}

export interface JwtMessage {
  jwt: string;
  typoId: number;
}

function createBaseGetAvailableScopesMessage(): GetAvailableScopesMessage {
  return {};
}

export const GetAvailableScopesMessage = {
  encode(_: GetAvailableScopesMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAvailableScopesMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAvailableScopesMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): GetAvailableScopesMessage {
    return {};
  },

  toJSON(_: GetAvailableScopesMessage): unknown {
    const obj: any = {};
    return obj;
  },
};

function createBaseScopeMessage(): ScopeMessage {
  return { name: "", description: "" };
}

export const ScopeMessage = {
  encode(message: ScopeMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScopeMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScopeMessage();
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

          message.description = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ScopeMessage {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
    };
  },

  toJSON(message: ScopeMessage): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    return obj;
  },
};

function createBaseJwtParametersMessage(): JwtParametersMessage {
  return { typoId: 0, scopes: [], expiry: undefined, applicationName: "", redirectUri: "" };
}

export const JwtParametersMessage = {
  encode(message: JwtParametersMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.typoId !== 0) {
      writer.uint32(8).int32(message.typoId);
    }
    for (const v of message.scopes) {
      writer.uint32(18).string(v!);
    }
    if (message.expiry !== undefined) {
      Timestamp.encode(toTimestamp(message.expiry), writer.uint32(26).fork()).ldelim();
    }
    if (message.applicationName !== "") {
      writer.uint32(34).string(message.applicationName);
    }
    if (message.redirectUri !== "") {
      writer.uint32(42).string(message.redirectUri);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JwtParametersMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJwtParametersMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.typoId = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.scopes.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.expiry = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.applicationName = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.redirectUri = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JwtParametersMessage {
    return {
      typoId: isSet(object.typoId) ? globalThis.Number(object.typoId) : 0,
      scopes: globalThis.Array.isArray(object?.scopes) ? object.scopes.map((e: any) => globalThis.String(e)) : [],
      expiry: isSet(object.expiry) ? fromJsonTimestamp(object.expiry) : undefined,
      applicationName: isSet(object.applicationName) ? globalThis.String(object.applicationName) : "",
      redirectUri: isSet(object.redirectUri) ? globalThis.String(object.redirectUri) : "",
    };
  },

  toJSON(message: JwtParametersMessage): unknown {
    const obj: any = {};
    if (message.typoId !== 0) {
      obj.typoId = Math.round(message.typoId);
    }
    if (message.scopes?.length) {
      obj.scopes = message.scopes;
    }
    if (message.expiry !== undefined) {
      obj.expiry = message.expiry.toISOString();
    }
    if (message.applicationName !== "") {
      obj.applicationName = message.applicationName;
    }
    if (message.redirectUri !== "") {
      obj.redirectUri = message.redirectUri;
    }
    return obj;
  },
};

function createBaseJwtMessage(): JwtMessage {
  return { jwt: "", typoId: 0 };
}

export const JwtMessage = {
  encode(message: JwtMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.jwt !== "") {
      writer.uint32(10).string(message.jwt);
    }
    if (message.typoId !== 0) {
      writer.uint32(16).int32(message.typoId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JwtMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJwtMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.jwt = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.typoId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JwtMessage {
    return {
      jwt: isSet(object.jwt) ? globalThis.String(object.jwt) : "",
      typoId: isSet(object.typoId) ? globalThis.Number(object.typoId) : 0,
    };
  },

  toJSON(message: JwtMessage): unknown {
    const obj: any = {};
    if (message.jwt !== "") {
      obj.jwt = message.jwt;
    }
    if (message.typoId !== 0) {
      obj.typoId = Math.round(message.typoId);
    }
    return obj;
  },
};

/** Service definition for authorization */
export type AuthorizationDefinition = typeof AuthorizationDefinition;
export const AuthorizationDefinition = {
  name: "Authorization",
  fullName: "authorization.Authorization",
  methods: {
    /** Gets all available scopes */
    getAvailableScopes: {
      name: "GetAvailableScopes",
      requestType: GetAvailableScopesMessage,
      requestStream: false,
      responseType: ScopeMessage,
      responseStream: true,
      options: {},
    },
    /** Create a jwt with given parameters */
    createJwt: {
      name: "CreateJwt",
      requestType: JwtParametersMessage,
      requestStream: false,
      responseType: JwtMessage,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface AuthorizationServiceImplementation<CallContextExt = {}> {
  /** Gets all available scopes */
  getAvailableScopes(
    request: GetAvailableScopesMessage,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<ScopeMessage>;
  /** Create a jwt with given parameters */
  createJwt(request: JwtParametersMessage, context: CallContext & CallContextExt): Promise<JwtMessage>;
}

export interface AuthorizationClient<CallOptionsExt = {}> {
  /** Gets all available scopes */
  getAvailableScopes(
    request: GetAvailableScopesMessage,
    options?: CallOptions & CallOptionsExt,
  ): AsyncIterable<ScopeMessage>;
  /** Create a jwt with given parameters */
  createJwt(request: JwtParametersMessage, options?: CallOptions & CallOptionsExt): Promise<JwtMessage>;
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
