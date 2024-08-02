/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import Long = require("long");
import * as _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";
import { Int64Value } from "./google/protobuf/wrappers";

export const protobufPackage = "stats";

export enum LeaderboardMode {
  BUBBLES = 0,
  DROPS = 1,
  AWARDS = 2,
  UNRECOGNIZED = -1,
}

export function leaderboardModeFromJSON(object: any): LeaderboardMode {
  switch (object) {
    case 0:
    case "BUBBLES":
      return LeaderboardMode.BUBBLES;
    case 1:
    case "DROPS":
      return LeaderboardMode.DROPS;
    case 2:
    case "AWARDS":
      return LeaderboardMode.AWARDS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LeaderboardMode.UNRECOGNIZED;
  }
}

export function leaderboardModeToJSON(object: LeaderboardMode): string {
  switch (object) {
    case LeaderboardMode.BUBBLES:
      return "BUBBLES";
    case LeaderboardMode.DROPS:
      return "DROPS";
    case LeaderboardMode.AWARDS:
      return "AWARDS";
    case LeaderboardMode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum BubbleProgressIntervalMode {
  DAY = 0,
  WEEK = 1,
  MONTH = 2,
  UNRECOGNIZED = -1,
}

export function bubbleProgressIntervalModeFromJSON(object: any): BubbleProgressIntervalMode {
  switch (object) {
    case 0:
    case "DAY":
      return BubbleProgressIntervalMode.DAY;
    case 1:
    case "WEEK":
      return BubbleProgressIntervalMode.WEEK;
    case 2:
    case "MONTH":
      return BubbleProgressIntervalMode.MONTH;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BubbleProgressIntervalMode.UNRECOGNIZED;
  }
}

export function bubbleProgressIntervalModeToJSON(object: BubbleProgressIntervalMode): string {
  switch (object) {
    case BubbleProgressIntervalMode.DAY:
      return "DAY";
    case BubbleProgressIntervalMode.WEEK:
      return "WEEK";
    case BubbleProgressIntervalMode.MONTH:
      return "MONTH";
    case BubbleProgressIntervalMode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface GetBubbleProgressMessage {
  login: number;
  startDate: Date | undefined;
  endDate: Date | undefined;
  interval: BubbleProgressIntervalMode;
}

export interface BubbleProgressMessage {
  entries: BubbleProgressEntryMessage[];
}

export interface BubbleProgressEntryMessage {
  date: Date | undefined;
  bubbles: number;
}

export interface BubbleTimespanRangeRequest {
  login: number;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

export interface BubbleTimespanRangeReply {
  startAmount: number;
  endAmount: number;
}

export interface GetLeaderboardMessage {
  guildId: Long | undefined;
  mode: LeaderboardMode;
}

export interface LeaderboardMessage {
  entries: LeaderboardRankMessage[];
}

export interface LeaderboardRankMessage {
  rank: number;
  login: number;
  discordId: Long;
  username: string;
  bubbles: number;
  drops: number;
  awardScore: number;
}

function createBaseGetBubbleProgressMessage(): GetBubbleProgressMessage {
  return { login: 0, startDate: undefined, endDate: undefined, interval: 0 };
}

export const GetBubbleProgressMessage = {
  encode(message: GetBubbleProgressMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (message.startDate !== undefined) {
      Timestamp.encode(toTimestamp(message.startDate), writer.uint32(18).fork()).ldelim();
    }
    if (message.endDate !== undefined) {
      Timestamp.encode(toTimestamp(message.endDate), writer.uint32(26).fork()).ldelim();
    }
    if (message.interval !== 0) {
      writer.uint32(32).int32(message.interval);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBubbleProgressMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBubbleProgressMessage();
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
          if (tag !== 26) {
            break;
          }

          message.endDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.interval = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetBubbleProgressMessage {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      startDate: isSet(object.startDate) ? fromJsonTimestamp(object.startDate) : undefined,
      endDate: isSet(object.endDate) ? fromJsonTimestamp(object.endDate) : undefined,
      interval: isSet(object.interval) ? bubbleProgressIntervalModeFromJSON(object.interval) : 0,
    };
  },

  toJSON(message: GetBubbleProgressMessage): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.startDate !== undefined) {
      obj.startDate = message.startDate.toISOString();
    }
    if (message.endDate !== undefined) {
      obj.endDate = message.endDate.toISOString();
    }
    if (message.interval !== 0) {
      obj.interval = bubbleProgressIntervalModeToJSON(message.interval);
    }
    return obj;
  },
};

function createBaseBubbleProgressMessage(): BubbleProgressMessage {
  return { entries: [] };
}

export const BubbleProgressMessage = {
  encode(message: BubbleProgressMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.entries) {
      BubbleProgressEntryMessage.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BubbleProgressMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBubbleProgressMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.entries.push(BubbleProgressEntryMessage.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BubbleProgressMessage {
    return {
      entries: globalThis.Array.isArray(object?.entries)
        ? object.entries.map((e: any) => BubbleProgressEntryMessage.fromJSON(e))
        : [],
    };
  },

  toJSON(message: BubbleProgressMessage): unknown {
    const obj: any = {};
    if (message.entries?.length) {
      obj.entries = message.entries.map((e) => BubbleProgressEntryMessage.toJSON(e));
    }
    return obj;
  },
};

function createBaseBubbleProgressEntryMessage(): BubbleProgressEntryMessage {
  return { date: undefined, bubbles: 0 };
}

export const BubbleProgressEntryMessage = {
  encode(message: BubbleProgressEntryMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.date !== undefined) {
      Timestamp.encode(toTimestamp(message.date), writer.uint32(10).fork()).ldelim();
    }
    if (message.bubbles !== 0) {
      writer.uint32(16).int32(message.bubbles);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BubbleProgressEntryMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBubbleProgressEntryMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.date = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.bubbles = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BubbleProgressEntryMessage {
    return {
      date: isSet(object.date) ? fromJsonTimestamp(object.date) : undefined,
      bubbles: isSet(object.bubbles) ? globalThis.Number(object.bubbles) : 0,
    };
  },

  toJSON(message: BubbleProgressEntryMessage): unknown {
    const obj: any = {};
    if (message.date !== undefined) {
      obj.date = message.date.toISOString();
    }
    if (message.bubbles !== 0) {
      obj.bubbles = Math.round(message.bubbles);
    }
    return obj;
  },
};

function createBaseBubbleTimespanRangeRequest(): BubbleTimespanRangeRequest {
  return { login: 0, startDate: undefined, endDate: undefined };
}

export const BubbleTimespanRangeRequest = {
  encode(message: BubbleTimespanRangeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (message.startDate !== undefined) {
      Timestamp.encode(toTimestamp(message.startDate), writer.uint32(18).fork()).ldelim();
    }
    if (message.endDate !== undefined) {
      Timestamp.encode(toTimestamp(message.endDate), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BubbleTimespanRangeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBubbleTimespanRangeRequest();
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
          if (tag !== 26) {
            break;
          }

          message.endDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BubbleTimespanRangeRequest {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      startDate: isSet(object.startDate) ? fromJsonTimestamp(object.startDate) : undefined,
      endDate: isSet(object.endDate) ? fromJsonTimestamp(object.endDate) : undefined,
    };
  },

  toJSON(message: BubbleTimespanRangeRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.startDate !== undefined) {
      obj.startDate = message.startDate.toISOString();
    }
    if (message.endDate !== undefined) {
      obj.endDate = message.endDate.toISOString();
    }
    return obj;
  },
};

function createBaseBubbleTimespanRangeReply(): BubbleTimespanRangeReply {
  return { startAmount: 0, endAmount: 0 };
}

export const BubbleTimespanRangeReply = {
  encode(message: BubbleTimespanRangeReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.startAmount !== 0) {
      writer.uint32(8).int32(message.startAmount);
    }
    if (message.endAmount !== 0) {
      writer.uint32(16).int32(message.endAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BubbleTimespanRangeReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBubbleTimespanRangeReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.startAmount = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.endAmount = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BubbleTimespanRangeReply {
    return {
      startAmount: isSet(object.startAmount) ? globalThis.Number(object.startAmount) : 0,
      endAmount: isSet(object.endAmount) ? globalThis.Number(object.endAmount) : 0,
    };
  },

  toJSON(message: BubbleTimespanRangeReply): unknown {
    const obj: any = {};
    if (message.startAmount !== 0) {
      obj.startAmount = Math.round(message.startAmount);
    }
    if (message.endAmount !== 0) {
      obj.endAmount = Math.round(message.endAmount);
    }
    return obj;
  },
};

function createBaseGetLeaderboardMessage(): GetLeaderboardMessage {
  return { guildId: undefined, mode: 0 };
}

export const GetLeaderboardMessage = {
  encode(message: GetLeaderboardMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.guildId !== undefined) {
      Int64Value.encode({ value: message.guildId! }, writer.uint32(10).fork()).ldelim();
    }
    if (message.mode !== 0) {
      writer.uint32(16).int32(message.mode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetLeaderboardMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLeaderboardMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.guildId = Int64Value.decode(reader, reader.uint32()).value;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.mode = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetLeaderboardMessage {
    return {
      guildId: isSet(object.guildId) ? Long.fromValue(object.guildId) : undefined,
      mode: isSet(object.mode) ? leaderboardModeFromJSON(object.mode) : 0,
    };
  },

  toJSON(message: GetLeaderboardMessage): unknown {
    const obj: any = {};
    if (message.guildId !== undefined) {
      obj.guildId = message.guildId;
    }
    if (message.mode !== 0) {
      obj.mode = leaderboardModeToJSON(message.mode);
    }
    return obj;
  },
};

function createBaseLeaderboardMessage(): LeaderboardMessage {
  return { entries: [] };
}

export const LeaderboardMessage = {
  encode(message: LeaderboardMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.entries) {
      LeaderboardRankMessage.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LeaderboardMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeaderboardMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.entries.push(LeaderboardRankMessage.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LeaderboardMessage {
    return {
      entries: globalThis.Array.isArray(object?.entries)
        ? object.entries.map((e: any) => LeaderboardRankMessage.fromJSON(e))
        : [],
    };
  },

  toJSON(message: LeaderboardMessage): unknown {
    const obj: any = {};
    if (message.entries?.length) {
      obj.entries = message.entries.map((e) => LeaderboardRankMessage.toJSON(e));
    }
    return obj;
  },
};

function createBaseLeaderboardRankMessage(): LeaderboardRankMessage {
  return { rank: 0, login: 0, discordId: Long.ZERO, username: "", bubbles: 0, drops: 0, awardScore: 0 };
}

export const LeaderboardRankMessage = {
  encode(message: LeaderboardRankMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rank !== 0) {
      writer.uint32(8).int32(message.rank);
    }
    if (message.login !== 0) {
      writer.uint32(16).int32(message.login);
    }
    if (!message.discordId.isZero()) {
      writer.uint32(24).int64(message.discordId);
    }
    if (message.username !== "") {
      writer.uint32(34).string(message.username);
    }
    if (message.bubbles !== 0) {
      writer.uint32(40).int32(message.bubbles);
    }
    if (message.drops !== 0) {
      writer.uint32(48).int32(message.drops);
    }
    if (message.awardScore !== 0) {
      writer.uint32(56).int32(message.awardScore);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LeaderboardRankMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeaderboardRankMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.rank = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.login = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.discordId = reader.int64() as Long;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.username = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.bubbles = reader.int32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.drops = reader.int32();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.awardScore = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LeaderboardRankMessage {
    return {
      rank: isSet(object.rank) ? globalThis.Number(object.rank) : 0,
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      discordId: isSet(object.discordId) ? Long.fromValue(object.discordId) : Long.ZERO,
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      bubbles: isSet(object.bubbles) ? globalThis.Number(object.bubbles) : 0,
      drops: isSet(object.drops) ? globalThis.Number(object.drops) : 0,
      awardScore: isSet(object.awardScore) ? globalThis.Number(object.awardScore) : 0,
    };
  },

  toJSON(message: LeaderboardRankMessage): unknown {
    const obj: any = {};
    if (message.rank !== 0) {
      obj.rank = Math.round(message.rank);
    }
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (!message.discordId.isZero()) {
      obj.discordId = (message.discordId || Long.ZERO).toString();
    }
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.bubbles !== 0) {
      obj.bubbles = Math.round(message.bubbles);
    }
    if (message.drops !== 0) {
      obj.drops = Math.round(message.drops);
    }
    if (message.awardScore !== 0) {
      obj.awardScore = Math.round(message.awardScore);
    }
    return obj;
  },
};

/** Service definition for scene resource access */
export type StatsDefinition = typeof StatsDefinition;
export const StatsDefinition = {
  name: "Stats",
  fullName: "stats.Stats",
  methods: {
    /** Get the bubble range of a member in a timespan */
    getBubbleTimespanRange: {
      name: "GetBubbleTimespanRange",
      requestType: BubbleTimespanRangeRequest,
      requestStream: false,
      responseType: BubbleTimespanRangeReply,
      responseStream: false,
      options: {},
    },
    /** Get the bubble progress in a time range with given range steps */
    getBubbleProgress: {
      name: "GetBubbleProgress",
      requestType: GetBubbleProgressMessage,
      requestStream: false,
      responseType: BubbleProgressMessage,
      responseStream: false,
      options: {},
    },
    /** gets the member leaderboard, either global or for a guild, sorted by bubbles or drops */
    getLeaderboard: {
      name: "GetLeaderboard",
      requestType: GetLeaderboardMessage,
      requestStream: false,
      responseType: LeaderboardMessage,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface StatsServiceImplementation<CallContextExt = {}> {
  /** Get the bubble range of a member in a timespan */
  getBubbleTimespanRange(
    request: BubbleTimespanRangeRequest,
    context: CallContext & CallContextExt,
  ): Promise<BubbleTimespanRangeReply>;
  /** Get the bubble progress in a time range with given range steps */
  getBubbleProgress(
    request: GetBubbleProgressMessage,
    context: CallContext & CallContextExt,
  ): Promise<BubbleProgressMessage>;
  /** gets the member leaderboard, either global or for a guild, sorted by bubbles or drops */
  getLeaderboard(request: GetLeaderboardMessage, context: CallContext & CallContextExt): Promise<LeaderboardMessage>;
}

export interface StatsClient<CallOptionsExt = {}> {
  /** Get the bubble range of a member in a timespan */
  getBubbleTimespanRange(
    request: BubbleTimespanRangeRequest,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BubbleTimespanRangeReply>;
  /** Get the bubble progress in a time range with given range steps */
  getBubbleProgress(
    request: GetBubbleProgressMessage,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BubbleProgressMessage>;
  /** gets the member leaderboard, either global or for a guild, sorted by bubbles or drops */
  getLeaderboard(request: GetLeaderboardMessage, options?: CallOptions & CallOptionsExt): Promise<LeaderboardMessage>;
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
