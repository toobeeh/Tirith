/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "leagues";

/** Response containing league evaluation. */
export interface LeagueSeasonEvaluationReply {
  year: number;
  month: number;
  scoreRanking: LeagueScoreRankingReply[];
  countRanking: LeagueCountRankingReply[];
  timeRanking: LeagueAverageTimeRankingReply[];
  weightRanking: LeagueAverageWeightRankingReply[];
  streakRanking: LeagueStreakRankingReply[];
}

/** Response containing own league evaluation. */
export interface LeagueSeasonMemberEvaluationReply {
  year: number;
  month: number;
  score: number;
  count: number;
  maxStreak: number;
  currentStreak: number;
  averageTime: number;
  averageWeight: number;
}

export interface LeagueScoreRankingReply {
  name: string;
  score: number;
}

export interface LeagueCountRankingReply {
  name: string;
  caughtDrops: number;
}

export interface LeagueAverageTimeRankingReply {
  name: string;
  averageTime: number;
}

export interface LeagueAverageWeightRankingReply {
  name: string;
  averageWeight: number;
}

export interface LeagueStreakRankingReply {
  name: string;
  maxStreak: number;
  currentStreak: number;
}

/** Request containing a month and year for a league season */
export interface EvaluateSeasonRequest {
  year: number;
  month: number;
}

/** Request containing a month and year for a league season, and a user identification */
export interface EvaluateMemberSeasonRequest {
  year: number;
  month: number;
  login: number;
}

/** Request containing a user identification */
export interface EvaluateMemberCurrentSeasonRequest {
  login: number;
}

function createBaseLeagueSeasonEvaluationReply(): LeagueSeasonEvaluationReply {
  return {
    year: 0,
    month: 0,
    scoreRanking: [],
    countRanking: [],
    timeRanking: [],
    weightRanking: [],
    streakRanking: [],
  };
}

export const LeagueSeasonEvaluationReply = {
  encode(message: LeagueSeasonEvaluationReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.year !== 0) {
      writer.uint32(8).int32(message.year);
    }
    if (message.month !== 0) {
      writer.uint32(16).int32(message.month);
    }
    for (const v of message.scoreRanking) {
      LeagueScoreRankingReply.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.countRanking) {
      LeagueCountRankingReply.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.timeRanking) {
      LeagueAverageTimeRankingReply.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.weightRanking) {
      LeagueAverageWeightRankingReply.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.streakRanking) {
      LeagueStreakRankingReply.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LeagueSeasonEvaluationReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeagueSeasonEvaluationReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.year = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.month = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.scoreRanking.push(LeagueScoreRankingReply.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.countRanking.push(LeagueCountRankingReply.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.timeRanking.push(LeagueAverageTimeRankingReply.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.weightRanking.push(LeagueAverageWeightRankingReply.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.streakRanking.push(LeagueStreakRankingReply.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LeagueSeasonEvaluationReply {
    return {
      year: isSet(object.year) ? globalThis.Number(object.year) : 0,
      month: isSet(object.month) ? globalThis.Number(object.month) : 0,
      scoreRanking: globalThis.Array.isArray(object?.scoreRanking)
        ? object.scoreRanking.map((e: any) => LeagueScoreRankingReply.fromJSON(e))
        : [],
      countRanking: globalThis.Array.isArray(object?.countRanking)
        ? object.countRanking.map((e: any) => LeagueCountRankingReply.fromJSON(e))
        : [],
      timeRanking: globalThis.Array.isArray(object?.timeRanking)
        ? object.timeRanking.map((e: any) => LeagueAverageTimeRankingReply.fromJSON(e))
        : [],
      weightRanking: globalThis.Array.isArray(object?.weightRanking)
        ? object.weightRanking.map((e: any) => LeagueAverageWeightRankingReply.fromJSON(e))
        : [],
      streakRanking: globalThis.Array.isArray(object?.streakRanking)
        ? object.streakRanking.map((e: any) => LeagueStreakRankingReply.fromJSON(e))
        : [],
    };
  },

  toJSON(message: LeagueSeasonEvaluationReply): unknown {
    const obj: any = {};
    if (message.year !== 0) {
      obj.year = Math.round(message.year);
    }
    if (message.month !== 0) {
      obj.month = Math.round(message.month);
    }
    if (message.scoreRanking?.length) {
      obj.scoreRanking = message.scoreRanking.map((e) => LeagueScoreRankingReply.toJSON(e));
    }
    if (message.countRanking?.length) {
      obj.countRanking = message.countRanking.map((e) => LeagueCountRankingReply.toJSON(e));
    }
    if (message.timeRanking?.length) {
      obj.timeRanking = message.timeRanking.map((e) => LeagueAverageTimeRankingReply.toJSON(e));
    }
    if (message.weightRanking?.length) {
      obj.weightRanking = message.weightRanking.map((e) => LeagueAverageWeightRankingReply.toJSON(e));
    }
    if (message.streakRanking?.length) {
      obj.streakRanking = message.streakRanking.map((e) => LeagueStreakRankingReply.toJSON(e));
    }
    return obj;
  },
};

function createBaseLeagueSeasonMemberEvaluationReply(): LeagueSeasonMemberEvaluationReply {
  return { year: 0, month: 0, score: 0, count: 0, maxStreak: 0, currentStreak: 0, averageTime: 0, averageWeight: 0 };
}

export const LeagueSeasonMemberEvaluationReply = {
  encode(message: LeagueSeasonMemberEvaluationReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.year !== 0) {
      writer.uint32(8).int32(message.year);
    }
    if (message.month !== 0) {
      writer.uint32(16).int32(message.month);
    }
    if (message.score !== 0) {
      writer.uint32(25).double(message.score);
    }
    if (message.count !== 0) {
      writer.uint32(40).int32(message.count);
    }
    if (message.maxStreak !== 0) {
      writer.uint32(48).int32(message.maxStreak);
    }
    if (message.currentStreak !== 0) {
      writer.uint32(56).int32(message.currentStreak);
    }
    if (message.averageTime !== 0) {
      writer.uint32(65).double(message.averageTime);
    }
    if (message.averageWeight !== 0) {
      writer.uint32(73).double(message.averageWeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LeagueSeasonMemberEvaluationReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeagueSeasonMemberEvaluationReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.year = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.month = reader.int32();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.score = reader.double();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.count = reader.int32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.maxStreak = reader.int32();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.currentStreak = reader.int32();
          continue;
        case 8:
          if (tag !== 65) {
            break;
          }

          message.averageTime = reader.double();
          continue;
        case 9:
          if (tag !== 73) {
            break;
          }

          message.averageWeight = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LeagueSeasonMemberEvaluationReply {
    return {
      year: isSet(object.year) ? globalThis.Number(object.year) : 0,
      month: isSet(object.month) ? globalThis.Number(object.month) : 0,
      score: isSet(object.score) ? globalThis.Number(object.score) : 0,
      count: isSet(object.count) ? globalThis.Number(object.count) : 0,
      maxStreak: isSet(object.maxStreak) ? globalThis.Number(object.maxStreak) : 0,
      currentStreak: isSet(object.currentStreak) ? globalThis.Number(object.currentStreak) : 0,
      averageTime: isSet(object.averageTime) ? globalThis.Number(object.averageTime) : 0,
      averageWeight: isSet(object.averageWeight) ? globalThis.Number(object.averageWeight) : 0,
    };
  },

  toJSON(message: LeagueSeasonMemberEvaluationReply): unknown {
    const obj: any = {};
    if (message.year !== 0) {
      obj.year = Math.round(message.year);
    }
    if (message.month !== 0) {
      obj.month = Math.round(message.month);
    }
    if (message.score !== 0) {
      obj.score = message.score;
    }
    if (message.count !== 0) {
      obj.count = Math.round(message.count);
    }
    if (message.maxStreak !== 0) {
      obj.maxStreak = Math.round(message.maxStreak);
    }
    if (message.currentStreak !== 0) {
      obj.currentStreak = Math.round(message.currentStreak);
    }
    if (message.averageTime !== 0) {
      obj.averageTime = message.averageTime;
    }
    if (message.averageWeight !== 0) {
      obj.averageWeight = message.averageWeight;
    }
    return obj;
  },
};

function createBaseLeagueScoreRankingReply(): LeagueScoreRankingReply {
  return { name: "", score: 0 };
}

export const LeagueScoreRankingReply = {
  encode(message: LeagueScoreRankingReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.score !== 0) {
      writer.uint32(17).double(message.score);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LeagueScoreRankingReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeagueScoreRankingReply();
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
          if (tag !== 17) {
            break;
          }

          message.score = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LeagueScoreRankingReply {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      score: isSet(object.score) ? globalThis.Number(object.score) : 0,
    };
  },

  toJSON(message: LeagueScoreRankingReply): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.score !== 0) {
      obj.score = message.score;
    }
    return obj;
  },
};

function createBaseLeagueCountRankingReply(): LeagueCountRankingReply {
  return { name: "", caughtDrops: 0 };
}

export const LeagueCountRankingReply = {
  encode(message: LeagueCountRankingReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.caughtDrops !== 0) {
      writer.uint32(16).int32(message.caughtDrops);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LeagueCountRankingReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeagueCountRankingReply();
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

          message.caughtDrops = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LeagueCountRankingReply {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      caughtDrops: isSet(object.caughtDrops) ? globalThis.Number(object.caughtDrops) : 0,
    };
  },

  toJSON(message: LeagueCountRankingReply): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.caughtDrops !== 0) {
      obj.caughtDrops = Math.round(message.caughtDrops);
    }
    return obj;
  },
};

function createBaseLeagueAverageTimeRankingReply(): LeagueAverageTimeRankingReply {
  return { name: "", averageTime: 0 };
}

export const LeagueAverageTimeRankingReply = {
  encode(message: LeagueAverageTimeRankingReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.averageTime !== 0) {
      writer.uint32(17).double(message.averageTime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LeagueAverageTimeRankingReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeagueAverageTimeRankingReply();
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
          if (tag !== 17) {
            break;
          }

          message.averageTime = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LeagueAverageTimeRankingReply {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      averageTime: isSet(object.averageTime) ? globalThis.Number(object.averageTime) : 0,
    };
  },

  toJSON(message: LeagueAverageTimeRankingReply): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.averageTime !== 0) {
      obj.averageTime = message.averageTime;
    }
    return obj;
  },
};

function createBaseLeagueAverageWeightRankingReply(): LeagueAverageWeightRankingReply {
  return { name: "", averageWeight: 0 };
}

export const LeagueAverageWeightRankingReply = {
  encode(message: LeagueAverageWeightRankingReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.averageWeight !== 0) {
      writer.uint32(17).double(message.averageWeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LeagueAverageWeightRankingReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeagueAverageWeightRankingReply();
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
          if (tag !== 17) {
            break;
          }

          message.averageWeight = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LeagueAverageWeightRankingReply {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      averageWeight: isSet(object.averageWeight) ? globalThis.Number(object.averageWeight) : 0,
    };
  },

  toJSON(message: LeagueAverageWeightRankingReply): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.averageWeight !== 0) {
      obj.averageWeight = message.averageWeight;
    }
    return obj;
  },
};

function createBaseLeagueStreakRankingReply(): LeagueStreakRankingReply {
  return { name: "", maxStreak: 0, currentStreak: 0 };
}

export const LeagueStreakRankingReply = {
  encode(message: LeagueStreakRankingReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.maxStreak !== 0) {
      writer.uint32(16).int32(message.maxStreak);
    }
    if (message.currentStreak !== 0) {
      writer.uint32(24).int32(message.currentStreak);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LeagueStreakRankingReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeagueStreakRankingReply();
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

          message.maxStreak = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.currentStreak = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LeagueStreakRankingReply {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      maxStreak: isSet(object.maxStreak) ? globalThis.Number(object.maxStreak) : 0,
      currentStreak: isSet(object.currentStreak) ? globalThis.Number(object.currentStreak) : 0,
    };
  },

  toJSON(message: LeagueStreakRankingReply): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.maxStreak !== 0) {
      obj.maxStreak = Math.round(message.maxStreak);
    }
    if (message.currentStreak !== 0) {
      obj.currentStreak = Math.round(message.currentStreak);
    }
    return obj;
  },
};

function createBaseEvaluateSeasonRequest(): EvaluateSeasonRequest {
  return { year: 0, month: 0 };
}

export const EvaluateSeasonRequest = {
  encode(message: EvaluateSeasonRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.year !== 0) {
      writer.uint32(8).int32(message.year);
    }
    if (message.month !== 0) {
      writer.uint32(16).int32(message.month);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EvaluateSeasonRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvaluateSeasonRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.year = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.month = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EvaluateSeasonRequest {
    return {
      year: isSet(object.year) ? globalThis.Number(object.year) : 0,
      month: isSet(object.month) ? globalThis.Number(object.month) : 0,
    };
  },

  toJSON(message: EvaluateSeasonRequest): unknown {
    const obj: any = {};
    if (message.year !== 0) {
      obj.year = Math.round(message.year);
    }
    if (message.month !== 0) {
      obj.month = Math.round(message.month);
    }
    return obj;
  },
};

function createBaseEvaluateMemberSeasonRequest(): EvaluateMemberSeasonRequest {
  return { year: 0, month: 0, login: 0 };
}

export const EvaluateMemberSeasonRequest = {
  encode(message: EvaluateMemberSeasonRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.year !== 0) {
      writer.uint32(8).int32(message.year);
    }
    if (message.month !== 0) {
      writer.uint32(16).int32(message.month);
    }
    if (message.login !== 0) {
      writer.uint32(24).int32(message.login);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EvaluateMemberSeasonRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvaluateMemberSeasonRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.year = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.month = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
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

  fromJSON(object: any): EvaluateMemberSeasonRequest {
    return {
      year: isSet(object.year) ? globalThis.Number(object.year) : 0,
      month: isSet(object.month) ? globalThis.Number(object.month) : 0,
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
    };
  },

  toJSON(message: EvaluateMemberSeasonRequest): unknown {
    const obj: any = {};
    if (message.year !== 0) {
      obj.year = Math.round(message.year);
    }
    if (message.month !== 0) {
      obj.month = Math.round(message.month);
    }
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    return obj;
  },
};

function createBaseEvaluateMemberCurrentSeasonRequest(): EvaluateMemberCurrentSeasonRequest {
  return { login: 0 };
}

export const EvaluateMemberCurrentSeasonRequest = {
  encode(message: EvaluateMemberCurrentSeasonRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(16).int32(message.login);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EvaluateMemberCurrentSeasonRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvaluateMemberCurrentSeasonRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 16) {
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

  fromJSON(object: any): EvaluateMemberCurrentSeasonRequest {
    return { login: isSet(object.login) ? globalThis.Number(object.login) : 0 };
  },

  toJSON(message: EvaluateMemberCurrentSeasonRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    return obj;
  },
};

/** Service definition for league stat access */
export type LeaguesDefinition = typeof LeaguesDefinition;
export const LeaguesDefinition = {
  name: "Leagues",
  fullName: "leagues.Leagues",
  methods: {
    /** Gets the current league evaluation */
    evaluateCurrentLeagueSeason: {
      name: "EvaluateCurrentLeagueSeason",
      requestType: Empty,
      requestStream: false,
      responseType: LeagueSeasonEvaluationReply,
      responseStream: false,
      options: {},
    },
    /** gets the league evaluation for a specific month */
    evaluateLeagueSeason: {
      name: "EvaluateLeagueSeason",
      requestType: EvaluateSeasonRequest,
      requestStream: false,
      responseType: LeagueSeasonEvaluationReply,
      responseStream: false,
      options: {},
    },
    /** Gets the current own league evaluation */
    evaluateMemberCurrentLeagueSeason: {
      name: "EvaluateMemberCurrentLeagueSeason",
      requestType: EvaluateMemberCurrentSeasonRequest,
      requestStream: false,
      responseType: LeagueSeasonMemberEvaluationReply,
      responseStream: false,
      options: {},
    },
    /** gets the own league evaluation for a specific month */
    evaluateMemberLeagueSeason: {
      name: "EvaluateMemberLeagueSeason",
      requestType: EvaluateMemberSeasonRequest,
      requestStream: false,
      responseType: LeagueSeasonMemberEvaluationReply,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface LeaguesServiceImplementation<CallContextExt = {}> {
  /** Gets the current league evaluation */
  evaluateCurrentLeagueSeason(
    request: Empty,
    context: CallContext & CallContextExt,
  ): Promise<LeagueSeasonEvaluationReply>;
  /** gets the league evaluation for a specific month */
  evaluateLeagueSeason(
    request: EvaluateSeasonRequest,
    context: CallContext & CallContextExt,
  ): Promise<LeagueSeasonEvaluationReply>;
  /** Gets the current own league evaluation */
  evaluateMemberCurrentLeagueSeason(
    request: EvaluateMemberCurrentSeasonRequest,
    context: CallContext & CallContextExt,
  ): Promise<LeagueSeasonMemberEvaluationReply>;
  /** gets the own league evaluation for a specific month */
  evaluateMemberLeagueSeason(
    request: EvaluateMemberSeasonRequest,
    context: CallContext & CallContextExt,
  ): Promise<LeagueSeasonMemberEvaluationReply>;
}

export interface LeaguesClient<CallOptionsExt = {}> {
  /** Gets the current league evaluation */
  evaluateCurrentLeagueSeason(
    request: Empty,
    options?: CallOptions & CallOptionsExt,
  ): Promise<LeagueSeasonEvaluationReply>;
  /** gets the league evaluation for a specific month */
  evaluateLeagueSeason(
    request: EvaluateSeasonRequest,
    options?: CallOptions & CallOptionsExt,
  ): Promise<LeagueSeasonEvaluationReply>;
  /** Gets the current own league evaluation */
  evaluateMemberCurrentLeagueSeason(
    request: EvaluateMemberCurrentSeasonRequest,
    options?: CallOptions & CallOptionsExt,
  ): Promise<LeagueSeasonMemberEvaluationReply>;
  /** gets the own league evaluation for a specific month */
  evaluateMemberLeagueSeason(
    request: EvaluateMemberSeasonRequest,
    options?: CallOptions & CallOptionsExt,
  ): Promise<LeagueSeasonMemberEvaluationReply>;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
