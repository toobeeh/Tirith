/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import Long = require("long");
import * as _m0 from "protobufjs/minimal";
import { FileChunkMessage } from "./content";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "objectStorage";

export interface CloudImageIdentificationMessage {
  imageId: Long;
  userFolder: string;
}

export interface SaveImageToCloudMessage {
  imageFileChunk?: FileChunkMessage | undefined;
  commandsFileChunk?: FileChunkMessage | undefined;
  metaFileChunk?: FileChunkMessage | undefined;
  imageIdentification?: CloudImageIdentificationMessage | undefined;
}

export interface DeleteImagesFromCloudMessage {
  imageIdentifications: CloudImageIdentificationMessage[];
}

function createBaseCloudImageIdentificationMessage(): CloudImageIdentificationMessage {
  return { imageId: Long.ZERO, userFolder: "" };
}

export const CloudImageIdentificationMessage = {
  encode(message: CloudImageIdentificationMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.imageId.isZero()) {
      writer.uint32(8).int64(message.imageId);
    }
    if (message.userFolder !== "") {
      writer.uint32(18).string(message.userFolder);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CloudImageIdentificationMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCloudImageIdentificationMessage();
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

          message.userFolder = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CloudImageIdentificationMessage {
    return {
      imageId: isSet(object.imageId) ? Long.fromValue(object.imageId) : Long.ZERO,
      userFolder: isSet(object.userFolder) ? globalThis.String(object.userFolder) : "",
    };
  },

  toJSON(message: CloudImageIdentificationMessage): unknown {
    const obj: any = {};
    if (!message.imageId.isZero()) {
      obj.imageId = (message.imageId || Long.ZERO).toString();
    }
    if (message.userFolder !== "") {
      obj.userFolder = message.userFolder;
    }
    return obj;
  },
};

function createBaseSaveImageToCloudMessage(): SaveImageToCloudMessage {
  return {
    imageFileChunk: undefined,
    commandsFileChunk: undefined,
    metaFileChunk: undefined,
    imageIdentification: undefined,
  };
}

export const SaveImageToCloudMessage = {
  encode(message: SaveImageToCloudMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.imageFileChunk !== undefined) {
      FileChunkMessage.encode(message.imageFileChunk, writer.uint32(10).fork()).ldelim();
    }
    if (message.commandsFileChunk !== undefined) {
      FileChunkMessage.encode(message.commandsFileChunk, writer.uint32(18).fork()).ldelim();
    }
    if (message.metaFileChunk !== undefined) {
      FileChunkMessage.encode(message.metaFileChunk, writer.uint32(26).fork()).ldelim();
    }
    if (message.imageIdentification !== undefined) {
      CloudImageIdentificationMessage.encode(message.imageIdentification, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SaveImageToCloudMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSaveImageToCloudMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.imageFileChunk = FileChunkMessage.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.commandsFileChunk = FileChunkMessage.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.metaFileChunk = FileChunkMessage.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.imageIdentification = CloudImageIdentificationMessage.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SaveImageToCloudMessage {
    return {
      imageFileChunk: isSet(object.imageFileChunk) ? FileChunkMessage.fromJSON(object.imageFileChunk) : undefined,
      commandsFileChunk: isSet(object.commandsFileChunk)
        ? FileChunkMessage.fromJSON(object.commandsFileChunk)
        : undefined,
      metaFileChunk: isSet(object.metaFileChunk) ? FileChunkMessage.fromJSON(object.metaFileChunk) : undefined,
      imageIdentification: isSet(object.imageIdentification)
        ? CloudImageIdentificationMessage.fromJSON(object.imageIdentification)
        : undefined,
    };
  },

  toJSON(message: SaveImageToCloudMessage): unknown {
    const obj: any = {};
    if (message.imageFileChunk !== undefined) {
      obj.imageFileChunk = FileChunkMessage.toJSON(message.imageFileChunk);
    }
    if (message.commandsFileChunk !== undefined) {
      obj.commandsFileChunk = FileChunkMessage.toJSON(message.commandsFileChunk);
    }
    if (message.metaFileChunk !== undefined) {
      obj.metaFileChunk = FileChunkMessage.toJSON(message.metaFileChunk);
    }
    if (message.imageIdentification !== undefined) {
      obj.imageIdentification = CloudImageIdentificationMessage.toJSON(message.imageIdentification);
    }
    return obj;
  },
};

function createBaseDeleteImagesFromCloudMessage(): DeleteImagesFromCloudMessage {
  return { imageIdentifications: [] };
}

export const DeleteImagesFromCloudMessage = {
  encode(message: DeleteImagesFromCloudMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.imageIdentifications) {
      CloudImageIdentificationMessage.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteImagesFromCloudMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteImagesFromCloudMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.imageIdentifications.push(CloudImageIdentificationMessage.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteImagesFromCloudMessage {
    return {
      imageIdentifications: globalThis.Array.isArray(object?.imageIdentifications)
        ? object.imageIdentifications.map((e: any) => CloudImageIdentificationMessage.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DeleteImagesFromCloudMessage): unknown {
    const obj: any = {};
    if (message.imageIdentifications?.length) {
      obj.imageIdentifications = message.imageIdentifications.map((e) => CloudImageIdentificationMessage.toJSON(e));
    }
    return obj;
  },
};

export type ObjectStorageDefinition = typeof ObjectStorageDefinition;
export const ObjectStorageDefinition = {
  name: "ObjectStorage",
  fullName: "objectStorage.ObjectStorage",
  methods: {
    /** Upload an image to the cloud and save its tags */
    saveImageToCloud: {
      name: "SaveImageToCloud",
      requestType: SaveImageToCloudMessage,
      requestStream: true,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** Delete an image from the cloud */
    deleteImageFromCloud: {
      name: "DeleteImageFromCloud",
      requestType: CloudImageIdentificationMessage,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface ObjectStorageServiceImplementation<CallContextExt = {}> {
  /** Upload an image to the cloud and save its tags */
  saveImageToCloud(
    request: AsyncIterable<SaveImageToCloudMessage>,
    context: CallContext & CallContextExt,
  ): Promise<Empty>;
  /** Delete an image from the cloud */
  deleteImageFromCloud(request: CloudImageIdentificationMessage, context: CallContext & CallContextExt): Promise<Empty>;
}

export interface ObjectStorageClient<CallOptionsExt = {}> {
  /** Upload an image to the cloud and save its tags */
  saveImageToCloud(
    request: AsyncIterable<SaveImageToCloudMessage>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<Empty>;
  /** Delete an image from the cloud */
  deleteImageFromCloud(
    request: CloudImageIdentificationMessage,
    options?: CallOptions & CallOptionsExt,
  ): Promise<Empty>;
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
