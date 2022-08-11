import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Comment} from "./comments.entity";
import {CommentsController} from "./comments.controller";
import {CommentsService} from "./comments.service";
import {Board} from "../board/board.entity";
import {User} from "../users/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Comment,Board,User]),
    ],
    controllers: [CommentsController],
    providers: [CommentsService]
})
export class CommentsModule {}
