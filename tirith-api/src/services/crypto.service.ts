/*
https://docs.nestjs.com/providers#services
*/

import {Injectable, Scope} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import * as fs from "node:fs";
import * as crypto from "node:crypto";
import * as forge from "node-forge";

export interface jwksKey {
    kty: string;
    use: string;
    kid: string;
    alg: string;
    n: string;
    e: string;
    d?: string; // private key is not exposed in JWKS
}

@Injectable({scope: Scope.DEFAULT})
export class CryptoService {

    private readonly _privateKey: string;
    private readonly _publicKey: string;
    private readonly _jwks: jwksKey;

    constructor(private config: ConfigService) {

        const privateKeyPath = config.get("RSA_PRIVATE_KEY");
        const publicKeyPath = config.get("RSA_PUBLIC_KEY");

        this._publicKey = fs.readFileSync(publicKeyPath, 'utf8');
        this._privateKey = fs.readFileSync(privateKeyPath, 'utf8');

        this._jwks = this.parseJwks(this._publicKey);
    }

    public encrypt(data: string): string {
        const encryptedBuffer = crypto.publicEncrypt(this._publicKey, Buffer.from(data, 'utf8'));
        return encryptedBuffer.toString('base64');
    }

    public decrypt(encryptedData: string): string {
        const decryptedBuffer = crypto.privateDecrypt(this._privateKey, Buffer.from(encryptedData, 'base64'));
        return decryptedBuffer.toString('utf8');
    }

    public get publicKey(): string {
        return this._publicKey;
    }

    public get jwks(){
        return [this._jwks];
    }

    private parseJwks(publicKey: string): jwksKey {
        const key = forge.pki.publicKeyFromPem(publicKey);

        const n = Buffer.from(key.n.toByteArray()).toString('base64');
        const e = Buffer.from(key.e.toByteArray()).toString('base64');

        return {
            kty: 'RSA',
            use: 'sig',
            kid: "default", // only one key used
            alg: 'RS256',
            n: n,
            e: e
        };
    }
}
