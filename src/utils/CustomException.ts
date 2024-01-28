import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends Error {
    constructor(
        public message: string,
        public statusCode: HttpStatus,
        public customProperties: Record<string, any>,
    ) {
        super(message);
    }
}

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: CustomException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.status(exception.statusCode).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: exception.message,
            ...exception.customProperties,
        });
    }
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        console.log(exception.message);
        response.status(status).json({
            statusCode: status,
            message: exception.message,
        });
    }
}
