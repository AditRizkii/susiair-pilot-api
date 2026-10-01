import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const detail = exception instanceof HttpException ? exception.getResponse() : 'Internal server error';
    const payload = typeof detail === 'string' ? { message: detail } : detail as { message?: string | string[] };
    const message = Array.isArray(payload.message) ? 'Validation failed' : (payload.message ?? 'Internal server error');
    const errors = Array.isArray(payload.message) ? payload.message : undefined;

    response.status(status).json({ statusCode: status, message, ...(errors ? { errors } : {}) });
  }
}
