/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import Long = require("long");
import * as _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";
import { Int32Value, StringValue } from "./google/protobuf/wrappers";
import { SpriteSlotConfigurationReply } from "./inventory";

export const protobufPackage = "lobbies";

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

/** Container for palantir lobby details, containing palantir relevant details */
export interface PalantirLobbyDetails {
  description: string;
  key: string;
  id: string;
  restriction: string;
}

/** Container for skribbl lobby details, containing skribbl relevant details */
export interface SkribblLobbyDetails {
  language: string;
  link: string;
  private: boolean;
  round: number;
  players: SkribblLobbyPlayer[];
}

/** Container for a palantir lobby player, containing palantir relevant details */
export interface PalantirLobbyPlayer {
  name: string;
  login: number;
  username: string;
  lobbyPlayerId: number | undefined;
}

/** Container for a skribbl lobby player, containing skribbl relevant details */
export interface SkribblLobbyPlayer {
  name: string;
  score: number;
  drawing: boolean;
  lobbyPlayerId: number;
}

export interface GetLobbyDropClaimsRequest {
  lobbyKey: string;
}

/** Response containing a lobby's properties. */
export interface LobbyReply {
  skribblDetails: SkribblLobbyDetails | undefined;
  palantirDetails: PalantirLobbyDetails | undefined;
  players: PalantirLobbyPlayer[];
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

export interface JoinedLobbyMessage {
  lobbyPlayerId: number;
  lobby: PalantirLobbyDetails | undefined;
}

export interface OnlineMemberReply {
  login: number;
  bubbles: number;
  patronEmoji: string | undefined;
  joinedLobbies: JoinedLobbyMessage[];
  spriteSlots: SpriteSlotConfigurationReply[];
  sceneId: number | undefined;
  sceneShift: number | undefined;
}

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

function createBasePalantirLobbyDetails(): PalantirLobbyDetails {
  return { description: "", key: "", id: "", restriction: "" };
}

export const PalantirLobbyDetails = {
  encode(message: PalantirLobbyDetails, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.description !== "") {
      writer.uint32(10).string(message.description);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    if (message.id !== "") {
      writer.uint32(26).string(message.id);
    }
    if (message.restriction !== "") {
      writer.uint32(34).string(message.restriction);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PalantirLobbyDetails {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePalantirLobbyDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.description = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.key = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.id = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.restriction = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PalantirLobbyDetails {
    return {
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      restriction: isSet(object.restriction) ? globalThis.String(object.restriction) : "",
    };
  },

  toJSON(message: PalantirLobbyDetails): unknown {
    const obj: any = {};
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.restriction !== "") {
      obj.restriction = message.restriction;
    }
    return obj;
  },
};

function createBaseSkribblLobbyDetails(): SkribblLobbyDetails {
  return { language: "", link: "", private: false, round: 0, players: [] };
}

export const SkribblLobbyDetails = {
  encode(message: SkribblLobbyDetails, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.language !== "") {
      writer.uint32(10).string(message.language);
    }
    if (message.link !== "") {
      writer.uint32(18).string(message.link);
    }
    if (message.private === true) {
      writer.uint32(24).bool(message.private);
    }
    if (message.round !== 0) {
      writer.uint32(32).int32(message.round);
    }
    for (const v of message.players) {
      SkribblLobbyPlayer.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SkribblLobbyDetails {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSkribblLobbyDetails();
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
          if (tag !== 18) {
            break;
          }

          message.link = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.private = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.round = reader.int32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.players.push(SkribblLobbyPlayer.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SkribblLobbyDetails {
    return {
      language: isSet(object.language) ? globalThis.String(object.language) : "",
      link: isSet(object.link) ? globalThis.String(object.link) : "",
      private: isSet(object.private) ? globalThis.Boolean(object.private) : false,
      round: isSet(object.round) ? globalThis.Number(object.round) : 0,
      players: globalThis.Array.isArray(object?.players)
        ? object.players.map((e: any) => SkribblLobbyPlayer.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SkribblLobbyDetails): unknown {
    const obj: any = {};
    if (message.language !== "") {
      obj.language = message.language;
    }
    if (message.link !== "") {
      obj.link = message.link;
    }
    if (message.private === true) {
      obj.private = message.private;
    }
    if (message.round !== 0) {
      obj.round = Math.round(message.round);
    }
    if (message.players?.length) {
      obj.players = message.players.map((e) => SkribblLobbyPlayer.toJSON(e));
    }
    return obj;
  },
};

function createBasePalantirLobbyPlayer(): PalantirLobbyPlayer {
  return { name: "", login: 0, username: "", lobbyPlayerId: undefined };
}

export const PalantirLobbyPlayer = {
  encode(message: PalantirLobbyPlayer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.login !== 0) {
      writer.uint32(16).int32(message.login);
    }
    if (message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    if (message.lobbyPlayerId !== undefined) {
      Int32Value.encode({ value: message.lobbyPlayerId! }, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PalantirLobbyPlayer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePalantirLobbyPlayer();
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

          message.login = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.username = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.lobbyPlayerId = Int32Value.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PalantirLobbyPlayer {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      lobbyPlayerId: isSet(object.lobbyPlayerId) ? Number(object.lobbyPlayerId) : undefined,
    };
  },

  toJSON(message: PalantirLobbyPlayer): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.lobbyPlayerId !== undefined) {
      obj.lobbyPlayerId = message.lobbyPlayerId;
    }
    return obj;
  },
};

function createBaseSkribblLobbyPlayer(): SkribblLobbyPlayer {
  return { name: "", score: 0, drawing: false, lobbyPlayerId: 0 };
}

export const SkribblLobbyPlayer = {
  encode(message: SkribblLobbyPlayer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.score !== 0) {
      writer.uint32(16).int32(message.score);
    }
    if (message.drawing === true) {
      writer.uint32(24).bool(message.drawing);
    }
    if (message.lobbyPlayerId !== 0) {
      writer.uint32(32).int32(message.lobbyPlayerId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SkribblLobbyPlayer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSkribblLobbyPlayer();
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

          message.score = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.drawing = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
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

  fromJSON(object: any): SkribblLobbyPlayer {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      score: isSet(object.score) ? globalThis.Number(object.score) : 0,
      drawing: isSet(object.drawing) ? globalThis.Boolean(object.drawing) : false,
      lobbyPlayerId: isSet(object.lobbyPlayerId) ? globalThis.Number(object.lobbyPlayerId) : 0,
    };
  },

  toJSON(message: SkribblLobbyPlayer): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.score !== 0) {
      obj.score = Math.round(message.score);
    }
    if (message.drawing === true) {
      obj.drawing = message.drawing;
    }
    if (message.lobbyPlayerId !== 0) {
      obj.lobbyPlayerId = Math.round(message.lobbyPlayerId);
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

function createBaseLobbyReply(): LobbyReply {
  return { skribblDetails: undefined, palantirDetails: undefined, players: [] };
}

export const LobbyReply = {
  encode(message: LobbyReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.skribblDetails !== undefined) {
      SkribblLobbyDetails.encode(message.skribblDetails, writer.uint32(10).fork()).ldelim();
    }
    if (message.palantirDetails !== undefined) {
      PalantirLobbyDetails.encode(message.palantirDetails, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.players) {
      PalantirLobbyPlayer.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LobbyReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLobbyReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.skribblDetails = SkribblLobbyDetails.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.palantirDetails = PalantirLobbyDetails.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.players.push(PalantirLobbyPlayer.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LobbyReply {
    return {
      skribblDetails: isSet(object.skribblDetails) ? SkribblLobbyDetails.fromJSON(object.skribblDetails) : undefined,
      palantirDetails: isSet(object.palantirDetails)
        ? PalantirLobbyDetails.fromJSON(object.palantirDetails)
        : undefined,
      players: globalThis.Array.isArray(object?.players)
        ? object.players.map((e: any) => PalantirLobbyPlayer.fromJSON(e))
        : [],
    };
  },

  toJSON(message: LobbyReply): unknown {
    const obj: any = {};
    if (message.skribblDetails !== undefined) {
      obj.skribblDetails = SkribblLobbyDetails.toJSON(message.skribblDetails);
    }
    if (message.palantirDetails !== undefined) {
      obj.palantirDetails = PalantirLobbyDetails.toJSON(message.palantirDetails);
    }
    if (message.players?.length) {
      obj.players = message.players.map((e) => PalantirLobbyPlayer.toJSON(e));
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

function createBaseJoinedLobbyMessage(): JoinedLobbyMessage {
  return { lobbyPlayerId: 0, lobby: undefined };
}

export const JoinedLobbyMessage = {
  encode(message: JoinedLobbyMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lobbyPlayerId !== 0) {
      writer.uint32(8).int32(message.lobbyPlayerId);
    }
    if (message.lobby !== undefined) {
      PalantirLobbyDetails.encode(message.lobby, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JoinedLobbyMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJoinedLobbyMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.lobbyPlayerId = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.lobby = PalantirLobbyDetails.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JoinedLobbyMessage {
    return {
      lobbyPlayerId: isSet(object.lobbyPlayerId) ? globalThis.Number(object.lobbyPlayerId) : 0,
      lobby: isSet(object.lobby) ? PalantirLobbyDetails.fromJSON(object.lobby) : undefined,
    };
  },

  toJSON(message: JoinedLobbyMessage): unknown {
    const obj: any = {};
    if (message.lobbyPlayerId !== 0) {
      obj.lobbyPlayerId = Math.round(message.lobbyPlayerId);
    }
    if (message.lobby !== undefined) {
      obj.lobby = PalantirLobbyDetails.toJSON(message.lobby);
    }
    return obj;
  },
};

function createBaseOnlineMemberReply(): OnlineMemberReply {
  return {
    login: 0,
    bubbles: 0,
    patronEmoji: undefined,
    joinedLobbies: [],
    spriteSlots: [],
    sceneId: undefined,
    sceneShift: undefined,
  };
}

export const OnlineMemberReply = {
  encode(message: OnlineMemberReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (message.bubbles !== 0) {
      writer.uint32(16).int32(message.bubbles);
    }
    if (message.patronEmoji !== undefined) {
      StringValue.encode({ value: message.patronEmoji! }, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.joinedLobbies) {
      JoinedLobbyMessage.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.spriteSlots) {
      SpriteSlotConfigurationReply.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.sceneId !== undefined) {
      Int32Value.encode({ value: message.sceneId! }, writer.uint32(50).fork()).ldelim();
    }
    if (message.sceneShift !== undefined) {
      Int32Value.encode({ value: message.sceneShift! }, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OnlineMemberReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOnlineMemberReply();
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

          message.bubbles = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.patronEmoji = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.joinedLobbies.push(JoinedLobbyMessage.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.spriteSlots.push(SpriteSlotConfigurationReply.decode(reader, reader.uint32()));
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OnlineMemberReply {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      bubbles: isSet(object.bubbles) ? globalThis.Number(object.bubbles) : 0,
      patronEmoji: isSet(object.patronEmoji) ? String(object.patronEmoji) : undefined,
      joinedLobbies: globalThis.Array.isArray(object?.joinedLobbies)
        ? object.joinedLobbies.map((e: any) => JoinedLobbyMessage.fromJSON(e))
        : [],
      spriteSlots: globalThis.Array.isArray(object?.spriteSlots)
        ? object.spriteSlots.map((e: any) => SpriteSlotConfigurationReply.fromJSON(e))
        : [],
      sceneId: isSet(object.sceneId) ? Number(object.sceneId) : undefined,
      sceneShift: isSet(object.sceneShift) ? Number(object.sceneShift) : undefined,
    };
  },

  toJSON(message: OnlineMemberReply): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.bubbles !== 0) {
      obj.bubbles = Math.round(message.bubbles);
    }
    if (message.patronEmoji !== undefined) {
      obj.patronEmoji = message.patronEmoji;
    }
    if (message.joinedLobbies?.length) {
      obj.joinedLobbies = message.joinedLobbies.map((e) => JoinedLobbyMessage.toJSON(e));
    }
    if (message.spriteSlots?.length) {
      obj.spriteSlots = message.spriteSlots.map((e) => SpriteSlotConfigurationReply.toJSON(e));
    }
    if (message.sceneId !== undefined) {
      obj.sceneId = message.sceneId;
    }
    if (message.sceneShift !== undefined) {
      obj.sceneShift = message.sceneShift;
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
    /** Gets all current lobbies */
    getCurrentLobbies: {
      name: "GetCurrentLobbies",
      requestType: Empty,
      requestStream: false,
      responseType: LobbyReply,
      responseStream: true,
      options: {},
    },
    /** Gets all drop  claims that have happened in a lobby */
    getLobbyDropClaims: {
      name: "GetLobbyDropClaims",
      requestType: GetLobbyDropClaimsRequest,
      requestStream: false,
      responseType: DropLogReply,
      responseStream: true,
      options: {},
    },
    /** Gets all currently playing member's details */
    getOnlinePlayers: {
      name: "GetOnlinePlayers",
      requestType: Empty,
      requestStream: false,
      responseType: OnlineMemberReply,
      responseStream: true,
      options: {},
    },
    setGuildLobbyLinks: {
      name: "SetGuildLobbyLinks",
      requestType: SetGuildLobbyLinksMessage,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    getLobbyLinks: {
      name: "GetLobbyLinks",
      requestType: Empty,
      requestStream: false,
      responseType: GuildLobbyLinkMessage,
      responseStream: true,
      options: {},
    },
  },
} as const;

export interface LobbiesServiceImplementation<CallContextExt = {}> {
  /** Gets all current lobbies */
  getCurrentLobbies(request: Empty, context: CallContext & CallContextExt): ServerStreamingMethodResult<LobbyReply>;
  /** Gets all drop  claims that have happened in a lobby */
  getLobbyDropClaims(
    request: GetLobbyDropClaimsRequest,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<DropLogReply>;
  /** Gets all currently playing member's details */
  getOnlinePlayers(
    request: Empty,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<OnlineMemberReply>;
  setGuildLobbyLinks(request: SetGuildLobbyLinksMessage, context: CallContext & CallContextExt): Promise<Empty>;
  getLobbyLinks(
    request: Empty,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<GuildLobbyLinkMessage>;
}

export interface LobbiesClient<CallOptionsExt = {}> {
  /** Gets all current lobbies */
  getCurrentLobbies(request: Empty, options?: CallOptions & CallOptionsExt): AsyncIterable<LobbyReply>;
  /** Gets all drop  claims that have happened in a lobby */
  getLobbyDropClaims(
    request: GetLobbyDropClaimsRequest,
    options?: CallOptions & CallOptionsExt,
  ): AsyncIterable<DropLogReply>;
  /** Gets all currently playing member's details */
  getOnlinePlayers(request: Empty, options?: CallOptions & CallOptionsExt): AsyncIterable<OnlineMemberReply>;
  setGuildLobbyLinks(request: SetGuildLobbyLinksMessage, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  getLobbyLinks(request: Empty, options?: CallOptions & CallOptionsExt): AsyncIterable<GuildLobbyLinkMessage>;
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export type ServerStreamingMethodResult<Response> = { [Symbol.asyncIterator](): AsyncIterator<Response, void> };
