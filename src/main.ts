import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import {Logger, ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // Root config 폴더에서 설정파일 적용
  // const serverConfig = config.get('server');
  // const port = serverConfig.port;

  // ConfigModule .env 설정파일 적용
  // app.module 에서 ConfigModule import 해야 함.
  const port = process.env.NODE_SERVER_PORT;

  await app.listen(port);
  Logger.log(`-----------------Application running on port ${port}-----------------`);
}
bootstrap();
