import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from './users/users.module';
import {typeormConfig} from "./typeormConfig/typeorm.config";

@Module({
    imports: [
        TypeOrmModule.forRoot((typeormConfig)),
        UsersModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
