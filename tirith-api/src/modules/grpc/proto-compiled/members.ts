/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";
import Long = require("long");

export const protobufPackage = "members";

/** Response containing a member's properties. */
export interface MemberReply {
  bubbles: number;
  drops: number;
  sprites: string;
  scenes: string;
  flags: number;
  rainbowSprites: string;
  discordId: number;
  username: string;
  login: number;
  serverConnections: number[];
}

/** Reply containing the accesstoken of a member */
export interface AccessTokenReply {
  accessToken: string;
}

/** Response containing a member as raw json with all possible information for inspection, in no  particular structure */
export interface RawMemberReply {
  memberJson: string;
}

/** Response containing a brief member data as well as inspection data */
export interface MemberSearchReply {
  username: string;
  login: number;
  raw: RawMemberReply | undefined;
}

/** Request used to target a distinct member by id */
export interface IdentifyMemberByLoginRequest {
  login: number;
}

/** Request used to target a distinct member by id */
export interface IdentifyMemberByDiscordIdRequest {
  id: number;
}

/** Request to fetch members matching a plain text query */
export interface SearchMemberRequest {
  query: string;
}

/** Request to modify a server conenction of a member */
export interface ModifyServerConnectionRequest {
  login: number;
  serverToken: number;
}

/** Request to update the linked discord id of a member */
export interface UpdateDiscordIdRequest {
  login: number;
  discordId: number;
}

function createBaseMemberReply(): MemberReply {
  return {
    bubbles: 0,
    drops: 0,
    sprites: "",
    scenes: "",
    flags: 0,
    rainbowSprites: "",
    discordId: 0,
    username: "",
    login: 0,
    serverConnections: [],
  };
}

export const MemberReply = {
  encode(message: MemberReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bubbles !== 0) {
      writer.uint32(8).int32(message.bubbles);
    }
    if (message.drops !== 0) {
      writer.uint32(16).int32(message.drops);
    }
    if (message.sprites !== "") {
      writer.uint32(26).string(message.sprites);
    }
    if (message.scenes !== "") {
      writer.uint32(34).string(message.scenes);
    }
    if (message.flags !== 0) {
      writer.uint32(40).int32(message.flags);
    }
    if (message.rainbowSprites !== "") {
      writer.uint32(50).string(message.rainbowSprites);
    }
    if (message.discordId !== 0) {
      writer.uint32(56).int64(message.discordId);
    }
    if (message.username !== "") {
      writer.uint32(66).string(message.username);
    }
    if (message.login !== 0) {
      writer.uint32(72).int32(message.login);
    }
    writer.uint32(82).fork();
    for (const v of message.serverConnections) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MemberReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMemberReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.bubbles = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.drops = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.sprites = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.scenes = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.flags = reader.int32();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.rainbowSprites = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.discordId = longToNumber(reader.int64() as Long);
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.username = reader.string();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.login = reader.int32();
          continue;
        case 10:
          if (tag === 80) {
            message.serverConnections.push(reader.int32());

            continue;
          }

          if (tag === 82) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.serverConnections.push(reader.int32());
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MemberReply {
    return {
      bubbles: isSet(object.bubbles) ? globalThis.Number(object.bubbles) : 0,
      drops: isSet(object.drops) ? globalThis.Number(object.drops) : 0,
      sprites: isSet(object.sprites) ? globalThis.String(object.sprites) : "",
      scenes: isSet(object.scenes) ? globalThis.String(object.scenes) : "",
      flags: isSet(object.flags) ? globalThis.Number(object.flags) : 0,
      rainbowSprites: isSet(object.rainbowSprites) ? globalThis.String(object.rainbowSprites) : "",
      discordId: isSet(object.discordId) ? globalThis.Number(object.discordId) : 0,
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      serverConnections: globalThis.Array.isArray(object?.serverConnections)
        ? object.serverConnections.map((e: any) => globalThis.Number(e))
        : [],
    };
  },

  toJSON(message: MemberReply): unknown {
    const obj: any = {};
    if (message.bubbles !== 0) {
      obj.bubbles = Math.round(message.bubbles);
    }
    if (message.drops !== 0) {
      obj.drops = Math.round(message.drops);
    }
    if (message.sprites !== "") {
      obj.sprites = message.sprites;
    }
    if (message.scenes !== "") {
      obj.scenes = message.scenes;
    }
    if (message.flags !== 0) {
      obj.flags = Math.round(message.flags);
    }
    if (message.rainbowSprites !== "") {
      obj.rainbowSprites = message.rainbowSprites;
    }
    if (message.discordId !== 0) {
      obj.discordId = Math.round(message.discordId);
    }
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.serverConnections?.length) {
      obj.serverConnections = message.serverConnections.map((e) => Math.round(e));
    }
    return obj;
  },
};

function createBaseAccessTokenReply(): AccessTokenReply {
  return { accessToken: "" };
}

export const AccessTokenReply = {
  encode(message: AccessTokenReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccessTokenReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccessTokenReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccessTokenReply {
    return { accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "" };
  },

  toJSON(message: AccessTokenReply): unknown {
    const obj: any = {};
    if (message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    return obj;
  },
};

function createBaseRawMemberReply(): RawMemberReply {
  return { memberJson: "" };
}

export const RawMemberReply = {
  encode(message: RawMemberReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.memberJson !== "") {
      writer.uint32(10).string(message.memberJson);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RawMemberReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRawMemberReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.memberJson = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RawMemberReply {
    return { memberJson: isSet(object.memberJson) ? globalThis.String(object.memberJson) : "" };
  },

  toJSON(message: RawMemberReply): unknown {
    const obj: any = {};
    if (message.memberJson !== "") {
      obj.memberJson = message.memberJson;
    }
    return obj;
  },
};

function createBaseMemberSearchReply(): MemberSearchReply {
  return { username: "", login: 0, raw: undefined };
}

export const MemberSearchReply = {
  encode(message: MemberSearchReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.username !== "") {
      writer.uint32(10).string(message.username);
    }
    if (message.login !== 0) {
      writer.uint32(16).int32(message.login);
    }
    if (message.raw !== undefined) {
      RawMemberReply.encode(message.raw, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MemberSearchReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMemberSearchReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.username = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.login = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.raw = RawMemberReply.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MemberSearchReply {
    return {
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      raw: isSet(object.raw) ? RawMemberReply.fromJSON(object.raw) : undefined,
    };
  },

  toJSON(message: MemberSearchReply): unknown {
    const obj: any = {};
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.raw !== undefined) {
      obj.raw = RawMemberReply.toJSON(message.raw);
    }
    return obj;
  },
};

function createBaseIdentifyMemberByLoginRequest(): IdentifyMemberByLoginRequest {
  return { login: 0 };
}

export const IdentifyMemberByLoginRequest = {
  encode(message: IdentifyMemberByLoginRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IdentifyMemberByLoginRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIdentifyMemberByLoginRequest();
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

  fromJSON(object: any): IdentifyMemberByLoginRequest {
    return { login: isSet(object.login) ? globalThis.Number(object.login) : 0 };
  },

  toJSON(message: IdentifyMemberByLoginRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    return obj;
  },
};

function createBaseIdentifyMemberByDiscordIdRequest(): IdentifyMemberByDiscordIdRequest {
  return { id: 0 };
}

export const IdentifyMemberByDiscordIdRequest = {
  encode(message: IdentifyMemberByDiscordIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IdentifyMemberByDiscordIdRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIdentifyMemberByDiscordIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IdentifyMemberByDiscordIdRequest {
    return { id: isSet(object.id) ? globalThis.Number(object.id) : 0 };
  },

  toJSON(message: IdentifyMemberByDiscordIdRequest): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },
};

function createBaseSearchMemberRequest(): SearchMemberRequest {
  return { query: "" };
}

export const SearchMemberRequest = {
  encode(message: SearchMemberRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.query !== "") {
      writer.uint32(10).string(message.query);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SearchMemberRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSearchMemberRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.query = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SearchMemberRequest {
    return { query: isSet(object.query) ? globalThis.String(object.query) : "" };
  },

  toJSON(message: SearchMemberRequest): unknown {
    const obj: any = {};
    if (message.query !== "") {
      obj.query = message.query;
    }
    return obj;
  },
};

function createBaseModifyServerConnectionRequest(): ModifyServerConnectionRequest {
  return { login: 0, serverToken: 0 };
}

export const ModifyServerConnectionRequest = {
  encode(message: ModifyServerConnectionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (message.serverToken !== 0) {
      writer.uint32(16).int32(message.serverToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModifyServerConnectionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModifyServerConnectionRequest();
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

          message.serverToken = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModifyServerConnectionRequest {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      serverToken: isSet(object.serverToken) ? globalThis.Number(object.serverToken) : 0,
    };
  },

  toJSON(message: ModifyServerConnectionRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.serverToken !== 0) {
      obj.serverToken = Math.round(message.serverToken);
    }
    return obj;
  },
};

function createBaseUpdateDiscordIdRequest(): UpdateDiscordIdRequest {
  return { login: 0, discordId: 0 };
}

export const UpdateDiscordIdRequest = {
  encode(message: UpdateDiscordIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (message.discordId !== 0) {
      writer.uint32(16).int64(message.discordId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateDiscordIdRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateDiscordIdRequest();
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

          message.discordId = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateDiscordIdRequest {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      discordId: isSet(object.discordId) ? globalThis.Number(object.discordId) : 0,
    };
  },

  toJSON(message: UpdateDiscordIdRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.discordId !== 0) {
      obj.discordId = Math.round(message.discordId);
    }
    return obj;
  },
};

/** Service definition for member resource access */
export type MembersDefinition = typeof MembersDefinition;
export const MembersDefinition = {
  name: "Members",
  fullName: "members.Members",
  methods: {
    /** Gets a member by its login */
    getMemberByLogin: {
      name: "GetMemberByLogin",
      requestType: IdentifyMemberByLoginRequest,
      requestStream: false,
      responseType: MemberReply,
      responseStream: false,
      options: {},
    },
    /** Gets a member by its connected discord account id */
    getMemberByDiscordId: {
      name: "GetMemberByDiscordId",
      requestType: IdentifyMemberByDiscordIdRequest,
      requestStream: false,
      responseType: MemberReply,
      responseStream: false,
      options: {},
    },
    /** Finds members matching a query */
    searchMember: {
      name: "SearchMember",
      requestType: SearchMemberRequest,
      requestStream: false,
      responseType: MemberSearchReply,
      responseStream: true,
      options: {},
    },
    /** Gets the raw member json string of a member */
    getRawMemberByLogin: {
      name: "GetRawMemberByLogin",
      requestType: IdentifyMemberByLoginRequest,
      requestStream: false,
      responseType: RawMemberReply,
      responseStream: false,
      options: {},
    },
    /** Gets the accesstoken of a member */
    getAccessTokenByLogin: {
      name: "GetAccessTokenByLogin",
      requestType: IdentifyMemberByLoginRequest,
      requestStream: false,
      responseType: AccessTokenReply,
      responseStream: false,
      options: {},
    },
    /** Updates the linked discord id of a member */
    updateMemberDiscordId: {
      name: "UpdateMemberDiscordId",
      requestType: UpdateDiscordIdRequest,
      requestStream: false,
      responseType: MemberReply,
      responseStream: false,
      options: {},
    },
    /** Clears the last or current dropboost of a member */
    clearMemberDropboost: {
      name: "ClearMemberDropboost",
      requestType: IdentifyMemberByLoginRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** Adds a server to the member's connections */
    addMemberServerConnection: {
      name: "AddMemberServerConnection",
      requestType: ModifyServerConnectionRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** Removes a server from the member's connections */
    removeMemberServerConnection: {
      name: "RemoveMemberServerConnection",
      requestType: ModifyServerConnectionRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface MembersServiceImplementation<CallContextExt = {}> {
  /** Gets a member by its login */
  getMemberByLogin(request: IdentifyMemberByLoginRequest, context: CallContext & CallContextExt): Promise<MemberReply>;
  /** Gets a member by its connected discord account id */
  getMemberByDiscordId(
    request: IdentifyMemberByDiscordIdRequest,
    context: CallContext & CallContextExt,
  ): Promise<MemberReply>;
  /** Finds members matching a query */
  searchMember(
    request: SearchMemberRequest,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<MemberSearchReply>;
  /** Gets the raw member json string of a member */
  getRawMemberByLogin(
    request: IdentifyMemberByLoginRequest,
    context: CallContext & CallContextExt,
  ): Promise<RawMemberReply>;
  /** Gets the accesstoken of a member */
  getAccessTokenByLogin(
    request: IdentifyMemberByLoginRequest,
    context: CallContext & CallContextExt,
  ): Promise<AccessTokenReply>;
  /** Updates the linked discord id of a member */
  updateMemberDiscordId(request: UpdateDiscordIdRequest, context: CallContext & CallContextExt): Promise<MemberReply>;
  /** Clears the last or current dropboost of a member */
  clearMemberDropboost(request: IdentifyMemberByLoginRequest, context: CallContext & CallContextExt): Promise<Empty>;
  /** Adds a server to the member's connections */
  addMemberServerConnection(
    request: ModifyServerConnectionRequest,
    context: CallContext & CallContextExt,
  ): Promise<Empty>;
  /** Removes a server from the member's connections */
  removeMemberServerConnection(
    request: ModifyServerConnectionRequest,
    context: CallContext & CallContextExt,
  ): Promise<Empty>;
}

export interface MembersClient<CallOptionsExt = {}> {
  /** Gets a member by its login */
  getMemberByLogin(request: IdentifyMemberByLoginRequest, options?: CallOptions & CallOptionsExt): Promise<MemberReply>;
  /** Gets a member by its connected discord account id */
  getMemberByDiscordId(
    request: IdentifyMemberByDiscordIdRequest,
    options?: CallOptions & CallOptionsExt,
  ): Promise<MemberReply>;
  /** Finds members matching a query */
  searchMember(request: SearchMemberRequest, options?: CallOptions & CallOptionsExt): AsyncIterable<MemberSearchReply>;
  /** Gets the raw member json string of a member */
  getRawMemberByLogin(
    request: IdentifyMemberByLoginRequest,
    options?: CallOptions & CallOptionsExt,
  ): Promise<RawMemberReply>;
  /** Gets the accesstoken of a member */
  getAccessTokenByLogin(
    request: IdentifyMemberByLoginRequest,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AccessTokenReply>;
  /** Updates the linked discord id of a member */
  updateMemberDiscordId(request: UpdateDiscordIdRequest, options?: CallOptions & CallOptionsExt): Promise<MemberReply>;
  /** Clears the last or current dropboost of a member */
  clearMemberDropboost(request: IdentifyMemberByLoginRequest, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  /** Adds a server to the member's connections */
  addMemberServerConnection(
    request: ModifyServerConnectionRequest,
    options?: CallOptions & CallOptionsExt,
  ): Promise<Empty>;
  /** Removes a server from the member's connections */
  removeMemberServerConnection(
    request: ModifyServerConnectionRequest,
    options?: CallOptions & CallOptionsExt,
  ): Promise<Empty>;
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

export type ServerStreamingMethodResult<Response> = { [Symbol.asyncIterator](): AsyncIterator<Response, void> };
