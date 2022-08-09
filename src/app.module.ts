import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from './auth/auth.module';
import {BoardModule} from './board/board.module';
import {LoggerMiddleware} from "./common/middleware/logger.middleware";


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        // ----------TypeOrmModule 클래스 분리-----------
        // TypeOrmModule.forRoot((typeormConfig)),

        // ----------.env 환경설정 적용------------------
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT) || 3306,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true
            })
        }),

        UsersModule,
        AuthModule,
        BoardModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('*');
    }
}
