/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";
import { StringValue } from "./google/protobuf/wrappers";

export const protobufPackage = "card";

export interface CardTemplateListingMessage {
  name: string;
}

export interface GetCardTemplateMessage {
  name: string;
}

export interface CardTemplateMessage {
  name: string;
  template: string;
  templateCss: string;
}

export interface GetMemberCardSettingsMessage {
  login: number;
}

export interface MemberCardSettingsMessage {
  headerOpacity: number;
  backgroundOpacity: number;
  backgroundImage: string | undefined;
  lightTextColor: string;
  darkTextColor: string;
  headerColor: string;
  templateName: string;
}

export interface SetMemberCardSettingsMessage {
  login: number;
  settings: MemberCardSettingsMessage | undefined;
}

function createBaseCardTemplateListingMessage(): CardTemplateListingMessage {
  return { name: "" };
}

export const CardTemplateListingMessage = {
  encode(message: CardTemplateListingMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CardTemplateListingMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCardTemplateListingMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CardTemplateListingMessage {
    return { name: isSet(object.name) ? globalThis.String(object.name) : "" };
  },

  toJSON(message: CardTemplateListingMessage): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },
};

function createBaseGetCardTemplateMessage(): GetCardTemplateMessage {
  return { name: "" };
}

export const GetCardTemplateMessage = {
  encode(message: GetCardTemplateMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCardTemplateMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCardTemplateMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetCardTemplateMessage {
    return { name: isSet(object.name) ? globalThis.String(object.name) : "" };
  },

  toJSON(message: GetCardTemplateMessage): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },
};

function createBaseCardTemplateMessage(): CardTemplateMessage {
  return { name: "", template: "", templateCss: "" };
}

export const CardTemplateMessage = {
  encode(message: CardTemplateMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.template !== "") {
      writer.uint32(18).string(message.template);
    }
    if (message.templateCss !== "") {
      writer.uint32(26).string(message.templateCss);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CardTemplateMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCardTemplateMessage();
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
          if (tag !== 18) {
            break;
          }

          message.template = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.templateCss = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CardTemplateMessage {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      template: isSet(object.template) ? globalThis.String(object.template) : "",
      templateCss: isSet(object.templateCss) ? globalThis.String(object.templateCss) : "",
    };
  },

  toJSON(message: CardTemplateMessage): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.template !== "") {
      obj.template = message.template;
    }
    if (message.templateCss !== "") {
      obj.templateCss = message.templateCss;
    }
    return obj;
  },
};

function createBaseGetMemberCardSettingsMessage(): GetMemberCardSettingsMessage {
  return { login: 0 };
}

export const GetMemberCardSettingsMessage = {
  encode(message: GetMemberCardSettingsMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetMemberCardSettingsMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMemberCardSettingsMessage();
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

  fromJSON(object: any): GetMemberCardSettingsMessage {
    return { login: isSet(object.login) ? globalThis.Number(object.login) : 0 };
  },

  toJSON(message: GetMemberCardSettingsMessage): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    return obj;
  },
};

function createBaseMemberCardSettingsMessage(): MemberCardSettingsMessage {
  return {
    headerOpacity: 0,
    backgroundOpacity: 0,
    backgroundImage: undefined,
    lightTextColor: "",
    darkTextColor: "",
    headerColor: "",
    templateName: "",
  };
}

export const MemberCardSettingsMessage = {
  encode(message: MemberCardSettingsMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.headerOpacity !== 0) {
      writer.uint32(9).double(message.headerOpacity);
    }
    if (message.backgroundOpacity !== 0) {
      writer.uint32(17).double(message.backgroundOpacity);
    }
    if (message.backgroundImage !== undefined) {
      StringValue.encode({ value: message.backgroundImage! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.lightTextColor !== "") {
      writer.uint32(34).string(message.lightTextColor);
    }
    if (message.darkTextColor !== "") {
      writer.uint32(42).string(message.darkTextColor);
    }
    if (message.headerColor !== "") {
      writer.uint32(50).string(message.headerColor);
    }
    if (message.templateName !== "") {
      writer.uint32(58).string(message.templateName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MemberCardSettingsMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMemberCardSettingsMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.headerOpacity = reader.double();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.backgroundOpacity = reader.double();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.backgroundImage = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.lightTextColor = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.darkTextColor = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.headerColor = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.templateName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MemberCardSettingsMessage {
    return {
      headerOpacity: isSet(object.headerOpacity) ? globalThis.Number(object.headerOpacity) : 0,
      backgroundOpacity: isSet(object.backgroundOpacity) ? globalThis.Number(object.backgroundOpacity) : 0,
      backgroundImage: isSet(object.backgroundImage) ? String(object.backgroundImage) : undefined,
      lightTextColor: isSet(object.lightTextColor) ? globalThis.String(object.lightTextColor) : "",
      darkTextColor: isSet(object.darkTextColor) ? globalThis.String(object.darkTextColor) : "",
      headerColor: isSet(object.headerColor) ? globalThis.String(object.headerColor) : "",
      templateName: isSet(object.templateName) ? globalThis.String(object.templateName) : "",
    };
  },

  toJSON(message: MemberCardSettingsMessage): unknown {
    const obj: any = {};
    if (message.headerOpacity !== 0) {
      obj.headerOpacity = message.headerOpacity;
    }
    if (message.backgroundOpacity !== 0) {
      obj.backgroundOpacity = message.backgroundOpacity;
    }
    if (message.backgroundImage !== undefined) {
      obj.backgroundImage = message.backgroundImage;
    }
    if (message.lightTextColor !== "") {
      obj.lightTextColor = message.lightTextColor;
    }
    if (message.darkTextColor !== "") {
      obj.darkTextColor = message.darkTextColor;
    }
    if (message.headerColor !== "") {
      obj.headerColor = message.headerColor;
    }
    if (message.templateName !== "") {
      obj.templateName = message.templateName;
    }
    return obj;
  },
};

function createBaseSetMemberCardSettingsMessage(): SetMemberCardSettingsMessage {
  return { login: 0, settings: undefined };
}

export const SetMemberCardSettingsMessage = {
  encode(message: SetMemberCardSettingsMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.login !== 0) {
      writer.uint32(8).int32(message.login);
    }
    if (message.settings !== undefined) {
      MemberCardSettingsMessage.encode(message.settings, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetMemberCardSettingsMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetMemberCardSettingsMessage();
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

          message.settings = MemberCardSettingsMessage.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SetMemberCardSettingsMessage {
    return {
      login: isSet(object.login) ? globalThis.Number(object.login) : 0,
      settings: isSet(object.settings) ? MemberCardSettingsMessage.fromJSON(object.settings) : undefined,
    };
  },

  toJSON(message: SetMemberCardSettingsMessage): unknown {
    const obj: any = {};
    if (message.login !== 0) {
      obj.login = Math.round(message.login);
    }
    if (message.settings !== undefined) {
      obj.settings = MemberCardSettingsMessage.toJSON(message.settings);
    }
    return obj;
  },
};

/** Service definition for card resource access */
export type CardDefinition = typeof CardDefinition;
export const CardDefinition = {
  name: "Card",
  fullName: "card.Card",
  methods: {
    /** get all available card templates */
    getCardTemplates: {
      name: "GetCardTemplates",
      requestType: Empty,
      requestStream: false,
      responseType: CardTemplateListingMessage,
      responseStream: true,
      options: {},
    },
    /** get a single card template */
    getCardTemplate: {
      name: "GetCardTemplate",
      requestType: GetCardTemplateMessage,
      requestStream: false,
      responseType: CardTemplateMessage,
      responseStream: false,
      options: {},
    },
    /** get member card settings */
    getMemberCardSettings: {
      name: "GetMemberCardSettings",
      requestType: GetMemberCardSettingsMessage,
      requestStream: false,
      responseType: MemberCardSettingsMessage,
      responseStream: false,
      options: {},
    },
    /** set member card settings */
    setMemberCardSettings: {
      name: "SetMemberCardSettings",
      requestType: SetMemberCardSettingsMessage,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface CardServiceImplementation<CallContextExt = {}> {
  /** get all available card templates */
  getCardTemplates(
    request: Empty,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<CardTemplateListingMessage>;
  /** get a single card template */
  getCardTemplate(request: GetCardTemplateMessage, context: CallContext & CallContextExt): Promise<CardTemplateMessage>;
  /** get member card settings */
  getMemberCardSettings(
    request: GetMemberCardSettingsMessage,
    context: CallContext & CallContextExt,
  ): Promise<MemberCardSettingsMessage>;
  /** set member card settings */
  setMemberCardSettings(request: SetMemberCardSettingsMessage, context: CallContext & CallContextExt): Promise<Empty>;
}

export interface CardClient<CallOptionsExt = {}> {
  /** get all available card templates */
  getCardTemplates(request: Empty, options?: CallOptions & CallOptionsExt): AsyncIterable<CardTemplateListingMessage>;
  /** get a single card template */
  getCardTemplate(
    request: GetCardTemplateMessage,
    options?: CallOptions & CallOptionsExt,
  ): Promise<CardTemplateMessage>;
  /** get member card settings */
  getMemberCardSettings(
    request: GetMemberCardSettingsMessage,
    options?: CallOptions & CallOptionsExt,
  ): Promise<MemberCardSettingsMessage>;
  /** set member card settings */
  setMemberCardSettings(request: SetMemberCardSettingsMessage, options?: CallOptions & CallOptionsExt): Promise<Empty>;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export type ServerStreamingMethodResult<Response> = { [Symbol.asyncIterator](): AsyncIterator<Response, void> };
