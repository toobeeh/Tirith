/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "content";

export interface FileChunkMessage {
  chunk: Uint8Array;
  chunkIndex: number;
  name: string;
  fileType: string;
}

function createBaseFileChunkMessage(): FileChunkMessage {
  return { chunk: new Uint8Array(0), chunkIndex: 0, name: "", fileType: "" };
}

export const FileChunkMessage = {
  encode(message: FileChunkMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chunk.length !== 0) {
      writer.uint32(10).bytes(message.chunk);
    }
    if (message.chunkIndex !== 0) {
      writer.uint32(16).int32(message.chunkIndex);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.fileType !== "") {
      writer.uint32(34).string(message.fileType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FileChunkMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFileChunkMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.chunk = reader.bytes();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.chunkIndex = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.fileType = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FileChunkMessage {
    return {
      chunk: isSet(object.chunk) ? bytesFromBase64(object.chunk) : new Uint8Array(0),
      chunkIndex: isSet(object.chunkIndex) ? globalThis.Number(object.chunkIndex) : 0,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      fileType: isSet(object.fileType) ? globalThis.String(object.fileType) : "",
    };
  },

  toJSON(message: FileChunkMessage): unknown {
    const obj: any = {};
    if (message.chunk.length !== 0) {
      obj.chunk = base64FromBytes(message.chunk);
    }
    if (message.chunkIndex !== 0) {
      obj.chunkIndex = Math.round(message.chunkIndex);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.fileType !== "") {
      obj.fileType = message.fileType;
    }
    return obj;
  },
};

export type ContentDefinition = typeof ContentDefinition;
export const ContentDefinition = { name: "Content", fullName: "content.Content", methods: {} } as const;

export interface ContentServiceImplementation<CallContextExt = {}> {
}

export interface ContentClient<CallOptionsExt = {}> {
}

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
