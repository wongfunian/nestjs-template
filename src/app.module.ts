import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { CustomExceptionFilter, GlobalExceptionFilter } from './utils/CustomException';
import validationSchema from './utils/validators/env.schema';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV ?? 'development'}`,
            validationSchema,
            validationOptions: {
                allowUnknown: true,
                abortEarly: true,
            },
        }),
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: CustomExceptionFilter,
        },
    ],
})
export class AppModule {}
