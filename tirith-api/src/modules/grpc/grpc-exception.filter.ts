/*
https://docs.nestjs.com/exception-filters#exception-filters-1
*/

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientError, Status } from 'nice-grpc';

@Catch(ClientError)
export class GrpcExceptionsFilter implements ExceptionFilter {
  catch(exception: ClientError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const httpError = this.mapGrpcError(exception);

    response.status(httpError.getStatus()).json({
      statusCode: httpError.getStatus(),
      message: httpError.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private mapGrpcError(e: ClientError) {

    const code = Number(e.code);
    const message = e.details;

    const buildHttp = (status: HttpStatus) => new HttpException("[gRPC] " + message, status);

    switch (code) {
      case Status.UNAUTHENTICATED:
        return buildHttp(HttpStatus.UNAUTHORIZED);
      case Status.PERMISSION_DENIED:
        return buildHttp(HttpStatus.FORBIDDEN);
      case Status.INVALID_ARGUMENT:
        return buildHttp(HttpStatus.BAD_REQUEST);
      case Status.NOT_FOUND:
        return buildHttp(HttpStatus.NOT_FOUND);
      case Status.INVALID_ARGUMENT:
        return buildHttp(HttpStatus.CONFLICT);
      default:
        return buildHttp(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
