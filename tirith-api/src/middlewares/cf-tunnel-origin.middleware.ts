import { Injectable, NestMiddleware, RequestMethod } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class CfTunnelOriginMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {

        // check if cloudflare tunnel real IP is present
        const cfIpHeader = req.headers["cf-connecting-ip"];
        if(typeof cfIpHeader === "string") {
            req.headers["x-forwarded-for"] = cfIpHeader;
            console.log("found cf ip " + cfIpHeader);
        }

        // Ends middleware function execution, hence allowing to move on
        if (next) {
            next();
        }
    }
}