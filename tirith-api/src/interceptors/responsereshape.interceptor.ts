/*
https://docs.nestjs.com/interceptors#interceptors
*/

import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

@Injectable()
export class ResponseReshapeInterceptor implements NestInterceptor {

  constructor(private reflector: Reflector) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map(data => {

          /* get swagger response annotation */
          const status = context.switchToHttp().getResponse<Response>().statusCode;
          const swaggerResponseData = this.reflector.get("swagger/apiResponse", context.getHandler())?.[status];
          if (swaggerResponseData === undefined) return data;

          /* transform data */
          if (swaggerResponseData.isArray === true) {
            return data.map(item => plainToInstance(swaggerResponseData.type, item, { excludeExtraneousValues: true }))
          }
          else {
            return plainToInstance(swaggerResponseData.type, data, { excludeExtraneousValues: true });
          }
        }),
      );
  }
}
