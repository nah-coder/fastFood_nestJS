import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  private getDefaultMessage(method: string): string {
    switch (method) {
      case 'POST':
        return 'Resource created successfully';
      case 'PUT':
      case 'PATCH':
        return 'Resource updated successfully';
      case 'DELETE':
        return 'Resource deleted successfully';
      default:
        return 'Request successful';
    }
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest<Request>();

    return next.handle().pipe(
      map((data: any) => {
        if (data && typeof data === 'object' && 'success' in data) {
          return data;
        }

        let message = this.getDefaultMessage(request.method);

        if (data && typeof data === 'object' && 'message' in data) {
          message = data.message as string;

          const { message: _, ...rest } = data as any;
          data = Object.keys(rest).length > 0 ? (rest as T) : undefined;
        }

        if (data && typeof data === 'object' && 'data' in data) {
          data = data.data as T;
        }

        return {
          success: true,
          message,
          data,
          date: new Date(),
          path: request.url,
        };
      }),
    );
  }
}
