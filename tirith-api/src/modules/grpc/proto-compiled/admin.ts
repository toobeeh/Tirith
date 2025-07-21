/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import { Empty } from "./google/protobuf/empty";
import Long = require("long");
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "admin";

export enum OnlineItemType {
  Sprite = 0,
  ColorShift = 1,
  Scene = 2,
  Award = 3,
  Rewardee = 5,
  SceneTheme = 6,
  UNRECOGNIZED = -1,
}

export function onlineItemTypeFromJSON(object: any): OnlineItemType {
  switch (object) {
    case 0:
    case "Sprite":
      return OnlineItemType.Sprite;
    case 1:
    case "ColorShift":
      return OnlineItemType.ColorShift;
    case 2:
    case "Scene":
      return OnlineItemType.Scene;
    case 3:
    case "Award":
      return OnlineItemType.Award;
    case 5:
    case "Rewardee":
      return OnlineItemType.Rewardee;
    case 6:
    case "SceneTheme":
      return OnlineItemType.SceneTheme;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OnlineItemType.UNRECOGNIZED;
  }
}

export function onlineItemTypeToJSON(object: OnlineItemType): string {
  switch (object) {
    case OnlineItemType.Sprite:
      return "Sprite";
    case OnlineItemType.ColorShift:
      return "ColorShift";
    case OnlineItemType.Scene:
      return "Scene";
    case OnlineItemType.Award:
      return "Award";
    case OnlineItemType.Rewardee:
      return "Rewardee";
    case OnlineItemType.SceneTheme:
      return "SceneTheme";
    case OnlineItemType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Request to update the flags of members */
export interface UpdateMemberFlagsRequest {
  memberIds: Long[];
  invertOthers: boolean;
  state: boolean;
  flagId: number;
}

export interface SetOnlineItemsRequest {
  items: OnlineItemMessage[];
}

export interface TemporaryPatronMessage {
  login: number;
}

export interface OnlineItemMessage {
  itemType: OnlineItemType;
  slot: number;
  itemId: number;
  lobbyKey: string;
  lobbyPlayerId: number;
}

/** Request to increment the bubble count of a range of members */
export interface IncrementMemberBubblesRequest {
  memberLogins: number[];
}

export interface BubbleTracesCreatedMessage {
  dailyPlayers: number;
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

function createBaseSetOnlineItemsRequest(): SetOnlineItemsRequest {
  return { items: [] };
}

export const SetOnlineItemsRequest = {
  encode(message: SetOnlineItemsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.items) {
      OnlineItemMessage.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetOnlineItemsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetOnlineItemsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.items.push(OnlineItemMessage.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SetOnlineItemsRequest {
    return {
      items: globalThis.Array.isArray(object?.items) ? object.items.map((e: any) => OnlineItemMessage.fromJSON(e)) : [],
    };
  },

  toJSON(message: SetOnlineItemsRequest): unknown {
    const obj: any = {};
    if (message.items?.length) {
      obj.items = message.items.map((e) => OnlineItemMessage.toJSON(e));
    }
    return obj;
  },
};

function createBaseTemporaryPatronMessage(): TemporaryPatronMessage {
  return { login: 0 };
}

export const TemporaryPatronMessage = {
  encode(message: TemporaryPatronMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TemporaryPatronMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTemporaryPatronMessage();
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

  fromJSON(object: any): TemporaryPatronMessage {
    return { login: isSet(object.login) ? globalThis.Number(object.login) : 0 };
  },

  toJSON(message: TemporaryPatronMessage): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    return obj;
  },
};

function createBaseOnlineItemMessage(): OnlineItemMessage {
  return { itemType: 0, slot: 0, itemId: 0, lobbyKey: "", lobbyPlayerId: 0 };
}

export const OnlineItemMessage = {
  encode(message: OnlineItemMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.itemType !== 0) {
      writer.uint32(8).int32(message.itemType);
    }
    if (message.slot !== 0) {
      writer.uint32(16).int32(message.slot);
    }
    if (message.itemId !== 0) {
      writer.uint32(24).int32(message.itemId);
    }
    if (message.lobbyKey !== "") {
      writer.uint32(34).string(message.lobbyKey);
    }
    if (message.lobbyPlayerId !== 0) {
      writer.uint32(40).int32(message.lobbyPlayerId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OnlineItemMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOnlineItemMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.itemType = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.slot = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.itemId = reader.int32();
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

          message.lobbyPlayerId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OnlineItemMessage {
    return {
      itemType: isSet(object.itemType) ? onlineItemTypeFromJSON(object.itemType) : 0,
      slot: isSet(object.slot) ? globalThis.Number(object.slot) : 0,
      itemId: isSet(object.itemId) ? globalThis.Number(object.itemId) : 0,
      lobbyKey: isSet(object.lobbyKey) ? globalThis.String(object.lobbyKey) : "",
      lobbyPlayerId: isSet(object.lobbyPlayerId) ? globalThis.Number(object.lobbyPlayerId) : 0,
    };
  },

  toJSON(message: OnlineItemMessage): unknown {
    const obj: any = {};
    if (message.itemType !== 0) {
      obj.itemType = onlineItemTypeToJSON(message.itemType);
    }
    if (message.slot !== 0) {
      obj.slot = Math.round(message.slot);
    }
    if (message.itemId !== 0) {
      obj.itemId = Math.round(message.itemId);
    }
    if (message.lobbyKey !== "") {
      obj.lobbyKey = message.lobbyKey;
    }
    if (message.lobbyPlayerId !== 0) {
      obj.lobbyPlayerId = Math.round(message.lobbyPlayerId);
    }
    return obj;
  },
};

function createBaseIncrementMemberBubblesRequest(): IncrementMemberBubblesRequest {
  return { memberLogins: [] };
}

export const IncrementMemberBubblesRequest = {
  encode(message: IncrementMemberBubblesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.memberLogins) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IncrementMemberBubblesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIncrementMemberBubblesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.memberLogins.push(reader.int32());

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.memberLogins.push(reader.int32());
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

  fromJSON(object: any): IncrementMemberBubblesRequest {
    return {
      memberLogins: globalThis.Array.isArray(object?.memberLogins)
        ? object.memberLogins.map((e: any) => globalThis.Number(e))
        : [],
    };
  },

  toJSON(message: IncrementMemberBubblesRequest): unknown {
    const obj: any = {};
    if (message.memberLogins?.length) {
      obj.memberLogins = message.memberLogins.map((e) => Math.round(e));
    }
    return obj;
  },
};

function createBaseBubbleTracesCreatedMessage(): BubbleTracesCreatedMessage {
  return { dailyPlayers: 0 };
}

export const BubbleTracesCreatedMessage = {
  encode(message: BubbleTracesCreatedMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dailyPlayers !== 0) {
      writer.uint32(8).int32(message.dailyPlayers);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BubbleTracesCreatedMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBubbleTracesCreatedMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.dailyPlayers = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BubbleTracesCreatedMessage {
    return { dailyPlayers: isSet(object.dailyPlayers) ? globalThis.Number(object.dailyPlayers) : 0 };
  },

  toJSON(message: BubbleTracesCreatedMessage): unknown {
    const obj: any = {};
    if (message.dailyPlayers !== 0) {
      obj.dailyPlayers = Math.round(message.dailyPlayers);
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
    /** Get all temporary patrons */
    getTemporaryPatrons: {
      name: "GetTemporaryPatrons",
      requestType: Empty,
      requestStream: false,
      responseType: TemporaryPatronMessage,
      responseStream: true,
      options: {},
    },
    /** Fetch current member bubble count and save as bubble traces */
    createBubbleTraces: {
      name: "CreateBubbleTraces",
      requestType: Empty,
      requestStream: false,
      responseType: BubbleTracesCreatedMessage,
      responseStream: false,
      options: {},
    },
    /** Clear volatile data from tables, like sprites, lobbies and online status */
    clearVolatileData: {
      name: "ClearVolatileData",
      requestType: Empty,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** Increments the bubble count of a range of members */
    incrementMemberBubbles: {
      name: "IncrementMemberBubbles",
      requestType: IncrementMemberBubblesRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** Writes a set of new onlineitems to the database */
    setOnlineItems: {
      name: "SetOnlineItems",
      requestType: SetOnlineItemsRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** gets all onlineitems from the database */
    getOnlineItems: {
      name: "GetOnlineItems",
      requestType: Empty,
      requestStream: false,
      responseType: OnlineItemMessage,
      responseStream: true,
      options: {},
    },
  },
} as const;

export interface AdminServiceImplementation<CallContextExt = {}> {
  /** Reevaluates the last chunk of the drop cache */
  reevaluateDropChunks(request: Empty, context: CallContext & CallContextExt): Promise<Empty>;
  /** Update the flags of members */
  updateMemberFlags(request: UpdateMemberFlagsRequest, context: CallContext & CallContextExt): Promise<Empty>;
  /** Get all temporary patrons */
  getTemporaryPatrons(
    request: Empty,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<TemporaryPatronMessage>;
  /** Fetch current member bubble count and save as bubble traces */
  createBubbleTraces(request: Empty, context: CallContext & CallContextExt): Promise<BubbleTracesCreatedMessage>;
  /** Clear volatile data from tables, like sprites, lobbies and online status */
  clearVolatileData(request: Empty, context: CallContext & CallContextExt): Promise<Empty>;
  /** Increments the bubble count of a range of members */
  incrementMemberBubbles(request: IncrementMemberBubblesRequest, context: CallContext & CallContextExt): Promise<Empty>;
  /** Writes a set of new onlineitems to the database */
  setOnlineItems(request: SetOnlineItemsRequest, context: CallContext & CallContextExt): Promise<Empty>;
  /** gets all onlineitems from the database */
  getOnlineItems(request: Empty, context: CallContext & CallContextExt): ServerStreamingMethodResult<OnlineItemMessage>;
}

export interface AdminClient<CallOptionsExt = {}> {
  /** Reevaluates the last chunk of the drop cache */
  reevaluateDropChunks(request: Empty, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  /** Update the flags of members */
  updateMemberFlags(request: UpdateMemberFlagsRequest, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  /** Get all temporary patrons */
  getTemporaryPatrons(request: Empty, options?: CallOptions & CallOptionsExt): AsyncIterable<TemporaryPatronMessage>;
  /** Fetch current member bubble count and save as bubble traces */
  createBubbleTraces(request: Empty, options?: CallOptions & CallOptionsExt): Promise<BubbleTracesCreatedMessage>;
  /** Clear volatile data from tables, like sprites, lobbies and online status */
  clearVolatileData(request: Empty, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  /** Increments the bubble count of a range of members */
  incrementMemberBubbles(
    request: IncrementMemberBubblesRequest,
    options?: CallOptions & CallOptionsExt,
  ): Promise<Empty>;
  /** Writes a set of new onlineitems to the database */
  setOnlineItems(request: SetOnlineItemsRequest, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  /** gets all onlineitems from the database */
  getOnlineItems(request: Empty, options?: CallOptions & CallOptionsExt): AsyncIterable<OnlineItemMessage>;
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export type ServerStreamingMethodResult<Response> = { [Symbol.asyncIterator](): AsyncIterator<Response, void> };
