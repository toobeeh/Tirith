export const IAdminService = Symbol("IAdminService");

export interface IAdminService {

    reevaluateDropChunks(): Promise<void>;
}