import {NestFactory, Reflector} from '@nestjs/core';
import {AppModule} from './app.module';
import {ClassSerializerInterceptor, Logger, ValidationPipe} from "@nestjs/common";
import {HttpExceptionFilter} from "./common/exception/http-exception.filter";
import * as cookieParser from 'cookie-parser';
import {NestExpressApplication} from "@nestjs/platform-express";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());

    app.use(cookieParser());
    // Entity @Exclude() 적용 비밀번호 노출 X
    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector))
    );

    // ConfigModule .env 설정파일 적용
    // app.module 에서 ConfigModule import 해야 함.
    const port = process.env.NODE_SERVER_PORT;

    await app.listen(port);
    Logger.log(`-----------------Application running on port ${port}-----------------`);
}

bootstrap();
