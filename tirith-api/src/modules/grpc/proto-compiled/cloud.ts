/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import Long = require("long");
import * as _m0 from "protobufjs/minimal";
import { BoolValue, Int64Value, StringValue } from "./google/protobuf/wrappers";

export const protobufPackage = "cloud";

export interface SearchCloudMessage {
  page: number;
  pageSize: number;
  ownerLogin: number;
  authorQuery: string | undefined;
  languageQuery: string | undefined;
  createdBeforeQuery: Long | undefined;
  createdAfterQuery: Long | undefined;
  createdInPrivateLobbyQuery: boolean | undefined;
  isOwnQuery: boolean | undefined;
  titleQuery: string | undefined;
}

export interface CloudImageMessage {
  id: Long;
  imageUrl: string;
  metaUrl: string;
  commandsUrl: string;
  tags: CloudTagMessage | undefined;
}

export interface CloudTagMessage {
  title: string;
  author: string;
  language: string;
  createdAt: Long;
  createdInPrivateLobby: boolean;
  isOwn: boolean;
}

function createBaseSearchCloudMessage(): SearchCloudMessage {
  return {
    page: 0,
    pageSize: 0,
    ownerLogin: 0,
    authorQuery: undefined,
    languageQuery: undefined,
    createdBeforeQuery: undefined,
    createdAfterQuery: undefined,
    createdInPrivateLobbyQuery: undefined,
    isOwnQuery: undefined,
    titleQuery: undefined,
  };
}

export const SearchCloudMessage = {
  encode(message: SearchCloudMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.page !== 0) {
      writer.uint32(8).int32(message.page);
    }
    if (message.pageSize !== 0) {
      writer.uint32(16).int32(message.pageSize);
    }
    if (message.ownerLogin !== 0) {
      writer.uint32(24).int32(message.ownerLogin);
    }
    if (message.authorQuery !== undefined) {
      StringValue.encode({ value: message.authorQuery! }, writer.uint32(34).fork()).ldelim();
    }
    if (message.languageQuery !== undefined) {
      StringValue.encode({ value: message.languageQuery! }, writer.uint32(42).fork()).ldelim();
    }
    if (message.createdBeforeQuery !== undefined) {
      Int64Value.encode({ value: message.createdBeforeQuery! }, writer.uint32(50).fork()).ldelim();
    }
    if (message.createdAfterQuery !== undefined) {
      Int64Value.encode({ value: message.createdAfterQuery! }, writer.uint32(58).fork()).ldelim();
    }
    if (message.createdInPrivateLobbyQuery !== undefined) {
      BoolValue.encode({ value: message.createdInPrivateLobbyQuery! }, writer.uint32(66).fork()).ldelim();
    }
    if (message.isOwnQuery !== undefined) {
      BoolValue.encode({ value: message.isOwnQuery! }, writer.uint32(74).fork()).ldelim();
    }
    if (message.titleQuery !== undefined) {
      StringValue.encode({ value: message.titleQuery! }, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SearchCloudMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSearchCloudMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.page = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.pageSize = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.ownerLogin = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.authorQuery = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.languageQuery = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.createdBeforeQuery = Int64Value.decode(reader, reader.uint32()).value;
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.createdAfterQuery = Int64Value.decode(reader, reader.uint32()).value;
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.createdInPrivateLobbyQuery = BoolValue.decode(reader, reader.uint32()).value;
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.isOwnQuery = BoolValue.decode(reader, reader.uint32()).value;
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.titleQuery = StringValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SearchCloudMessage {
    return {
      page: isSet(object.page) ? globalThis.Number(object.page) : 0,
      pageSize: isSet(object.pageSize) ? globalThis.Number(object.pageSize) : 0,
      ownerLogin: isSet(object.ownerLogin) ? globalThis.Number(object.ownerLogin) : 0,
      authorQuery: isSet(object.authorQuery) ? String(object.authorQuery) : undefined,
      languageQuery: isSet(object.languageQuery) ? String(object.languageQuery) : undefined,
      createdBeforeQuery: isSet(object.createdBeforeQuery) ? Long.fromValue(object.createdBeforeQuery) : undefined,
      createdAfterQuery: isSet(object.createdAfterQuery) ? Long.fromValue(object.createdAfterQuery) : undefined,
      createdInPrivateLobbyQuery: isSet(object.createdInPrivateLobbyQuery)
        ? Boolean(object.createdInPrivateLobbyQuery)
        : undefined,
      isOwnQuery: isSet(object.isOwnQuery) ? Boolean(object.isOwnQuery) : undefined,
      titleQuery: isSet(object.titleQuery) ? String(object.titleQuery) : undefined,
    };
  },

  toJSON(message: SearchCloudMessage): unknown {
    const obj: any = {};
    if (message.page !== 0) {
      obj.page = Math.round(message.page);
    }
    if (message.pageSize !== 0) {
      obj.pageSize = Math.round(message.pageSize);
    }
    if (message.ownerLogin !== 0) {
      obj.ownerLogin = Math.round(message.ownerLogin);
    }
    if (message.authorQuery !== undefined) {
      obj.authorQuery = message.authorQuery;
    }
    if (message.languageQuery !== undefined) {
      obj.languageQuery = message.languageQuery;
    }
    if (message.createdBeforeQuery !== undefined) {
      obj.createdBeforeQuery = message.createdBeforeQuery;
    }
    if (message.createdAfterQuery !== undefined) {
      obj.createdAfterQuery = message.createdAfterQuery;
    }
    if (message.createdInPrivateLobbyQuery !== undefined) {
      obj.createdInPrivateLobbyQuery = message.createdInPrivateLobbyQuery;
    }
    if (message.isOwnQuery !== undefined) {
      obj.isOwnQuery = message.isOwnQuery;
    }
    if (message.titleQuery !== undefined) {
      obj.titleQuery = message.titleQuery;
    }
    return obj;
  },
};

function createBaseCloudImageMessage(): CloudImageMessage {
  return { id: Long.ZERO, imageUrl: "", metaUrl: "", commandsUrl: "", tags: undefined };
}

export const CloudImageMessage = {
  encode(message: CloudImageMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).int64(message.id);
    }
    if (message.imageUrl !== "") {
      writer.uint32(18).string(message.imageUrl);
    }
    if (message.metaUrl !== "") {
      writer.uint32(26).string(message.metaUrl);
    }
    if (message.commandsUrl !== "") {
      writer.uint32(34).string(message.commandsUrl);
    }
    if (message.tags !== undefined) {
      CloudTagMessage.encode(message.tags, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CloudImageMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCloudImageMessage();
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

          message.imageUrl = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.metaUrl = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.commandsUrl = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.tags = CloudTagMessage.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CloudImageMessage {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.ZERO,
      imageUrl: isSet(object.imageUrl) ? globalThis.String(object.imageUrl) : "",
      metaUrl: isSet(object.metaUrl) ? globalThis.String(object.metaUrl) : "",
      commandsUrl: isSet(object.commandsUrl) ? globalThis.String(object.commandsUrl) : "",
      tags: isSet(object.tags) ? CloudTagMessage.fromJSON(object.tags) : undefined,
    };
  },

  toJSON(message: CloudImageMessage): unknown {
    const obj: any = {};
    if (!message.id.isZero()) {
      obj.id = (message.id || Long.ZERO).toString();
    }
    if (message.imageUrl !== "") {
      obj.imageUrl = message.imageUrl;
    }
    if (message.metaUrl !== "") {
      obj.metaUrl = message.metaUrl;
    }
    if (message.commandsUrl !== "") {
      obj.commandsUrl = message.commandsUrl;
    }
    if (message.tags !== undefined) {
      obj.tags = CloudTagMessage.toJSON(message.tags);
    }
    return obj;
  },
};

function createBaseCloudTagMessage(): CloudTagMessage {
  return { title: "", author: "", language: "", createdAt: Long.ZERO, createdInPrivateLobby: false, isOwn: false };
}

export const CloudTagMessage = {
  encode(message: CloudTagMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.author !== "") {
      writer.uint32(18).string(message.author);
    }
    if (message.language !== "") {
      writer.uint32(26).string(message.language);
    }
    if (!message.createdAt.isZero()) {
      writer.uint32(32).int64(message.createdAt);
    }
    if (message.createdInPrivateLobby === true) {
      writer.uint32(40).bool(message.createdInPrivateLobby);
    }
    if (message.isOwn === true) {
      writer.uint32(48).bool(message.isOwn);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CloudTagMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCloudTagMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.title = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.author = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.language = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.createdAt = reader.int64() as Long;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.createdInPrivateLobby = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.isOwn = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CloudTagMessage {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      author: isSet(object.author) ? globalThis.String(object.author) : "",
      language: isSet(object.language) ? globalThis.String(object.language) : "",
      createdAt: isSet(object.createdAt) ? Long.fromValue(object.createdAt) : Long.ZERO,
      createdInPrivateLobby: isSet(object.createdInPrivateLobby)
        ? globalThis.Boolean(object.createdInPrivateLobby)
        : false,
      isOwn: isSet(object.isOwn) ? globalThis.Boolean(object.isOwn) : false,
    };
  },

  toJSON(message: CloudTagMessage): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.author !== "") {
      obj.author = message.author;
    }
    if (message.language !== "") {
      obj.language = message.language;
    }
    if (!message.createdAt.isZero()) {
      obj.createdAt = (message.createdAt || Long.ZERO).toString();
    }
    if (message.createdInPrivateLobby === true) {
      obj.createdInPrivateLobby = message.createdInPrivateLobby;
    }
    if (message.isOwn === true) {
      obj.isOwn = message.isOwn;
    }
    return obj;
  },
};

/** Service definition for cloud resource access */
export type CloudDefinition = typeof CloudDefinition;
export const CloudDefinition = {
  name: "Cloud",
  fullName: "cloud.Cloud",
  methods: {
    searchCloud: {
      name: "SearchCloud",
      requestType: SearchCloudMessage,
      requestStream: false,
      responseType: CloudImageMessage,
      responseStream: true,
      options: {},
    },
  },
} as const;

export interface CloudServiceImplementation<CallContextExt = {}> {
  searchCloud(
    request: SearchCloudMessage,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<CloudImageMessage>;
}

export interface CloudClient<CallOptionsExt = {}> {
  searchCloud(request: SearchCloudMessage, options?: CallOptions & CallOptionsExt): AsyncIterable<CloudImageMessage>;
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export type ServerStreamingMethodResult<Response> = { [Symbol.asyncIterator](): AsyncIterator<Response, void> };
