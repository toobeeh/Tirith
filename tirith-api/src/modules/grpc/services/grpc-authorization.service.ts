import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {GrpcBaseService} from "./grpc-base";
import {AuthorizationDefinition} from "../proto-compiled/authorization";
import {IAuthorizationService} from "../../../services/interfaces/authorization.service.interface";

@Injectable()
export class GrpcAuthorizationService extends GrpcBaseService<AuthorizationDefinition> implements IAuthorizationService {

    constructor(config: ConfigService) {
        super(AuthorizationDefinition, config);
    }

    async createJwt(typoId: number, expiryMs: number, applicationName: string, redirectUri: string, scopes: string[]): Promise<string> {
        const response = await this.grpcClient.createJwt({
            typoId,
            applicationName,
            redirectUri,
            scopes,
            expiry: new Date(Date.now() + expiryMs)
        });
        return response.jwt;
    }
}