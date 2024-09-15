
import { ConfigService } from "@nestjs/config";
import { Client, CompatServiceDefinition, createChannel, createClient } from "nice-grpc";

export abstract class GrpcBaseService<TService extends CompatServiceDefinition> {

    protected readonly grpcClient: Client<TService>;

    constructor(definitionClass: TService, config: ConfigService, configChannelKey = "GRPC_VALMAR_CHANNEL") {
        const channelUrl = config.getOrThrow(configChannelKey);
        const channel = createChannel(channelUrl);
        this.grpcClient = createClient(definitionClass, channel);
    }

    protected async collectFromAsyncIterable<TItem>(iterable: AsyncIterable<TItem>): Promise<TItem[]> {
        const items = [];
        for await (const item of iterable) {
            items.push(item);
        }

        return items;
    }

    protected async collectFromAsyncMappedAsyncIterable<TResult, TItem>(iterable: AsyncIterable<TItem>, mapping: (item: TItem) => Promise<TResult>): Promise<TResult[]> {
        const items = [];
        for await (const item of iterable) {
            try {
                items.push(await mapping(item));
            }
            catch (e) {
                console.log(e);
                throw e;
            }
        }

        return items;
    }

    protected async collectFromMappedAsyncIterable<TResult, TItem>(iterable: AsyncIterable<TItem>, mapping: (item: TItem) => TResult): Promise<TResult[]> {
        const items = [];
        for await (const item of iterable) {
            try {
                items.push(mapping(item));
            }
            catch (e) {
                console.log(e);
                throw e;
            }
        }

        return items;
    }

}