import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseFilters,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {SuccessInterceptor} from "../common/interceptor/success.interceptor";
import {HttpExceptionFilter} from "../common/exception/http-exception.filter";
import {JwtAuthGuard} from "../auth/jwt/jwt.guard";
import {CurrentUser} from "../common/decorators/user.decorator";
import {CommentsService} from "./comments.service";
import {Comment} from "./comments.entity";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {UpdateCommentDto} from "./dto/update-comment.dto";
import {User} from "../users/user.entity";
import {Board} from "../board/board.entity";

@Controller('api/comment')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class CommentsController {
    constructor(private commentsService: CommentsService
    ) {
    }

    /**
     * 댓글 전체 조회
     */
    @Get()
    async findAll(): Promise<Comment[]> {
        return await this.commentsService.findAll();
    }

    /**
     * 게시글 단건 조회
     */
    @Get('/:id')
    async findOne(@Param("id", ParseIntPipe) id: number): Promise<Comment> {
        return await this.commentsService.findOne(id);
    }

    /**
     * 댓글 저장
     */
    @UseGuards(JwtAuthGuard)
    @Post('/register')
    async create(@CurrentUser() user: User, @Body() commentDto: CreateCommentDto) {
        return await this.commentsService.register(user, commentDto);
    }

    /**
     * 댓글 수정
     */
    @Patch('/:id')
    async updateBoard(@Param('id', ParseIntPipe) id: number, @Body() updateCommentDto: UpdateCommentDto) {
        return await this.commentsService.updateComment(id, updateCommentDto);
    }

    /**
     * 댓글 삭제
     */
    @Delete("/:id")
    async deleteBoard(@Param('id', ParseIntPipe) id: number) {
        return await this.commentsService.deleteComment(id);
    }
}
