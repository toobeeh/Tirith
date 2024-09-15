// Function to create byte chunks for gRPC messages
import {FileChunkMessage} from "../modules/grpc/proto-compiled/content";

export function createByteChunks(bytes: Uint8Array, fileName: string, fileType: string): FileChunkMessage[] {
    const chunkSize = 64 * 1024; // 64 KB
    const byteChunks: Uint8Array[] = [];

    // Split bytes into chunks
    for (let i = 0; i < bytes.length; i += chunkSize) {
        byteChunks.push(bytes.slice(i, i + chunkSize));
    }

    // Create FileChunkMessage objects for each chunk
    return byteChunks.map((chunk, index) => {
        return {
            chunkIndex: index,
            chunk: chunk,
            name: fileName,
            fileType: fileType
        } as FileChunkMessage;
    });
}

// create an async iterator of an already existing array
export function asyncIteratorFromArray<T>(array: T[]): AsyncIterable<T> {
    return {
        [Symbol.asyncIterator]() {
            let index = 0;
            return {
                next(): Promise<IteratorResult<T>> {
                    if (index < array.length) {
                        return Promise.resolve({value: array[index++], done: false});
                    } else {
                        return Promise.resolve({done: true, value: null});
                    }
                }
            };
        }
    };
}