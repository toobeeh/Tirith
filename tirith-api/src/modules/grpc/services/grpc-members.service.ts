import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GrpcBaseService } from "./grpc-base";
import { MemberReply, MemberSearchReply, MembersDefinition } from "../proto-compiled/members";
import { IMembersService } from "src/services/interfaces/members.service.interface";
import { MemberDto, AccessTokenDto } from "src/modules/palantir/dto/member.dto";
import { MemberSearchDto } from "src/modules/palantir/dto/memberSearch.dto";
import { IGuildsService } from "src/services/interfaces/guilds.service.interface";
import { Long } from "@grpc/proto-loader";

@Injectable()
export class GrpcMembersService extends GrpcBaseService<MembersDefinition> implements IMembersService {

    constructor(config: ConfigService, @Inject(IGuildsService) private guildsService: IGuildsService) {
        super(MembersDefinition, config);
    }

    private mapMemberSearchDto(reply: MemberSearchReply): MemberSearchDto {
        return {
            userLogin: reply.login.toString(),
            userName: reply.username,
            rawMember: reply.raw
        };
    }

    private async mapMemberDto(reply: MemberReply): Promise<MemberDto> {

        const guilds = await Promise.all(reply.serverConnections.map(token => this.guildsService.getGuildByInvite(token)));
        const rawMember = await this.grpcClient.getRawMemberByLogin({ login: reply.login });

        return {
            ...reply,
            discordID: reply.discordId.toString(),
            userLogin: reply.login.toString(),
            userName: reply.username,
            guilds,
            rawMember
        }
    }

    async createMember(discordId: string, username: string, connectToTypo: boolean): Promise<MemberDto> {
        const member = await this.grpcClient.createNewMember({ discordId: Long.fromString(discordId), username, connectToTypoServer: connectToTypo });
        const mappedMember = await this.mapMemberDto(member);
        return mappedMember;
    }

    async wildcardSearch(query: string): Promise<MemberSearchDto[]> {
        const members = await this.collectFromMappedAsyncIterable(this.grpcClient.searchMember({ query }), item => this.mapMemberSearchDto(item));
        return members;
    }

    async getByLogin(login: number): Promise<MemberDto> {
        const member = await this.grpcClient.getMemberByLogin({ login });
        const mappedMember = await this.mapMemberDto(member);
        return mappedMember;
    }

    async getByAccessToken(accessToken: string): Promise<MemberDto> {
        const member = await this.grpcClient.getMemberByAccessToken({ accessToken });
        const mappedMember = await this.mapMemberDto(member);
        return mappedMember;
    }

    async getByDiscordID(id: string): Promise<MemberDto> {
        const member = await this.grpcClient.getMemberByDiscordId({ id: Long.fromString(id) });
        const mappedMember = await this.mapMemberDto(member);
        return mappedMember;
    }

    async updateDiscordID(login: number, newId: string): Promise<MemberDto> {
        const member = await this.grpcClient.updateMemberDiscordId({ login, discordId: Long.fromString(newId) });
        const mappedMember = await this.mapMemberDto(member);
        return mappedMember;
    }

    async clearDropBoost(login: number): Promise<void> {
        await this.grpcClient.clearMemberDropboost({ login });
    }

    async removeConnectedGuild(login: number, guildToken: number): Promise<void> {
        await this.grpcClient.removeMemberServerConnection({ login, serverToken: guildToken });
    }

    async connectMemberToGuild(login: number, guildToken: number): Promise<void> {
        await this.grpcClient.addMemberServerConnection({ login, serverToken: guildToken });
    }

    async getAccessToken(login: number): Promise<AccessTokenDto> {
        const token = await this.grpcClient.getAccessTokenByLogin({ login });
        return { Token: token.accessToken };
    }
}