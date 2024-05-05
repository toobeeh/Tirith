/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import { AwardRarityMessage, awardRarityMessageFromJSON, awardRarityMessageToJSON, AwardReply } from "./awards";
import Long = require("long");
import * as _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";
import { Timestamp } from "./google/protobuf/timestamp";
import { Int32Value, Int64Value, StringValue } from "./google/protobuf/wrappers";

export const protobufPackage = "inventory";

export interface GetEventProgressRequest {
  login: number;
  /** null if for all events */
  eventId: number | undefined;
}

export interface EventDropProgressMessage {
  eventDropId: number;
  value: number;
}

export interface EventProgressMessage {
  totalCollected: number;
  eventDropProgress: EventDropProgressMessage[];
}

export interface SetPatronEmojiMessage {
  login: number;
  emoji: string | undefined;
}

export interface PatronizeMemberMessage {
  login: number;
  patronizedDiscordId: Long | undefined;
}

export interface GetGiftLossRateMessage {
  login: number;
  eventId: number;
}

export interface GiftEventCreditMessage {
  amount: number;
  recipientLogin: number;
  senderLogin: number;
  eventDropId: number;
}

export interface GiftLossRateMessage {
  lossRateBase: number;
  collectedDrops: number;
  requiredDrops: number;
}

export interface GiftLossMessage {
  lostAmount: number;
  totalAmount: number;
  lossRate: GiftLossRateMessage | undefined;
}

export interface GetFirstSeenDateRequest {
  login: number;
}

export interface FirstSeenMessage {
  firstSeen: Date | undefined;
}

export interface GetAwardInventoryMessage {
  login: number;
}

export interface ConsumedAwardMessage {
  awardId: number;
  ownerLogin: number;
  awardeeLogin: number;
  awardedTimestamp: Date | undefined;
  linkedImageId: Long | undefined;
}

export interface AvailableAwardMessage {
  awardId: number;
}

export interface AwardInventoryMessage {
  availableAwards: AvailableAwardMessage[];
  receivedAwards: ConsumedAwardMessage[];
  givenAwards: ConsumedAwardMessage[];
}

export interface GetAwardPackLevelMessage {
  login: number;
}

export interface AwardPackLevelMessage {
  level: AwardRarityMessage;
  collectedBubbles: number;
}

export interface GetBubbleCreditRequest {
  login: number;
}

export interface GetGalleryItemsMessage {
  login: number;
  imageIds: Long[];
}

export interface GalleryItemMessage {
  imageId: Long;
  imageUrl: string;
  title: string;
  author: string;
  date: Date | undefined;
  language: string;
  isOwn: boolean;
  inPrivateLobby: boolean;
}

export interface OpenAwardPackMessage {
  login: number;
}

export interface AwardPackResultMessage {
  awards: AwardReply[];
}

export interface BubbleCreditReply {
  /** credit that is the sum of collected bubbles plus worth of drops */
  totalCredit: number;
  /** part of total credit that is available to get spent */
  availableCredit: number;
  /** the part of total credit that has been gained through playtime */
  bubblesAmount: number;
}

export interface GetDropCreditRequest {
  login: number;
}

export interface DropCreditReply {
  /** the total credit of drops, made up of legacy drops and weighted league drops */
  credit: number;
  /** the count of caught drops; made up of legacy count and league drop count */
  count: number;
}

export interface BuySpriteRequest {
  login: number;
  spriteId: number;
}

export interface SpriteSlotConfigurationRequest {
  slotId: number;
  spriteId: number | undefined;
}

export interface UseSpriteComboRequest {
  login: number;
  clearOtherSlots: boolean;
  combo: SpriteSlotConfigurationRequest[];
}

export interface SpriteColorConfigurationRequest {
  spriteId: number;
  colorShift: number | undefined;
}

export interface SetSpriteColorRequest {
  login: number;
  clearOtherConfigs: boolean;
  colorConfig: SpriteColorConfigurationRequest[];
}

export interface GetSpriteInventoryRequest {
  login: number;
}

export interface SpriteSlotConfigurationReply {
  slot: number;
  spriteId: number;
  colorShift: number | undefined;
}

export interface GetEventCreditRequest {
  login: number;
  eventId: number;
}

export interface EventCreditReply {
  totalCredit: number;
  availableCredit: number;
  eventDropId: number;
}

export interface GetSpriteSlotCountRequest {
  login: number;
}

export interface SpriteSlotCountReply {
  unlockedSlots: number;
}

export interface GetSceneInventoryRequest {
  login: number;
}

export interface SceneInventoryReply {
  activeId: number | undefined;
  sceneIds: number[];
}

export interface BuySceneRequest {
  login: number;
  sceneId: number;
}

export interface UseSceneRequest {
  login: number;
  sceneId: number | undefined;
}

export interface ScenePriceRequest {
  boughtSceneCount: number;
}

export interface ScenePriceReply {
  nextPrice: number;
  totalBubblesSpent: number;
}

function createBaseGetEventProgressRequest(): GetEventProgressRequest {
  return { login: 0, eventId: undefined };
}

export const GetEventProgressRequest = {
  encode(message: GetEventProgressRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (message.eventId !== undefined) {
      Int32Value.encode({ value: message.eventId! }, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetEventProgressRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetEventProgressRequest();
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

          message.eventId = Int32Value.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetEventProgressRequest {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      eventId: isSet(object.eventId) ? Number(object.eventId) : undefined,
    };
  },

  toJSON(message: GetEventProgressRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.eventId !== undefined) {
      obj.eventId = message.eventId;
    }
    return obj;
  },
};

function createBaseEventDropProgressMessage(): EventDropProgressMessage {
  return { eventDropId: 0, value: 0 };
}

export const EventDropProgressMessage = {
  encode(message: EventDropProgressMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.eventDropId !== 0) {
      writer.uint32(8).int32(message.eventDropId);
    }
    if (message.value !== 0) {
      writer.uint32(17).double(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventDropProgressMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventDropProgressMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.eventDropId = reader.int32();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.value = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventDropProgressMessage {
    return {
      eventDropId: isSet(object.eventDropId) ? globalThis.Number(object.eventDropId) : 0,
      value: isSet(object.value) ? globalThis.Number(object.value) : 0,
    };
  },

  toJSON(message: EventDropProgressMessage): unknown {
    const obj: any = {};
    if (message.eventDropId !== 0) {
      obj.eventDropId = Math.round(message.eventDropId);
    }
    if (message.value !== 0) {
      obj.value = message.value;
    }
    return obj;
  },
};

function createBaseEventProgressMessage(): EventProgressMessage {
  return { totalCollected: 0, eventDropProgress: [] };
}

export const EventProgressMessage = {
  encode(message: EventProgressMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.totalCollected !== 0) {
      writer.uint32(9).double(message.totalCollected);
    }
    for (const v of message.eventDropProgress) {
      EventDropProgressMessage.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventProgressMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventProgressMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.totalCollected = reader.double();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.eventDropProgress.push(EventDropProgressMessage.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventProgressMessage {
    return {
      totalCollected: isSet(object.totalCollected) ? globalThis.Number(object.totalCollected) : 0,
      eventDropProgress: globalThis.Array.isArray(object?.eventDropProgress)
        ? object.eventDropProgress.map((e: any) => EventDropProgressMessage.fromJSON(e))
        : [],
    };
  },

  toJSON(message: EventProgressMessage): unknown {
    const obj: any = {};
    if (message.totalCollected !== 0) {
      obj.totalCollected = message.totalCollected;
    }
    if (message.eventDropProgress?.length) {
      obj.eventDropProgress = message.eventDropProgress.map((e) => EventDropProgressMessage.toJSON(e));
    }
    return obj;
  },
};

function createBaseSetPatronEmojiMessage(): SetPatronEmojiMessage {
  return { login: 0, emoji: undefined };
}

export const SetPatronEmojiMessage = {
  encode(message: SetPatronEmojiMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (message.emoji !== undefined) {
      StringValue.encode({ value: message.emoji! }, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetPatronEmojiMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetPatronEmojiMessage();
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

          message.emoji = StringValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SetPatronEmojiMessage {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      emoji: isSet(object.emoji) ? String(object.emoji) : undefined,
    };
  },

  toJSON(message: SetPatronEmojiMessage): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.emoji !== undefined) {
      obj.emoji = message.emoji;
    }
    return obj;
  },
};

function createBasePatronizeMemberMessage(): PatronizeMemberMessage {
  return { login: 0, patronizedDiscordId: undefined };
}

export const PatronizeMemberMessage = {
  encode(message: PatronizeMemberMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (message.patronizedDiscordId !== undefined) {
      Int64Value.encode({ value: message.patronizedDiscordId! }, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PatronizeMemberMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePatronizeMemberMessage();
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

          message.patronizedDiscordId = Int64Value.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PatronizeMemberMessage {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      patronizedDiscordId: isSet(object.patronizedDiscordId) ? Long.fromValue(object.patronizedDiscordId) : undefined,
    };
  },

  toJSON(message: PatronizeMemberMessage): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.patronizedDiscordId !== undefined) {
      obj.patronizedDiscordId = message.patronizedDiscordId;
    }
    return obj;
  },
};

function createBaseGetGiftLossRateMessage(): GetGiftLossRateMessage {
  return { login: 0, eventId: 0 };
}

export const GetGiftLossRateMessage = {
  encode(message: GetGiftLossRateMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (message.eventId !== 0) {
      writer.uint32(16).int32(message.eventId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetGiftLossRateMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGiftLossRateMessage();
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

          message.eventId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetGiftLossRateMessage {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      eventId: isSet(object.eventId) ? globalThis.Number(object.eventId) : 0,
    };
  },

  toJSON(message: GetGiftLossRateMessage): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.eventId !== 0) {
      obj.eventId = Math.round(message.eventId);
    }
    return obj;
  },
};

function createBaseGiftEventCreditMessage(): GiftEventCreditMessage {
  return { amount: 0, recipientLogin: 0, senderLogin: 0, eventDropId: 0 };
}

export const GiftEventCreditMessage = {
  encode(message: GiftEventCreditMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amount !== 0) {
      writer.uint32(8).int32(message.amount);
    }
    if (message.recipientLogin !== 0) {
      writer.uint32(16).int32(message.recipientLogin);
    }
    if (message.senderLogin !== 0) {
      writer.uint32(24).int32(message.senderLogin);
    }
    if (message.eventDropId !== 0) {
      writer.uint32(32).int32(message.eventDropId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GiftEventCreditMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGiftEventCreditMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.amount = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.recipientLogin = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.senderLogin = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.eventDropId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GiftEventCreditMessage {
    return {
      amount: isSet(object.amount) ? globalThis.Number(object.amount) : 0,
      recipientLogin: isSet(object.recipientLogin) ? globalThis.Number(object.recipientLogin) : 0,
      senderLogin: isSet(object.senderLogin) ? globalThis.Number(object.senderLogin) : 0,
      eventDropId: isSet(object.eventDropId) ? globalThis.Number(object.eventDropId) : 0,
    };
  },

  toJSON(message: GiftEventCreditMessage): unknown {
    const obj: any = {};
    if (message.amount !== 0) {
      obj.amount = Math.round(message.amount);
    }
    if (message.recipientLogin !== 0) {
      obj.recipientLogin = Math.round(message.recipientLogin);
    }
    if (message.senderLogin !== 0) {
      obj.senderLogin = Math.round(message.senderLogin);
    }
    if (message.eventDropId !== 0) {
      obj.eventDropId = Math.round(message.eventDropId);
    }
    return obj;
  },
};

function createBaseGiftLossRateMessage(): GiftLossRateMessage {
  return { lossRateBase: 0, collectedDrops: 0, requiredDrops: 0 };
}

export const GiftLossRateMessage = {
  encode(message: GiftLossRateMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lossRateBase !== 0) {
      writer.uint32(9).double(message.lossRateBase);
    }
    if (message.collectedDrops !== 0) {
      writer.uint32(17).double(message.collectedDrops);
    }
    if (message.requiredDrops !== 0) {
      writer.uint32(24).int32(message.requiredDrops);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GiftLossRateMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGiftLossRateMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.lossRateBase = reader.double();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.collectedDrops = reader.double();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.requiredDrops = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GiftLossRateMessage {
    return {
      lossRateBase: isSet(object.lossRateBase) ? globalThis.Number(object.lossRateBase) : 0,
      collectedDrops: isSet(object.collectedDrops) ? globalThis.Number(object.collectedDrops) : 0,
      requiredDrops: isSet(object.requiredDrops) ? globalThis.Number(object.requiredDrops) : 0,
    };
  },

  toJSON(message: GiftLossRateMessage): unknown {
    const obj: any = {};
    if (message.lossRateBase !== 0) {
      obj.lossRateBase = message.lossRateBase;
    }
    if (message.collectedDrops !== 0) {
      obj.collectedDrops = message.collectedDrops;
    }
    if (message.requiredDrops !== 0) {
      obj.requiredDrops = Math.round(message.requiredDrops);
    }
    return obj;
  },
};

function createBaseGiftLossMessage(): GiftLossMessage {
  return { lostAmount: 0, totalAmount: 0, lossRate: undefined };
}

export const GiftLossMessage = {
  encode(message: GiftLossMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lostAmount !== 0) {
      writer.uint32(8).int32(message.lostAmount);
    }
    if (message.totalAmount !== 0) {
      writer.uint32(16).int32(message.totalAmount);
    }
    if (message.lossRate !== undefined) {
      GiftLossRateMessage.encode(message.lossRate, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GiftLossMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGiftLossMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.lostAmount = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.totalAmount = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.lossRate = GiftLossRateMessage.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GiftLossMessage {
    return {
      lostAmount: isSet(object.lostAmount) ? globalThis.Number(object.lostAmount) : 0,
      totalAmount: isSet(object.totalAmount) ? globalThis.Number(object.totalAmount) : 0,
      lossRate: isSet(object.lossRate) ? GiftLossRateMessage.fromJSON(object.lossRate) : undefined,
    };
  },

  toJSON(message: GiftLossMessage): unknown {
    const obj: any = {};
    if (message.lostAmount !== 0) {
      obj.lostAmount = Math.round(message.lostAmount);
    }
    if (message.totalAmount !== 0) {
      obj.totalAmount = Math.round(message.totalAmount);
    }
    if (message.lossRate !== undefined) {
      obj.lossRate = GiftLossRateMessage.toJSON(message.lossRate);
    }
    return obj;
  },
};

function createBaseGetFirstSeenDateRequest(): GetFirstSeenDateRequest {
  return { login: 0 };
}

export const GetFirstSeenDateRequest = {
  encode(message: GetFirstSeenDateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFirstSeenDateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFirstSeenDateRequest();
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

  fromJSON(object: any): GetFirstSeenDateRequest {
    return { login: isSet(object.login) ? globalThis.Number(object.login) : 0 };
  },

  toJSON(message: GetFirstSeenDateRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    return obj;
  },
};

function createBaseFirstSeenMessage(): FirstSeenMessage {
  return { firstSeen: undefined };
}

export const FirstSeenMessage = {
  encode(message: FirstSeenMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.firstSeen !== undefined) {
      Timestamp.encode(toTimestamp(message.firstSeen), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FirstSeenMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFirstSeenMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.firstSeen = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FirstSeenMessage {
    return { firstSeen: isSet(object.firstSeen) ? fromJsonTimestamp(object.firstSeen) : undefined };
  },

  toJSON(message: FirstSeenMessage): unknown {
    const obj: any = {};
    if (message.firstSeen !== undefined) {
      obj.firstSeen = message.firstSeen.toISOString();
    }
    return obj;
  },
};

function createBaseGetAwardInventoryMessage(): GetAwardInventoryMessage {
  return { login: 0 };
}

export const GetAwardInventoryMessage = {
  encode(message: GetAwardInventoryMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAwardInventoryMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAwardInventoryMessage();
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

  fromJSON(object: any): GetAwardInventoryMessage {
    return { login: isSet(object.login) ? globalThis.Number(object.login) : 0 };
  },

  toJSON(message: GetAwardInventoryMessage): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    return obj;
  },
};

function createBaseConsumedAwardMessage(): ConsumedAwardMessage {
  return { awardId: 0, ownerLogin: 0, awardeeLogin: 0, awardedTimestamp: undefined, linkedImageId: undefined };
}

export const ConsumedAwardMessage = {
  encode(message: ConsumedAwardMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.awardId !== 0) {
      writer.uint32(8).int32(message.awardId);
    }
    if (message.ownerLogin !== 0) {
      writer.uint32(16).int32(message.ownerLogin);
    }
    if (message.awardeeLogin !== 0) {
      writer.uint32(24).int32(message.awardeeLogin);
    }
    if (message.awardedTimestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.awardedTimestamp), writer.uint32(34).fork()).ldelim();
    }
    if (message.linkedImageId !== undefined) {
      Int64Value.encode({ value: message.linkedImageId! }, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConsumedAwardMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumedAwardMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.awardId = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.ownerLogin = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.awardeeLogin = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.awardedTimestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.linkedImageId = Int64Value.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConsumedAwardMessage {
    return {
      awardId: isSet(object.awardId) ? globalThis.Number(object.awardId) : 0,
      ownerLogin: isSet(object.ownerLogin) ? globalThis.Number(object.ownerLogin) : 0,
      awardeeLogin: isSet(object.awardeeLogin) ? globalThis.Number(object.awardeeLogin) : 0,
      awardedTimestamp: isSet(object.awardedTimestamp) ? fromJsonTimestamp(object.awardedTimestamp) : undefined,
      linkedImageId: isSet(object.linkedImageId) ? Long.fromValue(object.linkedImageId) : undefined,
    };
  },

  toJSON(message: ConsumedAwardMessage): unknown {
    const obj: any = {};
    if (message.awardId !== 0) {
      obj.awardId = Math.round(message.awardId);
    }
    if (message.ownerLogin !== 0) {
      obj.ownerLogin = Math.round(message.ownerLogin);
    }
    if (message.awardeeLogin !== 0) {
      obj.awardeeLogin = Math.round(message.awardeeLogin);
    }
    if (message.awardedTimestamp !== undefined) {
      obj.awardedTimestamp = message.awardedTimestamp.toISOString();
    }
    if (message.linkedImageId !== undefined) {
      obj.linkedImageId = message.linkedImageId;
    }
    return obj;
  },
};

function createBaseAvailableAwardMessage(): AvailableAwardMessage {
  return { awardId: 0 };
}

export const AvailableAwardMessage = {
  encode(message: AvailableAwardMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.awardId !== 0) {
      writer.uint32(8).int32(message.awardId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AvailableAwardMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAvailableAwardMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.awardId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AvailableAwardMessage {
    return { awardId: isSet(object.awardId) ? globalThis.Number(object.awardId) : 0 };
  },

  toJSON(message: AvailableAwardMessage): unknown {
    const obj: any = {};
    if (message.awardId !== 0) {
      obj.awardId = Math.round(message.awardId);
    }
    return obj;
  },
};

function createBaseAwardInventoryMessage(): AwardInventoryMessage {
  return { availableAwards: [], receivedAwards: [], givenAwards: [] };
}

export const AwardInventoryMessage = {
  encode(message: AwardInventoryMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.availableAwards) {
      AvailableAwardMessage.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.receivedAwards) {
      ConsumedAwardMessage.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.givenAwards) {
      ConsumedAwardMessage.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AwardInventoryMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAwardInventoryMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.availableAwards.push(AvailableAwardMessage.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.receivedAwards.push(ConsumedAwardMessage.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.givenAwards.push(ConsumedAwardMessage.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AwardInventoryMessage {
    return {
      availableAwards: globalThis.Array.isArray(object?.availableAwards)
        ? object.availableAwards.map((e: any) => AvailableAwardMessage.fromJSON(e))
        : [],
      receivedAwards: globalThis.Array.isArray(object?.receivedAwards)
        ? object.receivedAwards.map((e: any) => ConsumedAwardMessage.fromJSON(e))
        : [],
      givenAwards: globalThis.Array.isArray(object?.givenAwards)
        ? object.givenAwards.map((e: any) => ConsumedAwardMessage.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AwardInventoryMessage): unknown {
    const obj: any = {};
    if (message.availableAwards?.length) {
      obj.availableAwards = message.availableAwards.map((e) => AvailableAwardMessage.toJSON(e));
    }
    if (message.receivedAwards?.length) {
      obj.receivedAwards = message.receivedAwards.map((e) => ConsumedAwardMessage.toJSON(e));
    }
    if (message.givenAwards?.length) {
      obj.givenAwards = message.givenAwards.map((e) => ConsumedAwardMessage.toJSON(e));
    }
    return obj;
  },
};

function createBaseGetAwardPackLevelMessage(): GetAwardPackLevelMessage {
  return { login: 0 };
}

export const GetAwardPackLevelMessage = {
  encode(message: GetAwardPackLevelMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAwardPackLevelMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAwardPackLevelMessage();
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

  fromJSON(object: any): GetAwardPackLevelMessage {
    return { login: isSet(object.login) ? globalThis.Number(object.login) : 0 };
  },

  toJSON(message: GetAwardPackLevelMessage): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    return obj;
  },
};

function createBaseAwardPackLevelMessage(): AwardPackLevelMessage {
  return { level: 0, collectedBubbles: 0 };
}

export const AwardPackLevelMessage = {
  encode(message: AwardPackLevelMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.level !== 0) {
      writer.uint32(8).int32(message.level);
    }
    if (message.collectedBubbles !== 0) {
      writer.uint32(16).int32(message.collectedBubbles);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AwardPackLevelMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAwardPackLevelMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.level = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.collectedBubbles = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AwardPackLevelMessage {
    return {
      level: isSet(object.level) ? awardRarityMessageFromJSON(object.level) : 0,
      collectedBubbles: isSet(object.collectedBubbles) ? globalThis.Number(object.collectedBubbles) : 0,
    };
  },

  toJSON(message: AwardPackLevelMessage): unknown {
    const obj: any = {};
    if (message.level !== 0) {
      obj.level = awardRarityMessageToJSON(message.level);
    }
    if (message.collectedBubbles !== 0) {
      obj.collectedBubbles = Math.round(message.collectedBubbles);
    }
    return obj;
  },
};

function createBaseGetBubbleCreditRequest(): GetBubbleCreditRequest {
  return { login: 0 };
}

export const GetBubbleCreditRequest = {
  encode(message: GetBubbleCreditRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBubbleCreditRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBubbleCreditRequest();
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

  fromJSON(object: any): GetBubbleCreditRequest {
    return { login: isSet(object.login) ? globalThis.Number(object.login) : 0 };
  },

  toJSON(message: GetBubbleCreditRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    return obj;
  },
};

function createBaseGetGalleryItemsMessage(): GetGalleryItemsMessage {
  return { login: 0, imageIds: [] };
}

export const GetGalleryItemsMessage = {
  encode(message: GetGalleryItemsMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    writer.uint32(18).fork();
    for (const v of message.imageIds) {
      writer.int64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetGalleryItemsMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGalleryItemsMessage();
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
          if (tag === 16) {
            message.imageIds.push(reader.int64() as Long);

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.imageIds.push(reader.int64() as Long);
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

  fromJSON(object: any): GetGalleryItemsMessage {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      imageIds: globalThis.Array.isArray(object?.imageIds) ? object.imageIds.map((e: any) => Long.fromValue(e)) : [],
    };
  },

  toJSON(message: GetGalleryItemsMessage): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.imageIds?.length) {
      obj.imageIds = message.imageIds.map((e) => (e || Long.ZERO).toString());
    }
    return obj;
  },
};

function createBaseGalleryItemMessage(): GalleryItemMessage {
  return {
    imageId: Long.ZERO,
    imageUrl: "",
    title: "",
    author: "",
    date: undefined,
    language: "",
    isOwn: false,
    inPrivateLobby: false,
  };
}

export const GalleryItemMessage = {
  encode(message: GalleryItemMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.imageId.isZero()) {
      writer.uint32(8).int64(message.imageId);
    }
    if (message.imageUrl !== "") {
      writer.uint32(18).string(message.imageUrl);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    if (message.author !== "") {
      writer.uint32(34).string(message.author);
    }
    if (message.date !== undefined) {
      Timestamp.encode(toTimestamp(message.date), writer.uint32(42).fork()).ldelim();
    }
    if (message.language !== "") {
      writer.uint32(50).string(message.language);
    }
    if (message.isOwn === true) {
      writer.uint32(56).bool(message.isOwn);
    }
    if (message.inPrivateLobby === true) {
      writer.uint32(64).bool(message.inPrivateLobby);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GalleryItemMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGalleryItemMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.imageId = reader.int64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.imageUrl = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.title = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.author = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.date = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.language = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.isOwn = reader.bool();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.inPrivateLobby = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GalleryItemMessage {
    return {
      imageId: isSet(object.imageId) ? Long.fromValue(object.imageId) : Long.ZERO,
      imageUrl: isSet(object.imageUrl) ? globalThis.String(object.imageUrl) : "",
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      author: isSet(object.author) ? globalThis.String(object.author) : "",
      date: isSet(object.date) ? fromJsonTimestamp(object.date) : undefined,
      language: isSet(object.language) ? globalThis.String(object.language) : "",
      isOwn: isSet(object.isOwn) ? globalThis.Boolean(object.isOwn) : false,
      inPrivateLobby: isSet(object.inPrivateLobby) ? globalThis.Boolean(object.inPrivateLobby) : false,
    };
  },

  toJSON(message: GalleryItemMessage): unknown {
    const obj: any = {};
    if (!message.imageId.isZero()) {
      obj.imageId = (message.imageId || Long.ZERO).toString();
    }
    if (message.imageUrl !== "") {
      obj.imageUrl = message.imageUrl;
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.author !== "") {
      obj.author = message.author;
    }
    if (message.date !== undefined) {
      obj.date = message.date.toISOString();
    }
    if (message.language !== "") {
      obj.language = message.language;
    }
    if (message.isOwn === true) {
      obj.isOwn = message.isOwn;
    }
    if (message.inPrivateLobby === true) {
      obj.inPrivateLobby = message.inPrivateLobby;
    }
    return obj;
  },
};

function createBaseOpenAwardPackMessage(): OpenAwardPackMessage {
  return { login: 0 };
}

export const OpenAwardPackMessage = {
  encode(message: OpenAwardPackMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OpenAwardPackMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOpenAwardPackMessage();
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

  fromJSON(object: any): OpenAwardPackMessage {
    return { login: isSet(object.login) ? globalThis.Number(object.login) : 0 };
  },

  toJSON(message: OpenAwardPackMessage): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    return obj;
  },
};

function createBaseAwardPackResultMessage(): AwardPackResultMessage {
  return { awards: [] };
}

export const AwardPackResultMessage = {
  encode(message: AwardPackResultMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.awards) {
      AwardReply.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AwardPackResultMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAwardPackResultMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.awards.push(AwardReply.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AwardPackResultMessage {
    return {
      awards: globalThis.Array.isArray(object?.awards) ? object.awards.map((e: any) => AwardReply.fromJSON(e)) : [],
    };
  },

  toJSON(message: AwardPackResultMessage): unknown {
    const obj: any = {};
    if (message.awards?.length) {
      obj.awards = message.awards.map((e) => AwardReply.toJSON(e));
    }
    return obj;
  },
};

function createBaseBubbleCreditReply(): BubbleCreditReply {
  return { totalCredit: 0, availableCredit: 0, bubblesAmount: 0 };
}

export const BubbleCreditReply = {
  encode(message: BubbleCreditReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.totalCredit !== 0) {
      writer.uint32(8).int32(message.totalCredit);
    }
    if (message.availableCredit !== 0) {
      writer.uint32(16).int32(message.availableCredit);
    }
    if (message.bubblesAmount !== 0) {
      writer.uint32(24).int32(message.bubblesAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BubbleCreditReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBubbleCreditReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.totalCredit = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.availableCredit = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.bubblesAmount = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BubbleCreditReply {
    return {
      totalCredit: isSet(object.totalCredit) ? globalThis.Number(object.totalCredit) : 0,
      availableCredit: isSet(object.availableCredit) ? globalThis.Number(object.availableCredit) : 0,
      bubblesAmount: isSet(object.bubblesAmount) ? globalThis.Number(object.bubblesAmount) : 0,
    };
  },

  toJSON(message: BubbleCreditReply): unknown {
    const obj: any = {};
    if (message.totalCredit !== 0) {
      obj.totalCredit = Math.round(message.totalCredit);
    }
    if (message.availableCredit !== 0) {
      obj.availableCredit = Math.round(message.availableCredit);
    }
    if (message.bubblesAmount !== 0) {
      obj.bubblesAmount = Math.round(message.bubblesAmount);
    }
    return obj;
  },
};

function createBaseGetDropCreditRequest(): GetDropCreditRequest {
  return { login: 0 };
}

export const GetDropCreditRequest = {
  encode(message: GetDropCreditRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetDropCreditRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDropCreditRequest();
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

  fromJSON(object: any): GetDropCreditRequest {
    return { login: isSet(object.login) ? globalThis.Number(object.login) : 0 };
  },

  toJSON(message: GetDropCreditRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    return obj;
  },
};

function createBaseDropCreditReply(): DropCreditReply {
  return { credit: 0, count: 0 };
}

export const DropCreditReply = {
  encode(message: DropCreditReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.credit !== 0) {
      writer.uint32(9).double(message.credit);
    }
    if (message.count !== 0) {
      writer.uint32(16).int32(message.count);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DropCreditReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDropCreditReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.credit = reader.double();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.count = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DropCreditReply {
    return {
      credit: isSet(object.credit) ? globalThis.Number(object.credit) : 0,
      count: isSet(object.count) ? globalThis.Number(object.count) : 0,
    };
  },

  toJSON(message: DropCreditReply): unknown {
    const obj: any = {};
    if (message.credit !== 0) {
      obj.credit = message.credit;
    }
    if (message.count !== 0) {
      obj.count = Math.round(message.count);
    }
    return obj;
  },
};

function createBaseBuySpriteRequest(): BuySpriteRequest {
  return { login: 0, spriteId: 0 };
}

export const BuySpriteRequest = {
  encode(message: BuySpriteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (message.spriteId !== 0) {
      writer.uint32(16).int32(message.spriteId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BuySpriteRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBuySpriteRequest();
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

          message.spriteId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BuySpriteRequest {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      spriteId: isSet(object.spriteId) ? globalThis.Number(object.spriteId) : 0,
    };
  },

  toJSON(message: BuySpriteRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.spriteId !== 0) {
      obj.spriteId = Math.round(message.spriteId);
    }
    return obj;
  },
};

function createBaseSpriteSlotConfigurationRequest(): SpriteSlotConfigurationRequest {
  return { slotId: 0, spriteId: undefined };
}

export const SpriteSlotConfigurationRequest = {
  encode(message: SpriteSlotConfigurationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.slotId !== 0) {
      writer.uint32(8).int32(message.slotId);
    }
    if (message.spriteId !== undefined) {
      Int32Value.encode({ value: message.spriteId! }, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SpriteSlotConfigurationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpriteSlotConfigurationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.slotId = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.spriteId = Int32Value.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SpriteSlotConfigurationRequest {
    return {
      slotId: isSet(object.slotId) ? globalThis.Number(object.slotId) : 0,
      spriteId: isSet(object.spriteId) ? Number(object.spriteId) : undefined,
    };
  },

  toJSON(message: SpriteSlotConfigurationRequest): unknown {
    const obj: any = {};
    if (message.slotId !== 0) {
      obj.slotId = Math.round(message.slotId);
    }
    if (message.spriteId !== undefined) {
      obj.spriteId = message.spriteId;
    }
    return obj;
  },
};

function createBaseUseSpriteComboRequest(): UseSpriteComboRequest {
  return { login: 0, clearOtherSlots: false, combo: [] };
}

export const UseSpriteComboRequest = {
  encode(message: UseSpriteComboRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (message.clearOtherSlots === true) {
      writer.uint32(16).bool(message.clearOtherSlots);
    }
    for (const v of message.combo) {
      SpriteSlotConfigurationRequest.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UseSpriteComboRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUseSpriteComboRequest();
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

          message.clearOtherSlots = reader.bool();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.combo.push(SpriteSlotConfigurationRequest.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UseSpriteComboRequest {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      clearOtherSlots: isSet(object.clearOtherSlots) ? globalThis.Boolean(object.clearOtherSlots) : false,
      combo: globalThis.Array.isArray(object?.combo)
        ? object.combo.map((e: any) => SpriteSlotConfigurationRequest.fromJSON(e))
        : [],
    };
  },

  toJSON(message: UseSpriteComboRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.clearOtherSlots === true) {
      obj.clearOtherSlots = message.clearOtherSlots;
    }
    if (message.combo?.length) {
      obj.combo = message.combo.map((e) => SpriteSlotConfigurationRequest.toJSON(e));
    }
    return obj;
  },
};

function createBaseSpriteColorConfigurationRequest(): SpriteColorConfigurationRequest {
  return { spriteId: 0, colorShift: undefined };
}

export const SpriteColorConfigurationRequest = {
  encode(message: SpriteColorConfigurationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.spriteId !== 0) {
      writer.uint32(8).int32(message.spriteId);
    }
    if (message.colorShift !== undefined) {
      Int32Value.encode({ value: message.colorShift! }, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SpriteColorConfigurationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpriteColorConfigurationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.spriteId = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.colorShift = Int32Value.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SpriteColorConfigurationRequest {
    return {
      spriteId: isSet(object.spriteId) ? globalThis.Number(object.spriteId) : 0,
      colorShift: isSet(object.colorShift) ? Number(object.colorShift) : undefined,
    };
  },

  toJSON(message: SpriteColorConfigurationRequest): unknown {
    const obj: any = {};
    if (message.spriteId !== 0) {
      obj.spriteId = Math.round(message.spriteId);
    }
    if (message.colorShift !== undefined) {
      obj.colorShift = message.colorShift;
    }
    return obj;
  },
};

function createBaseSetSpriteColorRequest(): SetSpriteColorRequest {
  return { login: 0, clearOtherConfigs: false, colorConfig: [] };
}

export const SetSpriteColorRequest = {
  encode(message: SetSpriteColorRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (message.clearOtherConfigs === true) {
      writer.uint32(16).bool(message.clearOtherConfigs);
    }
    for (const v of message.colorConfig) {
      SpriteColorConfigurationRequest.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetSpriteColorRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetSpriteColorRequest();
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

          message.clearOtherConfigs = reader.bool();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.colorConfig.push(SpriteColorConfigurationRequest.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SetSpriteColorRequest {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      clearOtherConfigs: isSet(object.clearOtherConfigs) ? globalThis.Boolean(object.clearOtherConfigs) : false,
      colorConfig: globalThis.Array.isArray(object?.colorConfig)
        ? object.colorConfig.map((e: any) => SpriteColorConfigurationRequest.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SetSpriteColorRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.clearOtherConfigs === true) {
      obj.clearOtherConfigs = message.clearOtherConfigs;
    }
    if (message.colorConfig?.length) {
      obj.colorConfig = message.colorConfig.map((e) => SpriteColorConfigurationRequest.toJSON(e));
    }
    return obj;
  },
};

function createBaseGetSpriteInventoryRequest(): GetSpriteInventoryRequest {
  return { login: 0 };
}

export const GetSpriteInventoryRequest = {
  encode(message: GetSpriteInventoryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSpriteInventoryRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSpriteInventoryRequest();
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

  fromJSON(object: any): GetSpriteInventoryRequest {
    return { login: isSet(object.login) ? globalThis.Number(object.login) : 0 };
  },

  toJSON(message: GetSpriteInventoryRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    return obj;
  },
};

function createBaseSpriteSlotConfigurationReply(): SpriteSlotConfigurationReply {
  return { slot: 0, spriteId: 0, colorShift: undefined };
}

export const SpriteSlotConfigurationReply = {
  encode(message: SpriteSlotConfigurationReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.slot !== 0) {
      writer.uint32(8).int32(message.slot);
    }
    if (message.spriteId !== 0) {
      writer.uint32(16).int32(message.spriteId);
    }
    if (message.colorShift !== undefined) {
      Int32Value.encode({ value: message.colorShift! }, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SpriteSlotConfigurationReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpriteSlotConfigurationReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.slot = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.spriteId = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.colorShift = Int32Value.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SpriteSlotConfigurationReply {
    return {
      slot: isSet(object.slot) ? globalThis.Number(object.slot) : 0,
      spriteId: isSet(object.spriteId) ? globalThis.Number(object.spriteId) : 0,
      colorShift: isSet(object.colorShift) ? Number(object.colorShift) : undefined,
    };
  },

  toJSON(message: SpriteSlotConfigurationReply): unknown {
    const obj: any = {};
    if (message.slot !== 0) {
      obj.slot = Math.round(message.slot);
    }
    if (message.spriteId !== 0) {
      obj.spriteId = Math.round(message.spriteId);
    }
    if (message.colorShift !== undefined) {
      obj.colorShift = message.colorShift;
    }
    return obj;
  },
};

function createBaseGetEventCreditRequest(): GetEventCreditRequest {
  return { login: 0, eventId: 0 };
}

export const GetEventCreditRequest = {
  encode(message: GetEventCreditRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (message.eventId !== 0) {
      writer.uint32(16).int32(message.eventId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetEventCreditRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetEventCreditRequest();
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

          message.eventId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetEventCreditRequest {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      eventId: isSet(object.eventId) ? globalThis.Number(object.eventId) : 0,
    };
  },

  toJSON(message: GetEventCreditRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.eventId !== 0) {
      obj.eventId = Math.round(message.eventId);
    }
    return obj;
  },
};

function createBaseEventCreditReply(): EventCreditReply {
  return { totalCredit: 0, availableCredit: 0, eventDropId: 0 };
}

export const EventCreditReply = {
  encode(message: EventCreditReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.totalCredit !== 0) {
      writer.uint32(8).int32(message.totalCredit);
    }
    if (message.availableCredit !== 0) {
      writer.uint32(16).int32(message.availableCredit);
    }
    if (message.eventDropId !== 0) {
      writer.uint32(24).int32(message.eventDropId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventCreditReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventCreditReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.totalCredit = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.availableCredit = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.eventDropId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventCreditReply {
    return {
      totalCredit: isSet(object.totalCredit) ? globalThis.Number(object.totalCredit) : 0,
      availableCredit: isSet(object.availableCredit) ? globalThis.Number(object.availableCredit) : 0,
      eventDropId: isSet(object.eventDropId) ? globalThis.Number(object.eventDropId) : 0,
    };
  },

  toJSON(message: EventCreditReply): unknown {
    const obj: any = {};
    if (message.totalCredit !== 0) {
      obj.totalCredit = Math.round(message.totalCredit);
    }
    if (message.availableCredit !== 0) {
      obj.availableCredit = Math.round(message.availableCredit);
    }
    if (message.eventDropId !== 0) {
      obj.eventDropId = Math.round(message.eventDropId);
    }
    return obj;
  },
};

function createBaseGetSpriteSlotCountRequest(): GetSpriteSlotCountRequest {
  return { login: 0 };
}

export const GetSpriteSlotCountRequest = {
  encode(message: GetSpriteSlotCountRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSpriteSlotCountRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSpriteSlotCountRequest();
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

  fromJSON(object: any): GetSpriteSlotCountRequest {
    return { login: isSet(object.login) ? globalThis.Number(object.login) : 0 };
  },

  toJSON(message: GetSpriteSlotCountRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    return obj;
  },
};

function createBaseSpriteSlotCountReply(): SpriteSlotCountReply {
  return { unlockedSlots: 0 };
}

export const SpriteSlotCountReply = {
  encode(message: SpriteSlotCountReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.unlockedSlots !== 0) {
      writer.uint32(8).int32(message.unlockedSlots);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SpriteSlotCountReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpriteSlotCountReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.unlockedSlots = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SpriteSlotCountReply {
    return { unlockedSlots: isSet(object.unlockedSlots) ? globalThis.Number(object.unlockedSlots) : 0 };
  },

  toJSON(message: SpriteSlotCountReply): unknown {
    const obj: any = {};
    if (message.unlockedSlots !== 0) {
      obj.unlockedSlots = Math.round(message.unlockedSlots);
    }
    return obj;
  },
};

function createBaseGetSceneInventoryRequest(): GetSceneInventoryRequest {
  return { login: 0 };
}

export const GetSceneInventoryRequest = {
  encode(message: GetSceneInventoryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSceneInventoryRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSceneInventoryRequest();
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

  fromJSON(object: any): GetSceneInventoryRequest {
    return { login: isSet(object.login) ? globalThis.Number(object.login) : 0 };
  },

  toJSON(message: GetSceneInventoryRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    return obj;
  },
};

function createBaseSceneInventoryReply(): SceneInventoryReply {
  return { activeId: undefined, sceneIds: [] };
}

export const SceneInventoryReply = {
  encode(message: SceneInventoryReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.activeId !== undefined) {
      Int32Value.encode({ value: message.activeId! }, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(18).fork();
    for (const v of message.sceneIds) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SceneInventoryReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSceneInventoryReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.activeId = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 2:
          if (tag === 16) {
            message.sceneIds.push(reader.int32());

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.sceneIds.push(reader.int32());
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

  fromJSON(object: any): SceneInventoryReply {
    return {
      activeId: isSet(object.activeId) ? Number(object.activeId) : undefined,
      sceneIds: globalThis.Array.isArray(object?.sceneIds) ? object.sceneIds.map((e: any) => globalThis.Number(e)) : [],
    };
  },

  toJSON(message: SceneInventoryReply): unknown {
    const obj: any = {};
    if (message.activeId !== undefined) {
      obj.activeId = message.activeId;
    }
    if (message.sceneIds?.length) {
      obj.sceneIds = message.sceneIds.map((e) => Math.round(e));
    }
    return obj;
  },
};

function createBaseBuySceneRequest(): BuySceneRequest {
  return { login: 0, sceneId: 0 };
}

export const BuySceneRequest = {
  encode(message: BuySceneRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (message.sceneId !== 0) {
      writer.uint32(16).int32(message.sceneId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BuySceneRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBuySceneRequest();
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

          message.sceneId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BuySceneRequest {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      sceneId: isSet(object.sceneId) ? globalThis.Number(object.sceneId) : 0,
    };
  },

  toJSON(message: BuySceneRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.sceneId !== 0) {
      obj.sceneId = Math.round(message.sceneId);
    }
    return obj;
  },
};

function createBaseUseSceneRequest(): UseSceneRequest {
  return { login: 0, sceneId: undefined };
}

export const UseSceneRequest = {
  encode(message: UseSceneRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (message.sceneId !== undefined) {
      Int32Value.encode({ value: message.sceneId! }, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UseSceneRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUseSceneRequest();
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

          message.sceneId = Int32Value.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UseSceneRequest {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      sceneId: isSet(object.sceneId) ? Number(object.sceneId) : undefined,
    };
  },

  toJSON(message: UseSceneRequest): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.sceneId !== undefined) {
      obj.sceneId = message.sceneId;
    }
    return obj;
  },
};

function createBaseScenePriceRequest(): ScenePriceRequest {
  return { boughtSceneCount: 0 };
}

export const ScenePriceRequest = {
  encode(message: ScenePriceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.boughtSceneCount !== 0) {
      writer.uint32(8).int32(message.boughtSceneCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScenePriceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScenePriceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.boughtSceneCount = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ScenePriceRequest {
    return { boughtSceneCount: isSet(object.boughtSceneCount) ? globalThis.Number(object.boughtSceneCount) : 0 };
  },

  toJSON(message: ScenePriceRequest): unknown {
    const obj: any = {};
    if (message.boughtSceneCount !== 0) {
      obj.boughtSceneCount = Math.round(message.boughtSceneCount);
    }
    return obj;
  },
};

function createBaseScenePriceReply(): ScenePriceReply {
  return { nextPrice: 0, totalBubblesSpent: 0 };
}

export const ScenePriceReply = {
  encode(message: ScenePriceReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nextPrice !== 0) {
      writer.uint32(8).int32(message.nextPrice);
    }
    if (message.totalBubblesSpent !== 0) {
      writer.uint32(16).int32(message.totalBubblesSpent);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScenePriceReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScenePriceReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.nextPrice = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.totalBubblesSpent = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ScenePriceReply {
    return {
      nextPrice: isSet(object.nextPrice) ? globalThis.Number(object.nextPrice) : 0,
      totalBubblesSpent: isSet(object.totalBubblesSpent) ? globalThis.Number(object.totalBubblesSpent) : 0,
    };
  },

  toJSON(message: ScenePriceReply): unknown {
    const obj: any = {};
    if (message.nextPrice !== 0) {
      obj.nextPrice = Math.round(message.nextPrice);
    }
    if (message.totalBubblesSpent !== 0) {
      obj.totalBubblesSpent = Math.round(message.totalBubblesSpent);
    }
    return obj;
  },
};

/** Service definition for inventory checks and actions for sprites, scenes, stats, eventdrops etc */
export type InventoryDefinition = typeof InventoryDefinition;
export const InventoryDefinition = {
  name: "Inventory",
  fullName: "inventory.Inventory",
  methods: {
    /** gets the bubble credit details of a member */
    getBubbleCredit: {
      name: "GetBubbleCredit",
      requestType: GetBubbleCreditRequest,
      requestStream: false,
      responseType: BubbleCreditReply,
      responseStream: false,
      options: {},
    },
    /** gets the drop credit details of a member */
    getDropCredit: {
      name: "GetDropCredit",
      requestType: GetDropCreditRequest,
      requestStream: false,
      responseType: DropCreditReply,
      responseStream: false,
      options: {},
    },
    /** gets the count of unlocked sprite slots of a member */
    getSpriteSlotCount: {
      name: "GetSpriteSlotCount",
      requestType: GetSpriteSlotCountRequest,
      requestStream: false,
      responseType: SpriteSlotCountReply,
      responseStream: false,
      options: {},
    },
    /** gets the event drop credit details of a member */
    getEventCredit: {
      name: "GetEventCredit",
      requestType: GetEventCreditRequest,
      requestStream: false,
      responseType: EventCreditReply,
      responseStream: true,
      options: {},
    },
    /** gets progress of a member during an event */
    getEventProgress: {
      name: "GetEventProgress",
      requestType: GetEventProgressRequest,
      requestStream: false,
      responseType: EventProgressMessage,
      responseStream: false,
      options: {},
    },
    /** get the complete sprite inventory of a member (including inactive sprites -> slot = 0) */
    getSpriteInventory: {
      name: "GetSpriteInventory",
      requestType: GetSpriteInventoryRequest,
      requestStream: false,
      responseType: SpriteSlotConfigurationReply,
      responseStream: true,
      options: {},
    },
    /** add a sprite to the inventory of a member */
    buySprite: {
      name: "BuySprite",
      requestType: BuySpriteRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** activate a sprite combo for a selected set of slots */
    useSpriteCombo: {
      name: "UseSpriteCombo",
      requestType: UseSpriteComboRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** set a user configuration for a sprite color */
    setSpriteColorConfiguration: {
      name: "SetSpriteColorConfiguration",
      requestType: SetSpriteColorRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** get the complete scene inventory of a member */
    getSceneInventory: {
      name: "GetSceneInventory",
      requestType: GetSceneInventoryRequest,
      requestStream: false,
      responseType: SceneInventoryReply,
      responseStream: false,
      options: {},
    },
    /** add a scene to the inventory of a member */
    buyScene: {
      name: "BuyScene",
      requestType: BuySceneRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** activate a scene for a member */
    useScene: {
      name: "UseScene",
      requestType: UseSceneRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** get the price of the next scene and the total amount of bubbles spent on scenes in the inv */
    getScenePrice: {
      name: "GetScenePrice",
      requestType: ScenePriceRequest,
      requestStream: false,
      responseType: ScenePriceReply,
      responseStream: false,
      options: {},
    },
    /** get the inventory of awards - currently available, received and given */
    getAwardInventory: {
      name: "GetAwardInventory",
      requestType: GetAwardInventoryMessage,
      requestStream: false,
      responseType: AwardInventoryMessage,
      responseStream: false,
      options: {},
    },
    /** get the current award pack level and cooldown until next pack */
    getAwardPackLevel: {
      name: "GetAwardPackLevel",
      requestType: GetAwardPackLevelMessage,
      requestStream: false,
      responseType: AwardPackLevelMessage,
      responseStream: false,
      options: {},
    },
    /** get images from the image gallery of a member */
    getGalleryItems: {
      name: "GetGalleryItems",
      requestType: GetGalleryItemsMessage,
      requestStream: false,
      responseType: GalleryItemMessage,
      responseStream: true,
      options: {},
    },
    /** open an award pack */
    openAwardPack: {
      name: "OpenAwardPack",
      requestType: OpenAwardPackMessage,
      requestStream: false,
      responseType: AwardPackResultMessage,
      responseStream: false,
      options: {},
    },
    /** gets the first seen date of a member */
    getFirstSeenDate: {
      name: "GetFirstSeenDate",
      requestType: GetFirstSeenDateRequest,
      requestStream: false,
      responseType: FirstSeenMessage,
      responseStream: false,
      options: {},
    },
    /** gift an amount of event credit to another member */
    giftEventCredit: {
      name: "GiftEventCredit",
      requestType: GiftEventCreditMessage,
      requestStream: false,
      responseType: GiftLossMessage,
      responseStream: false,
      options: {},
    },
    /** gets the current gift loss rate */
    getGiftLossRate: {
      name: "GetGiftLossRate",
      requestType: GetGiftLossRateMessage,
      requestStream: false,
      responseType: GiftLossRateMessage,
      responseStream: false,
      options: {},
    },
    /** patronizes another member */
    patronizeMember: {
      name: "PatronizeMember",
      requestType: PatronizeMemberMessage,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** set the patron emoji of a user */
    setPatronEmoji: {
      name: "SetPatronEmoji",
      requestType: SetPatronEmojiMessage,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface InventoryServiceImplementation<CallContextExt = {}> {
  /** gets the bubble credit details of a member */
  getBubbleCredit(request: GetBubbleCreditRequest, context: CallContext & CallContextExt): Promise<BubbleCreditReply>;
  /** gets the drop credit details of a member */
  getDropCredit(request: GetDropCreditRequest, context: CallContext & CallContextExt): Promise<DropCreditReply>;
  /** gets the count of unlocked sprite slots of a member */
  getSpriteSlotCount(
    request: GetSpriteSlotCountRequest,
    context: CallContext & CallContextExt,
  ): Promise<SpriteSlotCountReply>;
  /** gets the event drop credit details of a member */
  getEventCredit(
    request: GetEventCreditRequest,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<EventCreditReply>;
  /** gets progress of a member during an event */
  getEventProgress(
    request: GetEventProgressRequest,
    context: CallContext & CallContextExt,
  ): Promise<EventProgressMessage>;
  /** get the complete sprite inventory of a member (including inactive sprites -> slot = 0) */
  getSpriteInventory(
    request: GetSpriteInventoryRequest,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<SpriteSlotConfigurationReply>;
  /** add a sprite to the inventory of a member */
  buySprite(request: BuySpriteRequest, context: CallContext & CallContextExt): Promise<Empty>;
  /** activate a sprite combo for a selected set of slots */
  useSpriteCombo(request: UseSpriteComboRequest, context: CallContext & CallContextExt): Promise<Empty>;
  /** set a user configuration for a sprite color */
  setSpriteColorConfiguration(request: SetSpriteColorRequest, context: CallContext & CallContextExt): Promise<Empty>;
  /** get the complete scene inventory of a member */
  getSceneInventory(
    request: GetSceneInventoryRequest,
    context: CallContext & CallContextExt,
  ): Promise<SceneInventoryReply>;
  /** add a scene to the inventory of a member */
  buyScene(request: BuySceneRequest, context: CallContext & CallContextExt): Promise<Empty>;
  /** activate a scene for a member */
  useScene(request: UseSceneRequest, context: CallContext & CallContextExt): Promise<Empty>;
  /** get the price of the next scene and the total amount of bubbles spent on scenes in the inv */
  getScenePrice(request: ScenePriceRequest, context: CallContext & CallContextExt): Promise<ScenePriceReply>;
  /** get the inventory of awards - currently available, received and given */
  getAwardInventory(
    request: GetAwardInventoryMessage,
    context: CallContext & CallContextExt,
  ): Promise<AwardInventoryMessage>;
  /** get the current award pack level and cooldown until next pack */
  getAwardPackLevel(
    request: GetAwardPackLevelMessage,
    context: CallContext & CallContextExt,
  ): Promise<AwardPackLevelMessage>;
  /** get images from the image gallery of a member */
  getGalleryItems(
    request: GetGalleryItemsMessage,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<GalleryItemMessage>;
  /** open an award pack */
  openAwardPack(request: OpenAwardPackMessage, context: CallContext & CallContextExt): Promise<AwardPackResultMessage>;
  /** gets the first seen date of a member */
  getFirstSeenDate(request: GetFirstSeenDateRequest, context: CallContext & CallContextExt): Promise<FirstSeenMessage>;
  /** gift an amount of event credit to another member */
  giftEventCredit(request: GiftEventCreditMessage, context: CallContext & CallContextExt): Promise<GiftLossMessage>;
  /** gets the current gift loss rate */
  getGiftLossRate(request: GetGiftLossRateMessage, context: CallContext & CallContextExt): Promise<GiftLossRateMessage>;
  /** patronizes another member */
  patronizeMember(request: PatronizeMemberMessage, context: CallContext & CallContextExt): Promise<Empty>;
  /** set the patron emoji of a user */
  setPatronEmoji(request: SetPatronEmojiMessage, context: CallContext & CallContextExt): Promise<Empty>;
}

export interface InventoryClient<CallOptionsExt = {}> {
  /** gets the bubble credit details of a member */
  getBubbleCredit(request: GetBubbleCreditRequest, options?: CallOptions & CallOptionsExt): Promise<BubbleCreditReply>;
  /** gets the drop credit details of a member */
  getDropCredit(request: GetDropCreditRequest, options?: CallOptions & CallOptionsExt): Promise<DropCreditReply>;
  /** gets the count of unlocked sprite slots of a member */
  getSpriteSlotCount(
    request: GetSpriteSlotCountRequest,
    options?: CallOptions & CallOptionsExt,
  ): Promise<SpriteSlotCountReply>;
  /** gets the event drop credit details of a member */
  getEventCredit(
    request: GetEventCreditRequest,
    options?: CallOptions & CallOptionsExt,
  ): AsyncIterable<EventCreditReply>;
  /** gets progress of a member during an event */
  getEventProgress(
    request: GetEventProgressRequest,
    options?: CallOptions & CallOptionsExt,
  ): Promise<EventProgressMessage>;
  /** get the complete sprite inventory of a member (including inactive sprites -> slot = 0) */
  getSpriteInventory(
    request: GetSpriteInventoryRequest,
    options?: CallOptions & CallOptionsExt,
  ): AsyncIterable<SpriteSlotConfigurationReply>;
  /** add a sprite to the inventory of a member */
  buySprite(request: BuySpriteRequest, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  /** activate a sprite combo for a selected set of slots */
  useSpriteCombo(request: UseSpriteComboRequest, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  /** set a user configuration for a sprite color */
  setSpriteColorConfiguration(request: SetSpriteColorRequest, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  /** get the complete scene inventory of a member */
  getSceneInventory(
    request: GetSceneInventoryRequest,
    options?: CallOptions & CallOptionsExt,
  ): Promise<SceneInventoryReply>;
  /** add a scene to the inventory of a member */
  buyScene(request: BuySceneRequest, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  /** activate a scene for a member */
  useScene(request: UseSceneRequest, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  /** get the price of the next scene and the total amount of bubbles spent on scenes in the inv */
  getScenePrice(request: ScenePriceRequest, options?: CallOptions & CallOptionsExt): Promise<ScenePriceReply>;
  /** get the inventory of awards - currently available, received and given */
  getAwardInventory(
    request: GetAwardInventoryMessage,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AwardInventoryMessage>;
  /** get the current award pack level and cooldown until next pack */
  getAwardPackLevel(
    request: GetAwardPackLevelMessage,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AwardPackLevelMessage>;
  /** get images from the image gallery of a member */
  getGalleryItems(
    request: GetGalleryItemsMessage,
    options?: CallOptions & CallOptionsExt,
  ): AsyncIterable<GalleryItemMessage>;
  /** open an award pack */
  openAwardPack(request: OpenAwardPackMessage, options?: CallOptions & CallOptionsExt): Promise<AwardPackResultMessage>;
  /** gets the first seen date of a member */
  getFirstSeenDate(request: GetFirstSeenDateRequest, options?: CallOptions & CallOptionsExt): Promise<FirstSeenMessage>;
  /** gift an amount of event credit to another member */
  giftEventCredit(request: GiftEventCreditMessage, options?: CallOptions & CallOptionsExt): Promise<GiftLossMessage>;
  /** gets the current gift loss rate */
  getGiftLossRate(
    request: GetGiftLossRateMessage,
    options?: CallOptions & CallOptionsExt,
  ): Promise<GiftLossRateMessage>;
  /** patronizes another member */
  patronizeMember(request: PatronizeMemberMessage, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  /** set the patron emoji of a user */
  setPatronEmoji(request: SetPatronEmojiMessage, options?: CallOptions & CallOptionsExt): Promise<Empty>;
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
