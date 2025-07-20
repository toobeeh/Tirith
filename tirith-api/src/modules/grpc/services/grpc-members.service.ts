import {Inject, Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {GrpcBaseService} from "./grpc-base";
import {MemberFlagMessage, MemberReply, MembersDefinition, MemberSearchReply} from "../proto-compiled/members";
import {IMembersService} from "src/services/interfaces/members.service.interface";
import {AccessTokenDto, MemberDto, MemberFlagDto} from "src/modules/palantir/dto/member.dto";
import {MemberSearchDto} from "src/modules/palantir/dto/memberSearch.dto";
import {IGuildsService} from "src/services/interfaces/guilds.service.interface";
import {Long} from "@grpc/proto-loader";

@Injectable()
export class GrpcMembersService extends GrpcBaseService<MembersDefinition> implements IMembersService {

    constructor(config: ConfigService, @Inject(IGuildsService) private guildsService: IGuildsService) {
        super(MembersDefinition, config);
    }

    private mapMemberSearchDto(reply: MemberSearchReply): MemberSearchDto {
        return {
            userLogin: reply.login.toString(),
            typoId: reply.login,
            userName: reply.username,
            rawMember: reply.raw
        };
    }

    private mapFlag(flag: MemberFlagMessage): MemberFlagDto | undefined {
        switch (flag) {
            case MemberFlagMessage.Admin: return MemberFlagDto.Admin;
            case MemberFlagMessage.Moderator: return MemberFlagDto.Moderator;
            case MemberFlagMessage.Patron: return MemberFlagDto.Patron;
            case MemberFlagMessage.Patronizer: return MemberFlagDto.Patronizer;
            case MemberFlagMessage.Booster: return MemberFlagDto.Booster;
            case MemberFlagMessage.DropBan: return MemberFlagDto.DropBan;
            case MemberFlagMessage.PermaBan: return MemberFlagDto.PermaBan;
            case MemberFlagMessage.Beta: return MemberFlagDto.Beta;
            case MemberFlagMessage.BubbleFarming: return MemberFlagDto.BubbleFarming;
            case MemberFlagMessage.UnlimitedCloud: return MemberFlagDto.UnlimitedCloud;
            case MemberFlagMessage.ContentModerator: return MemberFlagDto.ContentModerator;
            case MemberFlagMessage.EmojiManagement: return MemberFlagDto.EmojiManagement;
            case MemberFlagMessage.UNRECOGNIZED: return undefined;
        }
    }

    private async mapMemberDto(reply: MemberReply): Promise<MemberDto> {

        const guilds = await Promise.all(reply.serverConnections.map(id => this.guildsService.getGuildById(id.toString())));
        const rawMember = await this.grpcClient.getRawMemberByLogin({ login: reply.login });

        return {
            ...reply,
            discordID: reply.discordId.toString(),
            userLogin: reply.login.toString(),
            typoId: reply.login,
            userName: reply.username,
            guilds,
            rawMember,
            memberFlags: reply.mappedFlags.map(flag => this.mapFlag(flag)).filter(flag => flag !== undefined)
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