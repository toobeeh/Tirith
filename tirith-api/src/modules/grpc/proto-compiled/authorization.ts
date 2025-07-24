/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import Long = require("long");
import * as _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "authorization";

export interface GetAvailableScopesMessage {
}

export interface ScopeMessage {
  name: string;
  description: string;
}

export interface CreateOAuth2ClientMessage {
  name: string;
  scopes: string[];
  redirectUri: string;
  ownerTypoId: number;
  audience: string;
}

export interface OAuth2ClientMessage {
  clientId: number;
  name: string;
  scopes: string[];
  redirectUri: string;
  verified: boolean;
  tokenExpiry: Long;
  ownerTypoId: number;
  audience: string;
}

export interface CreateOAuth2AuthorizationCodeMessage {
  oauth2ClientId: number;
  typoId: number;
}

export interface OAuth2AuthorizationCodeExchangeMessage {
  oauth2AuthorizationCode: string;
  oauth2ClientId: number;
  jwtIssuer: string;
}

export interface CreateOAuth2TokenMessage {
  typoId: number;
  oauth2ClientId: number;
  jwtIssuer: string;
  requestedAudience: string;
}

export interface OAuth2AuthorizationCodeMessage {
  oauth2AuthorizationCode: string;
  oauth2Client: OAuth2ClientMessage | undefined;
}

export interface OAuth2AccessTokenMessage {
  jwt: string;
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

function createBaseCreateOAuth2ClientMessage(): CreateOAuth2ClientMessage {
  return { name: "", scopes: [], redirectUri: "", ownerTypoId: 0, audience: "" };
}

export const CreateOAuth2ClientMessage = {
  encode(message: CreateOAuth2ClientMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.scopes) {
      writer.uint32(18).string(v!);
    }
    if (message.redirectUri !== "") {
      writer.uint32(26).string(message.redirectUri);
    }
    if (message.ownerTypoId !== 0) {
      writer.uint32(32).int32(message.ownerTypoId);
    }
    if (message.audience !== "") {
      writer.uint32(42).string(message.audience);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateOAuth2ClientMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateOAuth2ClientMessage();
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

          message.scopes.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.redirectUri = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.ownerTypoId = reader.int32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.audience = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateOAuth2ClientMessage {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      scopes: globalThis.Array.isArray(object?.scopes) ? object.scopes.map((e: any) => globalThis.String(e)) : [],
      redirectUri: isSet(object.redirectUri) ? globalThis.String(object.redirectUri) : "",
      ownerTypoId: isSet(object.ownerTypoId) ? globalThis.Number(object.ownerTypoId) : 0,
      audience: isSet(object.audience) ? globalThis.String(object.audience) : "",
    };
  },

  toJSON(message: CreateOAuth2ClientMessage): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.scopes?.length) {
      obj.scopes = message.scopes;
    }
    if (message.redirectUri !== "") {
      obj.redirectUri = message.redirectUri;
    }
    if (message.ownerTypoId !== 0) {
      obj.ownerTypoId = Math.round(message.ownerTypoId);
    }
    if (message.audience !== "") {
      obj.audience = message.audience;
    }
    return obj;
  },
};

function createBaseOAuth2ClientMessage(): OAuth2ClientMessage {
  return {
    clientId: 0,
    name: "",
    scopes: [],
    redirectUri: "",
    verified: false,
    tokenExpiry: Long.ZERO,
    ownerTypoId: 0,
    audience: "",
  };
}

export const OAuth2ClientMessage = {
  encode(message: OAuth2ClientMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clientId !== 0) {
      writer.uint32(8).int32(message.clientId);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    for (const v of message.scopes) {
      writer.uint32(26).string(v!);
    }
    if (message.redirectUri !== "") {
      writer.uint32(34).string(message.redirectUri);
    }
    if (message.verified === true) {
      writer.uint32(40).bool(message.verified);
    }
    if (!message.tokenExpiry.isZero()) {
      writer.uint32(48).int64(message.tokenExpiry);
    }
    if (message.ownerTypoId !== 0) {
      writer.uint32(56).int32(message.ownerTypoId);
    }
    if (message.audience !== "") {
      writer.uint32(66).string(message.audience);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OAuth2ClientMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOAuth2ClientMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.clientId = reader.int32();
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

          message.scopes.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.redirectUri = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.verified = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.tokenExpiry = reader.int64() as Long;
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.ownerTypoId = reader.int32();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.audience = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OAuth2ClientMessage {
    return {
      clientId: isSet(object.clientId) ? globalThis.Number(object.clientId) : 0,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      scopes: globalThis.Array.isArray(object?.scopes) ? object.scopes.map((e: any) => globalThis.String(e)) : [],
      redirectUri: isSet(object.redirectUri) ? globalThis.String(object.redirectUri) : "",
      verified: isSet(object.verified) ? globalThis.Boolean(object.verified) : false,
      tokenExpiry: isSet(object.tokenExpiry) ? Long.fromValue(object.tokenExpiry) : Long.ZERO,
      ownerTypoId: isSet(object.ownerTypoId) ? globalThis.Number(object.ownerTypoId) : 0,
      audience: isSet(object.audience) ? globalThis.String(object.audience) : "",
    };
  },

  toJSON(message: OAuth2ClientMessage): unknown {
    const obj: any = {};
    if (message.clientId !== 0) {
      obj.clientId = Math.round(message.clientId);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.scopes?.length) {
      obj.scopes = message.scopes;
    }
    if (message.redirectUri !== "") {
      obj.redirectUri = message.redirectUri;
    }
    if (message.verified === true) {
      obj.verified = message.verified;
    }
    if (!message.tokenExpiry.isZero()) {
      obj.tokenExpiry = (message.tokenExpiry || Long.ZERO).toString();
    }
    if (message.ownerTypoId !== 0) {
      obj.ownerTypoId = Math.round(message.ownerTypoId);
    }
    if (message.audience !== "") {
      obj.audience = message.audience;
    }
    return obj;
  },
};

function createBaseCreateOAuth2AuthorizationCodeMessage(): CreateOAuth2AuthorizationCodeMessage {
  return { oauth2ClientId: 0, typoId: 0 };
}

export const CreateOAuth2AuthorizationCodeMessage = {
  encode(message: CreateOAuth2AuthorizationCodeMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.oauth2ClientId !== 0) {
      writer.uint32(8).int32(message.oauth2ClientId);
    }
    if (message.typoId !== 0) {
      writer.uint32(16).int32(message.typoId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateOAuth2AuthorizationCodeMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateOAuth2AuthorizationCodeMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.oauth2ClientId = reader.int32();
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

  fromJSON(object: any): CreateOAuth2AuthorizationCodeMessage {
    return {
      oauth2ClientId: isSet(object.oauth2ClientId) ? globalThis.Number(object.oauth2ClientId) : 0,
      typoId: isSet(object.typoId) ? globalThis.Number(object.typoId) : 0,
    };
  },

  toJSON(message: CreateOAuth2AuthorizationCodeMessage): unknown {
    const obj: any = {};
    if (message.oauth2ClientId !== 0) {
      obj.oauth2ClientId = Math.round(message.oauth2ClientId);
    }
    if (message.typoId !== 0) {
      obj.typoId = Math.round(message.typoId);
    }
    return obj;
  },
};

function createBaseOAuth2AuthorizationCodeExchangeMessage(): OAuth2AuthorizationCodeExchangeMessage {
  return { oauth2AuthorizationCode: "", oauth2ClientId: 0, jwtIssuer: "" };
}

export const OAuth2AuthorizationCodeExchangeMessage = {
  encode(message: OAuth2AuthorizationCodeExchangeMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.oauth2AuthorizationCode !== "") {
      writer.uint32(10).string(message.oauth2AuthorizationCode);
    }
    if (message.oauth2ClientId !== 0) {
      writer.uint32(16).int32(message.oauth2ClientId);
    }
    if (message.jwtIssuer !== "") {
      writer.uint32(26).string(message.jwtIssuer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OAuth2AuthorizationCodeExchangeMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOAuth2AuthorizationCodeExchangeMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.oauth2AuthorizationCode = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.oauth2ClientId = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.jwtIssuer = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OAuth2AuthorizationCodeExchangeMessage {
    return {
      oauth2AuthorizationCode: isSet(object.oauth2AuthorizationCode)
        ? globalThis.String(object.oauth2AuthorizationCode)
        : "",
      oauth2ClientId: isSet(object.oauth2ClientId) ? globalThis.Number(object.oauth2ClientId) : 0,
      jwtIssuer: isSet(object.jwtIssuer) ? globalThis.String(object.jwtIssuer) : "",
    };
  },

  toJSON(message: OAuth2AuthorizationCodeExchangeMessage): unknown {
    const obj: any = {};
    if (message.oauth2AuthorizationCode !== "") {
      obj.oauth2AuthorizationCode = message.oauth2AuthorizationCode;
    }
    if (message.oauth2ClientId !== 0) {
      obj.oauth2ClientId = Math.round(message.oauth2ClientId);
    }
    if (message.jwtIssuer !== "") {
      obj.jwtIssuer = message.jwtIssuer;
    }
    return obj;
  },
};

function createBaseCreateOAuth2TokenMessage(): CreateOAuth2TokenMessage {
  return { typoId: 0, oauth2ClientId: 0, jwtIssuer: "", requestedAudience: "" };
}

export const CreateOAuth2TokenMessage = {
  encode(message: CreateOAuth2TokenMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.typoId !== 0) {
      writer.uint32(8).int32(message.typoId);
    }
    if (message.oauth2ClientId !== 0) {
      writer.uint32(16).int32(message.oauth2ClientId);
    }
    if (message.jwtIssuer !== "") {
      writer.uint32(26).string(message.jwtIssuer);
    }
    if (message.requestedAudience !== "") {
      writer.uint32(34).string(message.requestedAudience);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateOAuth2TokenMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateOAuth2TokenMessage();
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
          if (tag !== 16) {
            break;
          }

          message.oauth2ClientId = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.jwtIssuer = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.requestedAudience = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateOAuth2TokenMessage {
    return {
      typoId: isSet(object.typoId) ? globalThis.Number(object.typoId) : 0,
      oauth2ClientId: isSet(object.oauth2ClientId) ? globalThis.Number(object.oauth2ClientId) : 0,
      jwtIssuer: isSet(object.jwtIssuer) ? globalThis.String(object.jwtIssuer) : "",
      requestedAudience: isSet(object.requestedAudience) ? globalThis.String(object.requestedAudience) : "",
    };
  },

  toJSON(message: CreateOAuth2TokenMessage): unknown {
    const obj: any = {};
    if (message.typoId !== 0) {
      obj.typoId = Math.round(message.typoId);
    }
    if (message.oauth2ClientId !== 0) {
      obj.oauth2ClientId = Math.round(message.oauth2ClientId);
    }
    if (message.jwtIssuer !== "") {
      obj.jwtIssuer = message.jwtIssuer;
    }
    if (message.requestedAudience !== "") {
      obj.requestedAudience = message.requestedAudience;
    }
    return obj;
  },
};

function createBaseOAuth2AuthorizationCodeMessage(): OAuth2AuthorizationCodeMessage {
  return { oauth2AuthorizationCode: "", oauth2Client: undefined };
}

export const OAuth2AuthorizationCodeMessage = {
  encode(message: OAuth2AuthorizationCodeMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.oauth2AuthorizationCode !== "") {
      writer.uint32(10).string(message.oauth2AuthorizationCode);
    }
    if (message.oauth2Client !== undefined) {
      OAuth2ClientMessage.encode(message.oauth2Client, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OAuth2AuthorizationCodeMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOAuth2AuthorizationCodeMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.oauth2AuthorizationCode = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.oauth2Client = OAuth2ClientMessage.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OAuth2AuthorizationCodeMessage {
    return {
      oauth2AuthorizationCode: isSet(object.oauth2AuthorizationCode)
        ? globalThis.String(object.oauth2AuthorizationCode)
        : "",
      oauth2Client: isSet(object.oauth2Client) ? OAuth2ClientMessage.fromJSON(object.oauth2Client) : undefined,
    };
  },

  toJSON(message: OAuth2AuthorizationCodeMessage): unknown {
    const obj: any = {};
    if (message.oauth2AuthorizationCode !== "") {
      obj.oauth2AuthorizationCode = message.oauth2AuthorizationCode;
    }
    if (message.oauth2Client !== undefined) {
      obj.oauth2Client = OAuth2ClientMessage.toJSON(message.oauth2Client);
    }
    return obj;
  },
};

function createBaseOAuth2AccessTokenMessage(): OAuth2AccessTokenMessage {
  return { jwt: "" };
}

export const OAuth2AccessTokenMessage = {
  encode(message: OAuth2AccessTokenMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.jwt !== "") {
      writer.uint32(10).string(message.jwt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OAuth2AccessTokenMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOAuth2AccessTokenMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.jwt = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OAuth2AccessTokenMessage {
    return { jwt: isSet(object.jwt) ? globalThis.String(object.jwt) : "" };
  },

  toJSON(message: OAuth2AccessTokenMessage): unknown {
    const obj: any = {};
    if (message.jwt !== "") {
      obj.jwt = message.jwt;
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
    /** Creates a new OAuth2 authorization code for a given client and typo member */
    createOAuth2AuthorizationCode: {
      name: "CreateOAuth2AuthorizationCode",
      requestType: CreateOAuth2AuthorizationCodeMessage,
      requestStream: false,
      responseType: OAuth2AuthorizationCodeMessage,
      responseStream: false,
      options: {},
    },
    /** Exchange a oauth2 authorization code for an access token (jwt) */
    exchangeOauth2AuthorizationCode: {
      name: "ExchangeOauth2AuthorizationCode",
      requestType: OAuth2AuthorizationCodeExchangeMessage,
      requestStream: false,
      responseType: OAuth2AccessTokenMessage,
      responseStream: false,
      options: {},
    },
    /** Create a oauth2 access token. should be used only in authorized preconditions like auth code or token exchange grants */
    createOauth2Token: {
      name: "CreateOauth2Token",
      requestType: CreateOAuth2TokenMessage,
      requestStream: false,
      responseType: OAuth2AccessTokenMessage,
      responseStream: false,
      options: {},
    },
    /** Creates a new OAuth2 client */
    createOauth2Client: {
      name: "CreateOauth2Client",
      requestType: CreateOAuth2ClientMessage,
      requestStream: false,
      responseType: OAuth2ClientMessage,
      responseStream: false,
      options: {},
    },
    /** Gets all OAuth2 clients */
    getOauth2Clients: {
      name: "GetOauth2Clients",
      requestType: Empty,
      requestStream: false,
      responseType: OAuth2ClientMessage,
      responseStream: true,
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
  /** Creates a new OAuth2 authorization code for a given client and typo member */
  createOAuth2AuthorizationCode(
    request: CreateOAuth2AuthorizationCodeMessage,
    context: CallContext & CallContextExt,
  ): Promise<OAuth2AuthorizationCodeMessage>;
  /** Exchange a oauth2 authorization code for an access token (jwt) */
  exchangeOauth2AuthorizationCode(
    request: OAuth2AuthorizationCodeExchangeMessage,
    context: CallContext & CallContextExt,
  ): Promise<OAuth2AccessTokenMessage>;
  /** Create a oauth2 access token. should be used only in authorized preconditions like auth code or token exchange grants */
  createOauth2Token(
    request: CreateOAuth2TokenMessage,
    context: CallContext & CallContextExt,
  ): Promise<OAuth2AccessTokenMessage>;
  /** Creates a new OAuth2 client */
  createOauth2Client(
    request: CreateOAuth2ClientMessage,
    context: CallContext & CallContextExt,
  ): Promise<OAuth2ClientMessage>;
  /** Gets all OAuth2 clients */
  getOauth2Clients(
    request: Empty,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<OAuth2ClientMessage>;
}

export interface AuthorizationClient<CallOptionsExt = {}> {
  /** Gets all available scopes */
  getAvailableScopes(
    request: GetAvailableScopesMessage,
    options?: CallOptions & CallOptionsExt,
  ): AsyncIterable<ScopeMessage>;
  /** Creates a new OAuth2 authorization code for a given client and typo member */
  createOAuth2AuthorizationCode(
    request: CreateOAuth2AuthorizationCodeMessage,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OAuth2AuthorizationCodeMessage>;
  /** Exchange a oauth2 authorization code for an access token (jwt) */
  exchangeOauth2AuthorizationCode(
    request: OAuth2AuthorizationCodeExchangeMessage,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OAuth2AccessTokenMessage>;
  /** Create a oauth2 access token. should be used only in authorized preconditions like auth code or token exchange grants */
  createOauth2Token(
    request: CreateOAuth2TokenMessage,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OAuth2AccessTokenMessage>;
  /** Creates a new OAuth2 client */
  createOauth2Client(
    request: CreateOAuth2ClientMessage,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OAuth2ClientMessage>;
  /** Gets all OAuth2 clients */
  getOauth2Clients(request: Empty, options?: CallOptions & CallOptionsExt): AsyncIterable<OAuth2ClientMessage>;
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export type ServerStreamingMethodResult<Response> = { [Symbol.asyncIterator](): AsyncIterator<Response, void> };
