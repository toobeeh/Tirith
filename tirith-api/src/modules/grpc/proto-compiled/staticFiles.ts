/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import { FileChunkMessage } from "./content";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "staticFiles";

export enum FileType {
  Sprite = 0,
  Scene = 1,
  EventSprite = 2,
  Drop = 3,
  UNRECOGNIZED = -1,
}

export function fileTypeFromJSON(object: any): FileType {
  switch (object) {
    case 0:
    case "Sprite":
      return FileType.Sprite;
    case 1:
    case "Scene":
      return FileType.Scene;
    case 2:
    case "EventSprite":
      return FileType.EventSprite;
    case 3:
    case "Drop":
      return FileType.Drop;
    case -1:
    case "UNRECOGNIZED":
    default:
      return FileType.UNRECOGNIZED;
  }
}

export function fileTypeToJSON(object: FileType): string {
  switch (object) {
    case FileType.Sprite:
      return "Sprite";
    case FileType.Scene:
      return "Scene";
    case FileType.EventSprite:
      return "EventSprite";
    case FileType.Drop:
      return "Drop";
    case FileType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface FileInformationMessage {
  name: string;
  type: FileType;
}

export interface AddFileMessage {
  fileChunk?: FileChunkMessage | undefined;
  fileInformation?: FileInformationMessage | undefined;
}

function createBaseFileInformationMessage(): FileInformationMessage {
  return { name: "", type: 0 };
}

export const FileInformationMessage = {
  encode(message: FileInformationMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FileInformationMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFileInformationMessage();
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

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FileInformationMessage {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      type: isSet(object.type) ? fileTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: FileInformationMessage): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.type !== 0) {
      obj.type = fileTypeToJSON(message.type);
    }
    return obj;
  },
};

function createBaseAddFileMessage(): AddFileMessage {
  return { fileChunk: undefined, fileInformation: undefined };
}

export const AddFileMessage = {
  encode(message: AddFileMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fileChunk !== undefined) {
      FileChunkMessage.encode(message.fileChunk, writer.uint32(10).fork()).ldelim();
    }
    if (message.fileInformation !== undefined) {
      FileInformationMessage.encode(message.fileInformation, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddFileMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddFileMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fileChunk = FileChunkMessage.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.fileInformation = FileInformationMessage.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddFileMessage {
    return {
      fileChunk: isSet(object.fileChunk) ? FileChunkMessage.fromJSON(object.fileChunk) : undefined,
      fileInformation: isSet(object.fileInformation)
        ? FileInformationMessage.fromJSON(object.fileInformation)
        : undefined,
    };
  },

  toJSON(message: AddFileMessage): unknown {
    const obj: any = {};
    if (message.fileChunk !== undefined) {
      obj.fileChunk = FileChunkMessage.toJSON(message.fileChunk);
    }
    if (message.fileInformation !== undefined) {
      obj.fileInformation = FileInformationMessage.toJSON(message.fileInformation);
    }
    return obj;
  },
};

export type StaticFilesDefinition = typeof StaticFilesDefinition;
export const StaticFilesDefinition = {
  name: "StaticFiles",
  fullName: "staticFiles.StaticFiles",
  methods: {
    /** Add a new file to the static data repo */
    addFile: {
      name: "AddFile",
      requestType: AddFileMessage,
      requestStream: true,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface StaticFilesServiceImplementation<CallContextExt = {}> {
  /** Add a new file to the static data repo */
  addFile(request: AsyncIterable<AddFileMessage>, context: CallContext & CallContextExt): Promise<Empty>;
}

export interface StaticFilesClient<CallOptionsExt = {}> {
  /** Add a new file to the static data repo */
  addFile(request: AsyncIterable<AddFileMessage>, options?: CallOptions & CallOptionsExt): Promise<Empty>;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
