import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ResponseBuilder } from './response.builder';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();

    const httpStatus =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const requestInfo = request
      ? `${request.method} ${request.url} - Body: ${JSON.stringify(request.body || {})}`
      : 'No request context available';

    this.logger.error(
      `Error: ${exception?.message || 'Unknown error'} | Request: ${requestInfo} | Stack: ${exception?.stack || 'No stack'}`,
    );

    if (host.getType() !== 'http') {
      return;
    }

    const responseBody = new ResponseBuilder<any>().createFailureResponse(
      null,
      exception?.message || 'An unexpected error occurred',
    );

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
