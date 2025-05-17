import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {GrpcBaseService} from "./grpc-base";
import {
    DropLogReply,
    LobbiesDefinition,
    SkribblLobbyMessage,
    SkribblLobbySkribblPlayerMessage,
    SkribblLobbyStateMessage,
    SkribblLobbyTypoMemberMessage,
    SkribblLobbyTypoMembersMessage
} from "../proto-compiled/lobbies";
import {ILobbiesService} from "src/services/interfaces/lobbies.service.interface";
import {DropDto} from "src/modules/palantir/dto/drops.dto";
import {
    LobbyPlayerDto, OnlineLobbyDto, OnlineLobbySkribblDetailsDto, OnlineLobbyTypoPlayerDto,
} from "src/modules/palantir/dto/lobbies.dto";
import {Long} from "@grpc/proto-loader";

@Injectable()
export class GrpcLobbiesService extends GrpcBaseService<LobbiesDefinition> implements ILobbiesService {

    constructor(config: ConfigService) {
        super(LobbiesDefinition, config);
    }

    mapLobbyPlayerDto(reply: SkribblLobbySkribblPlayerMessage, lobby: SkribblLobbyStateMessage): LobbyPlayerDto {
        return {
            score: reply.score,
            name: reply.name,
            drawing: reply.playerId == lobby.drawerId,
            lobbyPlayerId: reply.playerId
        };
    }

    mapDropDto(reply: DropLogReply): DropDto {
        return {
            DropID: reply.id.toNumber(),
            EventDropID: reply.eventDropId,
            CaughtLobbyKey: reply.lobbyKey,
            CaughtLobbyPlayerID: reply.claimDiscordId.toString(),
            ValidFrom: reply.validFrom,
            LeagueWeight: reply.leagueTime
        };
    }

    mapSkribblLobbyDetailsToDto(lobby: SkribblLobbyStateMessage): OnlineLobbySkribblDetailsDto {
        return {
            id: lobby.lobbyId,
            private: Number.isInteger(lobby.ownerId),
            round: lobby.round,
            language: lobby.settings.language,
            players: lobby.players.map(player => this.mapLobbyPlayerDto(player, lobby)),
        }
    }

    mapTypoPlayerToDto(member: SkribblLobbyTypoMemberMessage): OnlineLobbyTypoPlayerDto {
        return {
            lobbyPlayerID: member.lobbyPlayerId,
            login: member.login
        }
    }

    mapSkribblLobbyToDto(lobby: SkribblLobbyMessage, members: SkribblLobbyTypoMembersMessage[]): OnlineLobbyDto {
        return {
            description: lobby.typoSettings.description,
            lastUpdated: lobby.typoSettings.LastUpdated.getTime().toString(),
            ownershipClaim: lobby.typoSettings.LobbyOwnershipClaim.toString(),
            skribblDetails: this.mapSkribblLobbyDetailsToDto(lobby.skribblState),
            typoPlayers: members.filter(member => member.lobbyId == lobby.typoSettings.lobbyId).flatMap(lobby => lobby.members.map(member => this.mapTypoPlayerToDto(member))),
        }
    }

    async getAllLobbies(): Promise<OnlineLobbyDto[]> {
        const members = await this.collectFromAsyncIterable(this.grpcClient.getOnlineLobbyPlayers({guildId: undefined}));
        const lobbies = await this.collectFromMappedAsyncIterable(this.grpcClient.getLobbiesById({lobbyIds: members.map(lobby => lobby.lobbyId)}), lobby => this.mapSkribblLobbyToDto(lobby, members));
        return lobbies;
    }

    async getLobbyDrops(key: string): Promise<DropDto[]> {
        const drops = await this.collectFromMappedAsyncIterable(this.grpcClient.getLobbyDropClaims({ lobbyKey: key }), drop => this.mapDropDto(drop));
        return drops;
    }

    async decryptLobbyLinkToken(token: string): Promise<{link: string, guildId: Long}> {
        const response = await this.grpcClient.decryptLobbyLinkToken({token});
        return response;
    }

    async encryptLobbyLinkToken(link: string, guildId: string): Promise<string> {
        const response = await this.grpcClient.encryptLobbyLinkToken({link, guildId: Long.fromString(guildId)});
        return response.token;
    }
}