/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";
import { StringValue } from "./google/protobuf/wrappers";
import Long = require("long");

export const protobufPackage = "announcements";

export enum AnnouncementType {
  Changelog = 0,
  Announcement = 1,
  UNRECOGNIZED = -1,
}

export function announcementTypeFromJSON(object: any): AnnouncementType {
  switch (object) {
    case 0:
    case "Changelog":
      return AnnouncementType.Changelog;
    case 1:
    case "Announcement":
      return AnnouncementType.Announcement;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AnnouncementType.UNRECOGNIZED;
  }
}

export function announcementTypeToJSON(object: AnnouncementType): string {
  switch (object) {
    case AnnouncementType.Changelog:
      return "Changelog";
    case AnnouncementType.Announcement:
      return "Announcement";
    case AnnouncementType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface AnnouncementMessage {
  date: Date | undefined;
  title: string;
  content: string;
  affectedTypoVersion: string | undefined;
  type: AnnouncementType;
  details: string | undefined;
}

export interface GetAnnouncementsMessage {
}

function createBaseAnnouncementMessage(): AnnouncementMessage {
  return { date: undefined, title: "", content: "", affectedTypoVersion: undefined, type: 0, details: undefined };
}

export const AnnouncementMessage = {
  encode(message: AnnouncementMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.date !== undefined) {
      Timestamp.encode(toTimestamp(message.date), writer.uint32(10).fork()).ldelim();
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.content !== "") {
      writer.uint32(26).string(message.content);
    }
    if (message.affectedTypoVersion !== undefined) {
      StringValue.encode({ value: message.affectedTypoVersion! }, writer.uint32(34).fork()).ldelim();
    }
    if (message.type !== 0) {
      writer.uint32(40).int32(message.type);
    }
    if (message.details !== undefined) {
      StringValue.encode({ value: message.details! }, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AnnouncementMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnnouncementMessage();
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
          if (tag !== 18) {
            break;
          }

          message.title = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.content = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.affectedTypoVersion = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.details = StringValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AnnouncementMessage {
    return {
      date: isSet(object.date) ? fromJsonTimestamp(object.date) : undefined,
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      affectedTypoVersion: isSet(object.affectedTypoVersion) ? String(object.affectedTypoVersion) : undefined,
      type: isSet(object.type) ? announcementTypeFromJSON(object.type) : 0,
      details: isSet(object.details) ? String(object.details) : undefined,
    };
  },

  toJSON(message: AnnouncementMessage): unknown {
    const obj: any = {};
    if (message.date !== undefined) {
      obj.date = message.date.toISOString();
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.content !== "") {
      obj.content = message.content;
    }
    if (message.affectedTypoVersion !== undefined) {
      obj.affectedTypoVersion = message.affectedTypoVersion;
    }
    if (message.type !== 0) {
      obj.type = announcementTypeToJSON(message.type);
    }
    if (message.details !== undefined) {
      obj.details = message.details;
    }
    return obj;
  },
};

function createBaseGetAnnouncementsMessage(): GetAnnouncementsMessage {
  return {};
}

export const GetAnnouncementsMessage = {
  encode(_: GetAnnouncementsMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAnnouncementsMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAnnouncementsMessage();
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

  fromJSON(_: any): GetAnnouncementsMessage {
    return {};
  },

  toJSON(_: GetAnnouncementsMessage): unknown {
    const obj: any = {};
    return obj;
  },
};

/** Service definition for announcements */
export type AnnouncementsDefinition = typeof AnnouncementsDefinition;
export const AnnouncementsDefinition = {
  name: "Announcements",
  fullName: "announcements.Announcements",
  methods: {
    /** Gets all announcements */
    getAllAnnouncements: {
      name: "GetAllAnnouncements",
      requestType: GetAnnouncementsMessage,
      requestStream: false,
      responseType: AnnouncementMessage,
      responseStream: true,
      options: {},
    },
  },
} as const;

export interface AnnouncementsServiceImplementation<CallContextExt = {}> {
  /** Gets all announcements */
  getAllAnnouncements(
    request: GetAnnouncementsMessage,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<AnnouncementMessage>;
}

export interface AnnouncementsClient<CallOptionsExt = {}> {
  /** Gets all announcements */
  getAllAnnouncements(
    request: GetAnnouncementsMessage,
    options?: CallOptions & CallOptionsExt,
  ): AsyncIterable<AnnouncementMessage>;
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
