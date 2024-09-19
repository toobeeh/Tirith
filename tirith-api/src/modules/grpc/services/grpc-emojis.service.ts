import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {GrpcBaseService} from "./grpc-base";
import {EmojiCandidateMessage, EmojiMessage, EmojisDefinition} from "../proto-compiled/emojis";
import {IEmojisService} from "../../../services/interfaces/emojis.service.interface";
import {EmojiCandidateDto, EmojiDto} from "../../palantir/dto/emojis.dto";

@Injectable()
export class GrpcEmojisService extends GrpcBaseService<EmojisDefinition> implements IEmojisService {

    constructor(config: ConfigService) {
        super(EmojisDefinition, config, "GRPC_EMOJI_CHANNEL");
    }

    private emojiMessageToDto(message: EmojiMessage): EmojiDto {
        return {
            name: message.id.name,
            nameId: message.id.nameId,
            url: message.url,
            animated: message.animated
        };
    }

    private emojiCandidateToDto(message: EmojiCandidateMessage): EmojiCandidateDto {
        return {... message};
    }

    async searchSavedEmojis(name: string, limit: number, animated: boolean, statics: boolean): Promise<Array<EmojiDto>> {
        const emojis = await this.collectFromMappedAsyncIterable(
            this.grpcClient.listEmojis({name: name, maxCount: limit, animated: animated, static: statics}),
            emoji => this.emojiMessageToDto(emoji));

        return emojis;
    }

    async searchNewEmojis(name: string, limit: number, animated: boolean, statics: boolean): Promise<Array<EmojiCandidateDto>> {
        const emojis = await this.collectFromMappedAsyncIterable(
            this.grpcClient.loadNewEmojiCandidates({name: name, maxCount: limit, animated: animated, static: statics}),
            emoji => this.emojiCandidateToDto(emoji));

        return emojis;
    }

    async saveEmoji(emoji: EmojiCandidateDto): Promise<EmojiDto> {
        const message = await this.grpcClient.addEmoji(emoji);
        const addedEmoji = await this.grpcClient.getEmoji(message);
        return this.emojiMessageToDto(addedEmoji);
    }

    async deleteEmoji(name: string, nameId: number): Promise<void> {
        await this.grpcClient.removeEmoji({name, nameId});
    }

    async getEmoji(name: string, nameId: number): Promise<EmojiDto> {
        const message = await this.grpcClient.getEmoji({name, nameId});
        return this.emojiMessageToDto(message);
    }
}