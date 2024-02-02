import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GrpcBaseService } from "./grpc-base";
import { DropLogReply, LobbiesDefinition, LobbyReply, PalantirLobbyDetails, PalantirLobbyPlayer, SkribblLobbyDetails, SkribblLobbyPlayer } from "../proto-compiled/lobbies";
import { ILobbiesService } from "src/services/interfaces/lobbies.service.interface";
import { DropDto } from "src/modules/palantir/dto/drops.dto";
import { LobbiesResponseDto, LobbyDetailsDto, LobbyPlayerDto, PalantirLobbyDto, PalantirLobbyPlayerDto } from "src/modules/palantir/dto/lobbies.dto";

@Injectable()
export class GrpcLobbiesService extends GrpcBaseService<LobbiesDefinition> implements ILobbiesService {

    constructor(config: ConfigService) {
        super(LobbiesDefinition, config);
    }

    mapPalantirLobbyDto(reply: PalantirLobbyDetails): PalantirLobbyDto {
        return {
            Description: reply.description, // TODO change casing in dtos
            Restriction: reply.restriction,
            ID: reply.id,
            Key: reply.key
        };
    }

    mapSkribblLobbyDto(reply: SkribblLobbyDetails): LobbyDetailsDto {
        return {
            Players: reply.players.map(player => this.mapLobbyPlayerDto(player)),
            Language: reply.language,
            Round: reply.round.toString(),
            Link: reply.link,
            Private: reply.private
        };
    }

    mapLobbyPlayerDto(reply: SkribblLobbyPlayer): LobbyPlayerDto {
        return {
            Score: reply.score,
            Name: reply.name,
            Drawing: reply.drawing,
            LobbyPlayerID: reply.lobbyPlayerId
        };
    }

    mapPalantirLobbyPlayerDto(reply: PalantirLobbyPlayer): PalantirLobbyPlayerDto {
        return {
            ...reply, // d
            login: reply.login.toString()
        };
    }

    mapLobbyResponseDto(reply: LobbyReply): LobbiesResponseDto {
        return {
            lobby: this.mapPalantirLobbyDto(reply.palantirDetails),
            details: this.mapSkribblLobbyDto(reply.skribblDetails),
            players: reply.players.map(player => this.mapPalantirLobbyPlayerDto(player))
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

    async inspectLobbies(): Promise<LobbiesResponseDto[]> {
        const lobbies = await this.collectFromMappedAsyncIterable(this.grpcClient.getCurrentLobbies({}), lobby => this.mapLobbyResponseDto(lobby));
        return lobbies;
    }

    async getLobbyDrops(key: string): Promise<DropDto[]> {
        const drops = await this.collectFromMappedAsyncIterable(this.grpcClient.getLobbyDropClaims({ lobbyKey: key }), drop => this.mapDropDto(drop));
        return drops;
    }
}