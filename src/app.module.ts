import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from './users/users.module';
import {typeormConfig} from './configs/typeorm.config';
import {ConfigModule} from "@nestjs/config";


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
                synchronize: false
            })
        }),

        UsersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
