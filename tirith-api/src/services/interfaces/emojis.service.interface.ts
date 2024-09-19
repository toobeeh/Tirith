import {EmojiCandidateDto, EmojiDto} from "../../modules/palantir/dto/emojis.dto";

export const IEmojisService = Symbol("IEmojisService");

export interface IEmojisService {
    searchSavedEmojis(name: string, limit: number, animated: boolean, statics: boolean): Promise<Array<EmojiDto>>;

    searchNewEmojis(name: string, limit: number, animated: boolean, statics: boolean): Promise<Array<EmojiCandidateDto>>;

    saveEmoji(emoji: EmojiCandidateDto): Promise<EmojiDto>;

    deleteEmoji(name: string, nameId: number): Promise<void>;

    getEmoji(name: string, nameId: number): Promise<EmojiDto>;
}