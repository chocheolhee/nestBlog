import {Module} from '@nestjs/common';
import {BoardService} from './board.service';
import {BoardController} from "./board.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Board} from "./board.entity";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([Board]),
        AuthModule
    ],
    controllers: [BoardController],
    providers: [BoardService]
})
export class BoardModule {
}
