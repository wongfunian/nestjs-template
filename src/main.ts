import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as colors from 'colors';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import morganFormat from './utils/morganFormat';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: ['error', 'warn'],
        cors: {
            origin: [],
            credentials: true,
        },
    });

    const configService = app.get<ConfigService>(ConfigService);
    const port = configService.get<number>('PORT', 4000);
    colors.enable();

    app.use([
        cookieParser(),
        helmet({
            crossOriginResourcePolicy: false,
        }),
        morgan(morganFormat),
        compression(),
    ]);
    app.setGlobalPrefix('api');

    await app.listen(port, () => {
        console.log(colors.bold(`Server started on port ${port}`));
    });
}
bootstrap();
