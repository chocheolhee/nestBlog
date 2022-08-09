import {Module} from '@nestjs/common';
import {BoardService} from './board.service';
import {BoardController} from "./board.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Board} from "./board.entity";
import {AuthModule} from "../auth/auth.module";
import {User} from "../users/user.entity";
import {MulterModule} from "@nestjs/platform-express";

@Module({
    imports: [
        /**
         * Todo 이미지 업로드
         */
        // MulterModule.register({
        //     dest: './upload',
        // }),
        TypeOrmModule.forFeature([Board,User]),
        AuthModule,
    ],
    controllers: [BoardController],
    providers: [BoardService]
})
export class BoardModule {
}
