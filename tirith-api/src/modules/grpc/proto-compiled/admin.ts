/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "admin";

/** Service definition for administration and management actions */
export type AdminDefinition = typeof AdminDefinition;
export const AdminDefinition = {
  name: "Admin",
  fullName: "admin.Admin",
  methods: {
    /** Reevaluates the last chunk of the drop cache */
    reevaluateDropChunks: {
      name: "ReevaluateDropChunks",
      requestType: Empty,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface AdminServiceImplementation<CallContextExt = {}> {
  /** Reevaluates the last chunk of the drop cache */
  reevaluateDropChunks(request: Empty, context: CallContext & CallContextExt): Promise<Empty>;
}

export interface AdminClient<CallOptionsExt = {}> {
  /** Reevaluates the last chunk of the drop cache */
  reevaluateDropChunks(request: Empty, options?: CallOptions & CallOptionsExt): Promise<Empty>;
}
