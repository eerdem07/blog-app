import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../api.response';
@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    // next.handle() controller'dan dönen sonucu (Observable olarak) temsil eder.
    return next.handle().pipe(
      map((data) => {
        // Controller'dan ne dönerse dönsün (User, Product[], string vs.)
        // bu datayı alıp standart response yapımızın içine koyuyoruz.
        return new ApiResponse(data);
      }),
    );
  }
}
