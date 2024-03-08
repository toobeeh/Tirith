/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "events";

/** A palantir event */
export interface EventReply {
  name: string;
  id: number;
  start: string;
  description: string;
  length: number;
}

/** A palantir event drop */
export interface EventDropReply {
  name: string;
  id: number;
  url: string;
  eventId: number;
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
  return { name: "", id: 0, start: "", description: "", length: 0 };
}

export const EventReply = {
  encode(message: EventReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.id !== 0) {
      writer.uint32(16).int32(message.id);
    }
    if (message.start !== "") {
      writer.uint32(26).string(message.start);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.length !== 0) {
      writer.uint32(40).int32(message.length);
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
        case 3:
          if (tag !== 26) {
            break;
          }

          message.start = reader.string();
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
      start: isSet(object.start) ? globalThis.String(object.start) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      length: isSet(object.length) ? globalThis.Number(object.length) : 0,
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
    if (message.start !== "") {
      obj.start = message.start;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.length !== 0) {
      obj.length = Math.round(message.length);
    }
    return obj;
  },
};

function createBaseEventDropReply(): EventDropReply {
  return { name: "", id: 0, url: "", eventId: 0 };
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
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export type ServerStreamingMethodResult<Response> = { [Symbol.asyncIterator](): AsyncIterator<Response, void> };
