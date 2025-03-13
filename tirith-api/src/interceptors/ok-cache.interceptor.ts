import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class OkCacheInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const response = context.switchToHttp().getResponse();

        return next.handle().pipe(
            tap(() => {
                if (response.statusCode >= 200 && response.statusCode < 400) {
                    response.setHeader('Cache-Control', 'max-age=3600');
                }
            }),
        );
    }
}