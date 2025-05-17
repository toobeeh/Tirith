/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import Long = require("long");
import * as _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";
import { Timestamp } from "./google/protobuf/timestamp";
import { Int32Value, Int64Value, StringValue } from "./google/protobuf/wrappers";
import { SpriteSlotConfigurationReply } from "./inventory";

export const protobufPackage = "lobbies";

export interface GetOnlinePlayerJoinDetailsMessage {
  guildId: Long;
}

export interface GetLobbyByIdRequest {
  lobbyId: string;
}

export interface GetLobbiesByIdRequest {
  lobbyIds: string[];
}

export interface GetOnlinePlayersRequest {
  /** filter players who are connected to this guild */
  guildId: Long | undefined;
}

export interface SkribblLobbyMessage {
  skribblState: SkribblLobbyStateMessage | undefined;
  typoSettings: SkribblLobbyTypoSettingsMessage | undefined;
}

export interface SkribblLobbyStateMessage {
  lobbyId: string;
  round: number;
  ownerId: number | undefined;
  drawerId: number | undefined;
  settings: SkribblLobbySkribblSettingsMessage | undefined;
  players: SkribblLobbySkribblPlayerMessage[];
}

export interface SkribblLobbySkribblSettingsMessage {
  language: string;
  players: number;
  rounds: number;
  drawTime: number;
}

export interface SkribblLobbySkribblPlayerMessage {
  name: string;
  playerId: number;
  score: number;
  guessed: boolean;
}

export interface SkribblLobbyTypoMemberMessage {
  login: number;
  lobbyPlayerId: number;
  ownershipClaim: Long;
  bubbles: number;
  patronEmoji: string | undefined;
  sceneId: number | undefined;
  sceneShift: number | undefined;
  spriteSlots: SpriteSlotConfigurationReply[];
}

export interface SkribblLobbyTypoMembersMessage {
  members: SkribblLobbyTypoMemberMessage[];
  lobbyId: string;
}

export interface SkribblLobbyIdentificationMessage {
  link: string;
}

export interface SkribblLobbyTypoSettingsMessage {
  lobbyId: string;
  description: string;
  whitelistAllowedServers: boolean;
  allowedServers: Long[];
  LobbyOwnershipClaim: Long | undefined;
  FirstSeen: Date | undefined;
  LastUpdated: Date | undefined;
}

export interface EncryptedLobbyLinkTokenMessage {
  token: string;
}

export interface PlainLobbyLinkMessage {
  link: string;
  guildId: Long;
}

export interface SetGuildLobbyLinksMessage {
  guildId: Long;
  links: GuildLobbyLinkMessage[];
}

export interface GuildLobbyLinkMessage {
  guildId: Long;
  login: number;
  link: string;
  slotAvailable: boolean;
  username: string;
}

export interface GetLobbyDropClaimsRequest {
  lobbyKey: string;
}

/** Request containing a logged drop claim from a lobby */
export interface DropLogReply {
  id: Long;
  lobbyKey: string;
  claimDiscordId: Long;
  validFrom: string;
  eventDropId: number | undefined;
  leagueTime: number | undefined;
}

function createBaseGetOnlinePlayerJoinDetailsMessage(): GetOnlinePlayerJoinDetailsMessage {
  return { guildId: Long.ZERO };
}

export const GetOnlinePlayerJoinDetailsMessage = {
  encode(message: GetOnlinePlayerJoinDetailsMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.guildId.isZero()) {
      writer.uint32(8).int64(message.guildId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetOnlinePlayerJoinDetailsMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetOnlinePlayerJoinDetailsMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.guildId = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetOnlinePlayerJoinDetailsMessage {
    return { guildId: isSet(object.guildId) ? Long.fromValue(object.guildId) : Long.ZERO };
  },

  toJSON(message: GetOnlinePlayerJoinDetailsMessage): unknown {
    const obj: any = {};
    if (!message.guildId.isZero()) {
      obj.guildId = (message.guildId || Long.ZERO).toString();
    }
    return obj;
  },
};

function createBaseGetLobbyByIdRequest(): GetLobbyByIdRequest {
  return { lobbyId: "" };
}

export const GetLobbyByIdRequest = {
  encode(message: GetLobbyByIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lobbyId !== "") {
      writer.uint32(10).string(message.lobbyId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetLobbyByIdRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLobbyByIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.lobbyId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetLobbyByIdRequest {
    return { lobbyId: isSet(object.lobbyId) ? globalThis.String(object.lobbyId) : "" };
  },

  toJSON(message: GetLobbyByIdRequest): unknown {
    const obj: any = {};
    if (message.lobbyId !== "") {
      obj.lobbyId = message.lobbyId;
    }
    return obj;
  },
};

function createBaseGetLobbiesByIdRequest(): GetLobbiesByIdRequest {
  return { lobbyIds: [] };
}

export const GetLobbiesByIdRequest = {
  encode(message: GetLobbiesByIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.lobbyIds) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetLobbiesByIdRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLobbiesByIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.lobbyIds.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetLobbiesByIdRequest {
    return {
      lobbyIds: globalThis.Array.isArray(object?.lobbyIds) ? object.lobbyIds.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: GetLobbiesByIdRequest): unknown {
    const obj: any = {};
    if (message.lobbyIds?.length) {
      obj.lobbyIds = message.lobbyIds;
    }
    return obj;
  },
};

function createBaseGetOnlinePlayersRequest(): GetOnlinePlayersRequest {
  return { guildId: undefined };
}

export const GetOnlinePlayersRequest = {
  encode(message: GetOnlinePlayersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.guildId !== undefined) {
      Int64Value.encode({ value: message.guildId! }, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetOnlinePlayersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetOnlinePlayersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.guildId = Int64Value.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetOnlinePlayersRequest {
    return { guildId: isSet(object.guildId) ? Long.fromValue(object.guildId) : undefined };
  },

  toJSON(message: GetOnlinePlayersRequest): unknown {
    const obj: any = {};
    if (message.guildId !== undefined) {
      obj.guildId = message.guildId;
    }
    return obj;
  },
};

function createBaseSkribblLobbyMessage(): SkribblLobbyMessage {
  return { skribblState: undefined, typoSettings: undefined };
}

export const SkribblLobbyMessage = {
  encode(message: SkribblLobbyMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.skribblState !== undefined) {
      SkribblLobbyStateMessage.encode(message.skribblState, writer.uint32(10).fork()).ldelim();
    }
    if (message.typoSettings !== undefined) {
      SkribblLobbyTypoSettingsMessage.encode(message.typoSettings, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SkribblLobbyMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSkribblLobbyMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.skribblState = SkribblLobbyStateMessage.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.typoSettings = SkribblLobbyTypoSettingsMessage.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SkribblLobbyMessage {
    return {
      skribblState: isSet(object.skribblState) ? SkribblLobbyStateMessage.fromJSON(object.skribblState) : undefined,
      typoSettings: isSet(object.typoSettings)
        ? SkribblLobbyTypoSettingsMessage.fromJSON(object.typoSettings)
        : undefined,
    };
  },

  toJSON(message: SkribblLobbyMessage): unknown {
    const obj: any = {};
    if (message.skribblState !== undefined) {
      obj.skribblState = SkribblLobbyStateMessage.toJSON(message.skribblState);
    }
    if (message.typoSettings !== undefined) {
      obj.typoSettings = SkribblLobbyTypoSettingsMessage.toJSON(message.typoSettings);
    }
    return obj;
  },
};

function createBaseSkribblLobbyStateMessage(): SkribblLobbyStateMessage {
  return { lobbyId: "", round: 0, ownerId: undefined, drawerId: undefined, settings: undefined, players: [] };
}

export const SkribblLobbyStateMessage = {
  encode(message: SkribblLobbyStateMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lobbyId !== "") {
      writer.uint32(10).string(message.lobbyId);
    }
    if (message.round !== 0) {
      writer.uint32(24).int32(message.round);
    }
    if (message.ownerId !== undefined) {
      Int32Value.encode({ value: message.ownerId! }, writer.uint32(34).fork()).ldelim();
    }
    if (message.drawerId !== undefined) {
      Int32Value.encode({ value: message.drawerId! }, writer.uint32(42).fork()).ldelim();
    }
    if (message.settings !== undefined) {
      SkribblLobbySkribblSettingsMessage.encode(message.settings, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.players) {
      SkribblLobbySkribblPlayerMessage.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SkribblLobbyStateMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSkribblLobbyStateMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.lobbyId = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.round = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.ownerId = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.drawerId = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.settings = SkribblLobbySkribblSettingsMessage.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.players.push(SkribblLobbySkribblPlayerMessage.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SkribblLobbyStateMessage {
    return {
      lobbyId: isSet(object.lobbyId) ? globalThis.String(object.lobbyId) : "",
      round: isSet(object.round) ? globalThis.Number(object.round) : 0,
      ownerId: isSet(object.ownerId) ? Number(object.ownerId) : undefined,
      drawerId: isSet(object.drawerId) ? Number(object.drawerId) : undefined,
      settings: isSet(object.settings) ? SkribblLobbySkribblSettingsMessage.fromJSON(object.settings) : undefined,
      players: globalThis.Array.isArray(object?.players)
        ? object.players.map((e: any) => SkribblLobbySkribblPlayerMessage.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SkribblLobbyStateMessage): unknown {
    const obj: any = {};
    if (message.lobbyId !== "") {
      obj.lobbyId = message.lobbyId;
    }
    if (message.round !== 0) {
      obj.round = Math.round(message.round);
    }
    if (message.ownerId !== undefined) {
      obj.ownerId = message.ownerId;
    }
    if (message.drawerId !== undefined) {
      obj.drawerId = message.drawerId;
    }
    if (message.settings !== undefined) {
      obj.settings = SkribblLobbySkribblSettingsMessage.toJSON(message.settings);
    }
    if (message.players?.length) {
      obj.players = message.players.map((e) => SkribblLobbySkribblPlayerMessage.toJSON(e));
    }
    return obj;
  },
};

function createBaseSkribblLobbySkribblSettingsMessage(): SkribblLobbySkribblSettingsMessage {
  return { language: "", players: 0, rounds: 0, drawTime: 0 };
}

export const SkribblLobbySkribblSettingsMessage = {
  encode(message: SkribblLobbySkribblSettingsMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.language !== "") {
      writer.uint32(10).string(message.language);
    }
    if (message.players !== 0) {
      writer.uint32(16).int32(message.players);
    }
    if (message.rounds !== 0) {
      writer.uint32(24).int32(message.rounds);
    }
    if (message.drawTime !== 0) {
      writer.uint32(32).int32(message.drawTime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SkribblLobbySkribblSettingsMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSkribblLobbySkribblSettingsMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.language = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.players = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.rounds = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.drawTime = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SkribblLobbySkribblSettingsMessage {
    return {
      language: isSet(object.language) ? globalThis.String(object.language) : "",
      players: isSet(object.players) ? globalThis.Number(object.players) : 0,
      rounds: isSet(object.rounds) ? globalThis.Number(object.rounds) : 0,
      drawTime: isSet(object.drawTime) ? globalThis.Number(object.drawTime) : 0,
    };
  },

  toJSON(message: SkribblLobbySkribblSettingsMessage): unknown {
    const obj: any = {};
    if (message.language !== "") {
      obj.language = message.language;
    }
    if (message.players !== 0) {
      obj.players = Math.round(message.players);
    }
    if (message.rounds !== 0) {
      obj.rounds = Math.round(message.rounds);
    }
    if (message.drawTime !== 0) {
      obj.drawTime = Math.round(message.drawTime);
    }
    return obj;
  },
};

function createBaseSkribblLobbySkribblPlayerMessage(): SkribblLobbySkribblPlayerMessage {
  return { name: "", playerId: 0, score: 0, guessed: false };
}

export const SkribblLobbySkribblPlayerMessage = {
  encode(message: SkribblLobbySkribblPlayerMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.playerId !== 0) {
      writer.uint32(16).int32(message.playerId);
    }
    if (message.score !== 0) {
      writer.uint32(24).int32(message.score);
    }
    if (message.guessed === true) {
      writer.uint32(32).bool(message.guessed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SkribblLobbySkribblPlayerMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSkribblLobbySkribblPlayerMessage();
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

          message.playerId = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.score = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.guessed = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SkribblLobbySkribblPlayerMessage {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      playerId: isSet(object.playerId) ? globalThis.Number(object.playerId) : 0,
      score: isSet(object.score) ? globalThis.Number(object.score) : 0,
      guessed: isSet(object.guessed) ? globalThis.Boolean(object.guessed) : false,
    };
  },

  toJSON(message: SkribblLobbySkribblPlayerMessage): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.playerId !== 0) {
      obj.playerId = Math.round(message.playerId);
    }
    if (message.score !== 0) {
      obj.score = Math.round(message.score);
    }
    if (message.guessed === true) {
      obj.guessed = message.guessed;
    }
    return obj;
  },
};

function createBaseSkribblLobbyTypoMemberMessage(): SkribblLobbyTypoMemberMessage {
  return {
    login: 0,
    lobbyPlayerId: 0,
    ownershipClaim: Long.ZERO,
    bubbles: 0,
    patronEmoji: undefined,
    sceneId: undefined,
    sceneShift: undefined,
    spriteSlots: [],
  };
}

export const SkribblLobbyTypoMemberMessage = {
  encode(message: SkribblLobbyTypoMemberMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (message.lobbyPlayerId !== 0) {
      writer.uint32(16).int32(message.lobbyPlayerId);
    }
    if (!message.ownershipClaim.isZero()) {
      writer.uint32(24).int64(message.ownershipClaim);
    }
    if (message.bubbles !== 0) {
      writer.uint32(32).int32(message.bubbles);
    }
    if (message.patronEmoji !== undefined) {
      StringValue.encode({ value: message.patronEmoji! }, writer.uint32(42).fork()).ldelim();
    }
    if (message.sceneId !== undefined) {
      Int32Value.encode({ value: message.sceneId! }, writer.uint32(50).fork()).ldelim();
    }
    if (message.sceneShift !== undefined) {
      Int32Value.encode({ value: message.sceneShift! }, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.spriteSlots) {
      SpriteSlotConfigurationReply.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SkribblLobbyTypoMemberMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSkribblLobbyTypoMemberMessage();
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

          message.lobbyPlayerId = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.ownershipClaim = reader.int64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.bubbles = reader.int32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.patronEmoji = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.sceneId = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.sceneShift = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.spriteSlots.push(SpriteSlotConfigurationReply.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SkribblLobbyTypoMemberMessage {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      lobbyPlayerId: isSet(object.lobbyPlayerId) ? globalThis.Number(object.lobbyPlayerId) : 0,
      ownershipClaim: isSet(object.ownershipClaim) ? Long.fromValue(object.ownershipClaim) : Long.ZERO,
      bubbles: isSet(object.bubbles) ? globalThis.Number(object.bubbles) : 0,
      patronEmoji: isSet(object.patronEmoji) ? String(object.patronEmoji) : undefined,
      sceneId: isSet(object.sceneId) ? Number(object.sceneId) : undefined,
      sceneShift: isSet(object.sceneShift) ? Number(object.sceneShift) : undefined,
      spriteSlots: globalThis.Array.isArray(object?.spriteSlots)
        ? object.spriteSlots.map((e: any) => SpriteSlotConfigurationReply.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SkribblLobbyTypoMemberMessage): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.lobbyPlayerId !== 0) {
      obj.lobbyPlayerId = Math.round(message.lobbyPlayerId);
    }
    if (!message.ownershipClaim.isZero()) {
      obj.ownershipClaim = (message.ownershipClaim || Long.ZERO).toString();
    }
    if (message.bubbles !== 0) {
      obj.bubbles = Math.round(message.bubbles);
    }
    if (message.patronEmoji !== undefined) {
      obj.patronEmoji = message.patronEmoji;
    }
    if (message.sceneId !== undefined) {
      obj.sceneId = message.sceneId;
    }
    if (message.sceneShift !== undefined) {
      obj.sceneShift = message.sceneShift;
    }
    if (message.spriteSlots?.length) {
      obj.spriteSlots = message.spriteSlots.map((e) => SpriteSlotConfigurationReply.toJSON(e));
    }
    return obj;
  },
};

function createBaseSkribblLobbyTypoMembersMessage(): SkribblLobbyTypoMembersMessage {
  return { members: [], lobbyId: "" };
}

export const SkribblLobbyTypoMembersMessage = {
  encode(message: SkribblLobbyTypoMembersMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.members) {
      SkribblLobbyTypoMemberMessage.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.lobbyId !== "") {
      writer.uint32(18).string(message.lobbyId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SkribblLobbyTypoMembersMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSkribblLobbyTypoMembersMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.members.push(SkribblLobbyTypoMemberMessage.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.lobbyId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SkribblLobbyTypoMembersMessage {
    return {
      members: globalThis.Array.isArray(object?.members)
        ? object.members.map((e: any) => SkribblLobbyTypoMemberMessage.fromJSON(e))
        : [],
      lobbyId: isSet(object.lobbyId) ? globalThis.String(object.lobbyId) : "",
    };
  },

  toJSON(message: SkribblLobbyTypoMembersMessage): unknown {
    const obj: any = {};
    if (message.members?.length) {
      obj.members = message.members.map((e) => SkribblLobbyTypoMemberMessage.toJSON(e));
    }
    if (message.lobbyId !== "") {
      obj.lobbyId = message.lobbyId;
    }
    return obj;
  },
};

function createBaseSkribblLobbyIdentificationMessage(): SkribblLobbyIdentificationMessage {
  return { link: "" };
}

export const SkribblLobbyIdentificationMessage = {
  encode(message: SkribblLobbyIdentificationMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.link !== "") {
      writer.uint32(10).string(message.link);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SkribblLobbyIdentificationMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSkribblLobbyIdentificationMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.link = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SkribblLobbyIdentificationMessage {
    return { link: isSet(object.link) ? globalThis.String(object.link) : "" };
  },

  toJSON(message: SkribblLobbyIdentificationMessage): unknown {
    const obj: any = {};
    if (message.link !== "") {
      obj.link = message.link;
    }
    return obj;
  },
};

function createBaseSkribblLobbyTypoSettingsMessage(): SkribblLobbyTypoSettingsMessage {
  return {
    lobbyId: "",
    description: "",
    whitelistAllowedServers: false,
    allowedServers: [],
    LobbyOwnershipClaim: undefined,
    FirstSeen: undefined,
    LastUpdated: undefined,
  };
}

export const SkribblLobbyTypoSettingsMessage = {
  encode(message: SkribblLobbyTypoSettingsMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lobbyId !== "") {
      writer.uint32(10).string(message.lobbyId);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.whitelistAllowedServers === true) {
      writer.uint32(24).bool(message.whitelistAllowedServers);
    }
    writer.uint32(34).fork();
    for (const v of message.allowedServers) {
      writer.int64(v);
    }
    writer.ldelim();
    if (message.LobbyOwnershipClaim !== undefined) {
      Int64Value.encode({ value: message.LobbyOwnershipClaim! }, writer.uint32(42).fork()).ldelim();
    }
    if (message.FirstSeen !== undefined) {
      Timestamp.encode(toTimestamp(message.FirstSeen), writer.uint32(50).fork()).ldelim();
    }
    if (message.LastUpdated !== undefined) {
      Timestamp.encode(toTimestamp(message.LastUpdated), writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SkribblLobbyTypoSettingsMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSkribblLobbyTypoSettingsMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.lobbyId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.whitelistAllowedServers = reader.bool();
          continue;
        case 4:
          if (tag === 32) {
            message.allowedServers.push(reader.int64() as Long);

            continue;
          }

          if (tag === 34) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.allowedServers.push(reader.int64() as Long);
            }

            continue;
          }

          break;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.LobbyOwnershipClaim = Int64Value.decode(reader, reader.uint32()).value;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.FirstSeen = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.LastUpdated = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SkribblLobbyTypoSettingsMessage {
    return {
      lobbyId: isSet(object.lobbyId) ? globalThis.String(object.lobbyId) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      whitelistAllowedServers: isSet(object.whitelistAllowedServers)
        ? globalThis.Boolean(object.whitelistAllowedServers)
        : false,
      allowedServers: globalThis.Array.isArray(object?.allowedServers)
        ? object.allowedServers.map((e: any) => Long.fromValue(e))
        : [],
      LobbyOwnershipClaim: isSet(object.LobbyOwnershipClaim) ? Long.fromValue(object.LobbyOwnershipClaim) : undefined,
      FirstSeen: isSet(object.FirstSeen) ? fromJsonTimestamp(object.FirstSeen) : undefined,
      LastUpdated: isSet(object.LastUpdated) ? fromJsonTimestamp(object.LastUpdated) : undefined,
    };
  },

  toJSON(message: SkribblLobbyTypoSettingsMessage): unknown {
    const obj: any = {};
    if (message.lobbyId !== "") {
      obj.lobbyId = message.lobbyId;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.whitelistAllowedServers === true) {
      obj.whitelistAllowedServers = message.whitelistAllowedServers;
    }
    if (message.allowedServers?.length) {
      obj.allowedServers = message.allowedServers.map((e) => (e || Long.ZERO).toString());
    }
    if (message.LobbyOwnershipClaim !== undefined) {
      obj.LobbyOwnershipClaim = message.LobbyOwnershipClaim;
    }
    if (message.FirstSeen !== undefined) {
      obj.FirstSeen = message.FirstSeen.toISOString();
    }
    if (message.LastUpdated !== undefined) {
      obj.LastUpdated = message.LastUpdated.toISOString();
    }
    return obj;
  },
};

function createBaseEncryptedLobbyLinkTokenMessage(): EncryptedLobbyLinkTokenMessage {
  return { token: "" };
}

export const EncryptedLobbyLinkTokenMessage = {
  encode(message: EncryptedLobbyLinkTokenMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EncryptedLobbyLinkTokenMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEncryptedLobbyLinkTokenMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EncryptedLobbyLinkTokenMessage {
    return { token: isSet(object.token) ? globalThis.String(object.token) : "" };
  },

  toJSON(message: EncryptedLobbyLinkTokenMessage): unknown {
    const obj: any = {};
    if (message.token !== "") {
      obj.token = message.token;
    }
    return obj;
  },
};

function createBasePlainLobbyLinkMessage(): PlainLobbyLinkMessage {
  return { link: "", guildId: Long.ZERO };
}

export const PlainLobbyLinkMessage = {
  encode(message: PlainLobbyLinkMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.link !== "") {
      writer.uint32(10).string(message.link);
    }
    if (!message.guildId.isZero()) {
      writer.uint32(16).int64(message.guildId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlainLobbyLinkMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlainLobbyLinkMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.link = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.guildId = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PlainLobbyLinkMessage {
    return {
      link: isSet(object.link) ? globalThis.String(object.link) : "",
      guildId: isSet(object.guildId) ? Long.fromValue(object.guildId) : Long.ZERO,
    };
  },

  toJSON(message: PlainLobbyLinkMessage): unknown {
    const obj: any = {};
    if (message.link !== "") {
      obj.link = message.link;
    }
    if (!message.guildId.isZero()) {
      obj.guildId = (message.guildId || Long.ZERO).toString();
    }
    return obj;
  },
};

function createBaseSetGuildLobbyLinksMessage(): SetGuildLobbyLinksMessage {
  return { guildId: Long.ZERO, links: [] };
}

export const SetGuildLobbyLinksMessage = {
  encode(message: SetGuildLobbyLinksMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.guildId.isZero()) {
      writer.uint32(8).int64(message.guildId);
    }
    for (const v of message.links) {
      GuildLobbyLinkMessage.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetGuildLobbyLinksMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetGuildLobbyLinksMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.guildId = reader.int64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.links.push(GuildLobbyLinkMessage.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SetGuildLobbyLinksMessage {
    return {
      guildId: isSet(object.guildId) ? Long.fromValue(object.guildId) : Long.ZERO,
      links: globalThis.Array.isArray(object?.links)
        ? object.links.map((e: any) => GuildLobbyLinkMessage.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SetGuildLobbyLinksMessage): unknown {
    const obj: any = {};
    if (!message.guildId.isZero()) {
      obj.guildId = (message.guildId || Long.ZERO).toString();
    }
    if (message.links?.length) {
      obj.links = message.links.map((e) => GuildLobbyLinkMessage.toJSON(e));
    }
    return obj;
  },
};

function createBaseGuildLobbyLinkMessage(): GuildLobbyLinkMessage {
  return { guildId: Long.ZERO, login: 0, link: "", slotAvailable: false, username: "" };
}

export const GuildLobbyLinkMessage = {
  encode(message: GuildLobbyLinkMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.guildId.isZero()) {
      writer.uint32(8).int64(message.guildId);
    }
    if (message.login !== 0) {
      writer.uint32(16).int32(message.login);
    }
    if (message.link !== "") {
      writer.uint32(26).string(message.link);
    }
    if (message.slotAvailable === true) {
      writer.uint32(32).bool(message.slotAvailable);
    }
    if (message.username !== "") {
      writer.uint32(42).string(message.username);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GuildLobbyLinkMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGuildLobbyLinkMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.guildId = reader.int64() as Long;
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

          message.link = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.slotAvailable = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.username = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GuildLobbyLinkMessage {
    return {
      guildId: isSet(object.guildId) ? Long.fromValue(object.guildId) : Long.ZERO,
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      link: isSet(object.link) ? globalThis.String(object.link) : "",
      slotAvailable: isSet(object.slotAvailable) ? globalThis.Boolean(object.slotAvailable) : false,
      username: isSet(object.username) ? globalThis.String(object.username) : "",
    };
  },

  toJSON(message: GuildLobbyLinkMessage): unknown {
    const obj: any = {};
    if (!message.guildId.isZero()) {
      obj.guildId = (message.guildId || Long.ZERO).toString();
    }
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.link !== "") {
      obj.link = message.link;
    }
    if (message.slotAvailable === true) {
      obj.slotAvailable = message.slotAvailable;
    }
    if (message.username !== "") {
      obj.username = message.username;
    }
    return obj;
  },
};

function createBaseGetLobbyDropClaimsRequest(): GetLobbyDropClaimsRequest {
  return { lobbyKey: "" };
}

export const GetLobbyDropClaimsRequest = {
  encode(message: GetLobbyDropClaimsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lobbyKey !== "") {
      writer.uint32(10).string(message.lobbyKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetLobbyDropClaimsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLobbyDropClaimsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.lobbyKey = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetLobbyDropClaimsRequest {
    return { lobbyKey: isSet(object.lobbyKey) ? globalThis.String(object.lobbyKey) : "" };
  },

  toJSON(message: GetLobbyDropClaimsRequest): unknown {
    const obj: any = {};
    if (message.lobbyKey !== "") {
      obj.lobbyKey = message.lobbyKey;
    }
    return obj;
  },
};

function createBaseDropLogReply(): DropLogReply {
  return {
    id: Long.ZERO,
    lobbyKey: "",
    claimDiscordId: Long.ZERO,
    validFrom: "",
    eventDropId: undefined,
    leagueTime: undefined,
  };
}

export const DropLogReply = {
  encode(message: DropLogReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).int64(message.id);
    }
    if (message.lobbyKey !== "") {
      writer.uint32(18).string(message.lobbyKey);
    }
    if (!message.claimDiscordId.isZero()) {
      writer.uint32(24).int64(message.claimDiscordId);
    }
    if (message.validFrom !== "") {
      writer.uint32(34).string(message.validFrom);
    }
    if (message.eventDropId !== undefined) {
      Int32Value.encode({ value: message.eventDropId! }, writer.uint32(42).fork()).ldelim();
    }
    if (message.leagueTime !== undefined) {
      Int32Value.encode({ value: message.leagueTime! }, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DropLogReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDropLogReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.lobbyKey = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.claimDiscordId = reader.int64() as Long;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.validFrom = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.eventDropId = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.leagueTime = Int32Value.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DropLogReply {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.ZERO,
      lobbyKey: isSet(object.lobbyKey) ? globalThis.String(object.lobbyKey) : "",
      claimDiscordId: isSet(object.claimDiscordId) ? Long.fromValue(object.claimDiscordId) : Long.ZERO,
      validFrom: isSet(object.validFrom) ? globalThis.String(object.validFrom) : "",
      eventDropId: isSet(object.eventDropId) ? Number(object.eventDropId) : undefined,
      leagueTime: isSet(object.leagueTime) ? Number(object.leagueTime) : undefined,
    };
  },

  toJSON(message: DropLogReply): unknown {
    const obj: any = {};
    if (!message.id.isZero()) {
      obj.id = (message.id || Long.ZERO).toString();
    }
    if (message.lobbyKey !== "") {
      obj.lobbyKey = message.lobbyKey;
    }
    if (!message.claimDiscordId.isZero()) {
      obj.claimDiscordId = (message.claimDiscordId || Long.ZERO).toString();
    }
    if (message.validFrom !== "") {
      obj.validFrom = message.validFrom;
    }
    if (message.eventDropId !== undefined) {
      obj.eventDropId = message.eventDropId;
    }
    if (message.leagueTime !== undefined) {
      obj.leagueTime = message.leagueTime;
    }
    return obj;
  },
};

/** Service definition for lobby resource access */
export type LobbiesDefinition = typeof LobbiesDefinition;
export const LobbiesDefinition = {
  name: "Lobbies",
  fullName: "lobbies.Lobbies",
  methods: {
    /** Gets all drop  claims that have happened in a lobby */
    getLobbyDropClaims: {
      name: "GetLobbyDropClaims",
      requestType: GetLobbyDropClaimsRequest,
      requestStream: false,
      responseType: DropLogReply,
      responseStream: true,
      options: {},
    },
    decryptLobbyLinkToken: {
      name: "DecryptLobbyLinkToken",
      requestType: EncryptedLobbyLinkTokenMessage,
      requestStream: false,
      responseType: PlainLobbyLinkMessage,
      responseStream: false,
      options: {},
    },
    encryptLobbyLinkToken: {
      name: "EncryptLobbyLinkToken",
      requestType: PlainLobbyLinkMessage,
      requestStream: false,
      responseType: EncryptedLobbyLinkTokenMessage,
      responseStream: false,
      options: {},
    },
    /** Get a skribbl lobby from the db, if lobby is expired or not existing, new is created */
    getSkribblLobbyTypoSettings: {
      name: "GetSkribblLobbyTypoSettings",
      requestType: SkribblLobbyIdentificationMessage,
      requestStream: false,
      responseType: SkribblLobbyTypoSettingsMessage,
      responseStream: false,
      options: {},
    },
    /** Updates the typo settings of a saved skribbl lobby */
    setSkribblLobbyTypoSettings: {
      name: "SetSkribblLobbyTypoSettings",
      requestType: SkribblLobbyTypoSettingsMessage,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** Sets the status of players in a lobby */
    setMemberStatusesInLobby: {
      name: "SetMemberStatusesInLobby",
      requestType: SkribblLobbyTypoMembersMessage,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** remove the statuses of players in a lobby */
    removeMemberStatusesInLobby: {
      name: "RemoveMemberStatusesInLobby",
      requestType: SkribblLobbyTypoMembersMessage,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** Sets the lobby state of a skribbl lobby */
    setSkribblLobbyState: {
      name: "SetSkribblLobbyState",
      requestType: SkribblLobbyStateMessage,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** get online players of a guild */
    getOnlineLobbyPlayers: {
      name: "GetOnlineLobbyPlayers",
      requestType: GetOnlinePlayersRequest,
      requestStream: false,
      responseType: SkribblLobbyTypoMembersMessage,
      responseStream: true,
      options: {},
    },
    getLobbyById: {
      name: "GetLobbyById",
      requestType: GetLobbyByIdRequest,
      requestStream: false,
      responseType: SkribblLobbyMessage,
      responseStream: false,
      options: {},
    },
    getLobbiesById: {
      name: "GetLobbiesById",
      requestType: GetLobbiesByIdRequest,
      requestStream: false,
      responseType: SkribblLobbyMessage,
      responseStream: true,
      options: {},
    },
    clearOrphanedLobbyData: {
      name: "ClearOrphanedLobbyData",
      requestType: Empty,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface LobbiesServiceImplementation<CallContextExt = {}> {
  /** Gets all drop  claims that have happened in a lobby */
  getLobbyDropClaims(
    request: GetLobbyDropClaimsRequest,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<DropLogReply>;
  decryptLobbyLinkToken(
    request: EncryptedLobbyLinkTokenMessage,
    context: CallContext & CallContextExt,
  ): Promise<PlainLobbyLinkMessage>;
  encryptLobbyLinkToken(
    request: PlainLobbyLinkMessage,
    context: CallContext & CallContextExt,
  ): Promise<EncryptedLobbyLinkTokenMessage>;
  /** Get a skribbl lobby from the db, if lobby is expired or not existing, new is created */
  getSkribblLobbyTypoSettings(
    request: SkribblLobbyIdentificationMessage,
    context: CallContext & CallContextExt,
  ): Promise<SkribblLobbyTypoSettingsMessage>;
  /** Updates the typo settings of a saved skribbl lobby */
  setSkribblLobbyTypoSettings(
    request: SkribblLobbyTypoSettingsMessage,
    context: CallContext & CallContextExt,
  ): Promise<Empty>;
  /** Sets the status of players in a lobby */
  setMemberStatusesInLobby(
    request: SkribblLobbyTypoMembersMessage,
    context: CallContext & CallContextExt,
  ): Promise<Empty>;
  /** remove the statuses of players in a lobby */
  removeMemberStatusesInLobby(
    request: SkribblLobbyTypoMembersMessage,
    context: CallContext & CallContextExt,
  ): Promise<Empty>;
  /** Sets the lobby state of a skribbl lobby */
  setSkribblLobbyState(request: SkribblLobbyStateMessage, context: CallContext & CallContextExt): Promise<Empty>;
  /** get online players of a guild */
  getOnlineLobbyPlayers(
    request: GetOnlinePlayersRequest,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<SkribblLobbyTypoMembersMessage>;
  getLobbyById(request: GetLobbyByIdRequest, context: CallContext & CallContextExt): Promise<SkribblLobbyMessage>;
  getLobbiesById(
    request: GetLobbiesByIdRequest,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<SkribblLobbyMessage>;
  clearOrphanedLobbyData(request: Empty, context: CallContext & CallContextExt): Promise<Empty>;
}

export interface LobbiesClient<CallOptionsExt = {}> {
  /** Gets all drop  claims that have happened in a lobby */
  getLobbyDropClaims(
    request: GetLobbyDropClaimsRequest,
    options?: CallOptions & CallOptionsExt,
  ): AsyncIterable<DropLogReply>;
  decryptLobbyLinkToken(
    request: EncryptedLobbyLinkTokenMessage,
    options?: CallOptions & CallOptionsExt,
  ): Promise<PlainLobbyLinkMessage>;
  encryptLobbyLinkToken(
    request: PlainLobbyLinkMessage,
    options?: CallOptions & CallOptionsExt,
  ): Promise<EncryptedLobbyLinkTokenMessage>;
  /** Get a skribbl lobby from the db, if lobby is expired or not existing, new is created */
  getSkribblLobbyTypoSettings(
    request: SkribblLobbyIdentificationMessage,
    options?: CallOptions & CallOptionsExt,
  ): Promise<SkribblLobbyTypoSettingsMessage>;
  /** Updates the typo settings of a saved skribbl lobby */
  setSkribblLobbyTypoSettings(
    request: SkribblLobbyTypoSettingsMessage,
    options?: CallOptions & CallOptionsExt,
  ): Promise<Empty>;
  /** Sets the status of players in a lobby */
  setMemberStatusesInLobby(
    request: SkribblLobbyTypoMembersMessage,
    options?: CallOptions & CallOptionsExt,
  ): Promise<Empty>;
  /** remove the statuses of players in a lobby */
  removeMemberStatusesInLobby(
    request: SkribblLobbyTypoMembersMessage,
    options?: CallOptions & CallOptionsExt,
  ): Promise<Empty>;
  /** Sets the lobby state of a skribbl lobby */
  setSkribblLobbyState(request: SkribblLobbyStateMessage, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  /** get online players of a guild */
  getOnlineLobbyPlayers(
    request: GetOnlinePlayersRequest,
    options?: CallOptions & CallOptionsExt,
  ): AsyncIterable<SkribblLobbyTypoMembersMessage>;
  getLobbyById(request: GetLobbyByIdRequest, options?: CallOptions & CallOptionsExt): Promise<SkribblLobbyMessage>;
  getLobbiesById(
    request: GetLobbiesByIdRequest,
    options?: CallOptions & CallOptionsExt,
  ): AsyncIterable<SkribblLobbyMessage>;
  clearOrphanedLobbyData(request: Empty, options?: CallOptions & CallOptionsExt): Promise<Empty>;
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
