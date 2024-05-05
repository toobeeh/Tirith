/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";
import { Timestamp } from "./google/protobuf/timestamp";
import Long = require("long");

export const protobufPackage = "events";

/** A palantir event */
export interface EventReply {
  name: string;
  id: number;
  description: string;
  length: number;
  progressive: boolean;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

/** A palantir event drop */
export interface EventDropReply {
  name: string;
  id: number;
  url: string;
  eventId: number;
  releaseStart: Date | undefined;
  releaseEnd: Date | undefined;
}

/** Request containing an event id */
export interface GetEventRequest {
  id: number;
}

/** Request containing eventdrop id */
export interface GetEventDropRequest {
  id: number;
}

function createBaseEventReply(): EventReply {
  return { name: "", id: 0, description: "", length: 0, progressive: false, startDate: undefined, endDate: undefined };
}

export const EventReply = {
  encode(message: EventReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.id !== 0) {
      writer.uint32(16).int32(message.id);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.length !== 0) {
      writer.uint32(40).int32(message.length);
    }
    if (message.progressive === true) {
      writer.uint32(48).bool(message.progressive);
    }
    if (message.startDate !== undefined) {
      Timestamp.encode(toTimestamp(message.startDate), writer.uint32(58).fork()).ldelim();
    }
    if (message.endDate !== undefined) {
      Timestamp.encode(toTimestamp(message.endDate), writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventReply();
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

          message.id = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.description = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.length = reader.int32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.progressive = reader.bool();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.startDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
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

  fromJSON(object: any): EventReply {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      length: isSet(object.length) ? globalThis.Number(object.length) : 0,
      progressive: isSet(object.progressive) ? globalThis.Boolean(object.progressive) : false,
      startDate: isSet(object.startDate) ? fromJsonTimestamp(object.startDate) : undefined,
      endDate: isSet(object.endDate) ? fromJsonTimestamp(object.endDate) : undefined,
    };
  },

  toJSON(message: EventReply): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.length !== 0) {
      obj.length = Math.round(message.length);
    }
    if (message.progressive === true) {
      obj.progressive = message.progressive;
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

function createBaseEventDropReply(): EventDropReply {
  return { name: "", id: 0, url: "", eventId: 0, releaseStart: undefined, releaseEnd: undefined };
}

export const EventDropReply = {
  encode(message: EventDropReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.id !== 0) {
      writer.uint32(16).int32(message.id);
    }
    if (message.url !== "") {
      writer.uint32(26).string(message.url);
    }
    if (message.eventId !== 0) {
      writer.uint32(32).int32(message.eventId);
    }
    if (message.releaseStart !== undefined) {
      Timestamp.encode(toTimestamp(message.releaseStart), writer.uint32(58).fork()).ldelim();
    }
    if (message.releaseEnd !== undefined) {
      Timestamp.encode(toTimestamp(message.releaseEnd), writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventDropReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventDropReply();
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

          message.id = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.url = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.eventId = reader.int32();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.releaseStart = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.releaseEnd = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventDropReply {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      url: isSet(object.url) ? globalThis.String(object.url) : "",
      eventId: isSet(object.eventId) ? globalThis.Number(object.eventId) : 0,
      releaseStart: isSet(object.releaseStart) ? fromJsonTimestamp(object.releaseStart) : undefined,
      releaseEnd: isSet(object.releaseEnd) ? fromJsonTimestamp(object.releaseEnd) : undefined,
    };
  },

  toJSON(message: EventDropReply): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.url !== "") {
      obj.url = message.url;
    }
    if (message.eventId !== 0) {
      obj.eventId = Math.round(message.eventId);
    }
    if (message.releaseStart !== undefined) {
      obj.releaseStart = message.releaseStart.toISOString();
    }
    if (message.releaseEnd !== undefined) {
      obj.releaseEnd = message.releaseEnd.toISOString();
    }
    return obj;
  },
};

function createBaseGetEventRequest(): GetEventRequest {
  return { id: 0 };
}

export const GetEventRequest = {
  encode(message: GetEventRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetEventRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetEventRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetEventRequest {
    return { id: isSet(object.id) ? globalThis.Number(object.id) : 0 };
  },

  toJSON(message: GetEventRequest): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },
};

function createBaseGetEventDropRequest(): GetEventDropRequest {
  return { id: 0 };
}

export const GetEventDropRequest = {
  encode(message: GetEventDropRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetEventDropRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetEventDropRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetEventDropRequest {
    return { id: isSet(object.id) ? globalThis.Number(object.id) : 0 };
  },

  toJSON(message: GetEventDropRequest): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },
};

/** Service definition for events and their drops */
export type EventsDefinition = typeof EventsDefinition;
export const EventsDefinition = {
  name: "Events",
  fullName: "events.Events",
  methods: {
    /** Gets all events */
    getAllEvents: {
      name: "GetAllEvents",
      requestType: Empty,
      requestStream: false,
      responseType: EventReply,
      responseStream: true,
      options: {},
    },
    /** Gets the currently active event */
    getCurrentEvent: {
      name: "GetCurrentEvent",
      requestType: Empty,
      requestStream: false,
      responseType: EventReply,
      responseStream: false,
      options: {},
    },
    /** Gets an event by its id */
    getEventById: {
      name: "GetEventById",
      requestType: GetEventRequest,
      requestStream: false,
      responseType: EventReply,
      responseStream: false,
      options: {},
    },
    /** Gets all eventdrops */
    getAllEventDrops: {
      name: "GetAllEventDrops",
      requestType: Empty,
      requestStream: false,
      responseType: EventDropReply,
      responseStream: true,
      options: {},
    },
    /** Gets an event drop by id */
    getEventDropById: {
      name: "GetEventDropById",
      requestType: GetEventDropRequest,
      requestStream: false,
      responseType: EventDropReply,
      responseStream: false,
      options: {},
    },
    /** Gets all eventdrops of an event */
    getEventDropsOfEvent: {
      name: "GetEventDropsOfEvent",
      requestType: GetEventRequest,
      requestStream: false,
      responseType: EventDropReply,
      responseStream: true,
      options: {},
    },
    /** gets the release slots of an progressive event */
    getEventReleaseSlots: {
      name: "GetEventReleaseSlots",
      requestType: GetEventRequest,
      requestStream: false,
      responseType: Timestamp,
      responseStream: true,
      options: {},
    },
  },
} as const;

export interface EventsServiceImplementation<CallContextExt = {}> {
  /** Gets all events */
  getAllEvents(request: Empty, context: CallContext & CallContextExt): ServerStreamingMethodResult<EventReply>;
  /** Gets the currently active event */
  getCurrentEvent(request: Empty, context: CallContext & CallContextExt): Promise<EventReply>;
  /** Gets an event by its id */
  getEventById(request: GetEventRequest, context: CallContext & CallContextExt): Promise<EventReply>;
  /** Gets all eventdrops */
  getAllEventDrops(request: Empty, context: CallContext & CallContextExt): ServerStreamingMethodResult<EventDropReply>;
  /** Gets an event drop by id */
  getEventDropById(request: GetEventDropRequest, context: CallContext & CallContextExt): Promise<EventDropReply>;
  /** Gets all eventdrops of an event */
  getEventDropsOfEvent(
    request: GetEventRequest,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<EventDropReply>;
  /** gets the release slots of an progressive event */
  getEventReleaseSlots(
    request: GetEventRequest,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<Timestamp>;
}

export interface EventsClient<CallOptionsExt = {}> {
  /** Gets all events */
  getAllEvents(request: Empty, options?: CallOptions & CallOptionsExt): AsyncIterable<EventReply>;
  /** Gets the currently active event */
  getCurrentEvent(request: Empty, options?: CallOptions & CallOptionsExt): Promise<EventReply>;
  /** Gets an event by its id */
  getEventById(request: GetEventRequest, options?: CallOptions & CallOptionsExt): Promise<EventReply>;
  /** Gets all eventdrops */
  getAllEventDrops(request: Empty, options?: CallOptions & CallOptionsExt): AsyncIterable<EventDropReply>;
  /** Gets an event drop by id */
  getEventDropById(request: GetEventDropRequest, options?: CallOptions & CallOptionsExt): Promise<EventDropReply>;
  /** Gets all eventdrops of an event */
  getEventDropsOfEvent(request: GetEventRequest, options?: CallOptions & CallOptionsExt): AsyncIterable<EventDropReply>;
  /** gets the release slots of an progressive event */
  getEventReleaseSlots(request: GetEventRequest, options?: CallOptions & CallOptionsExt): AsyncIterable<Timestamp>;
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
