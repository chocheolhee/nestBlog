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
    UseInterceptors
} from '@nestjs/common';
import {HttpExceptionFilter} from "../common/exception/http-exception.filter";
import {SuccessInterceptor} from "../common/interceptor/success.interceptor";
import {AuthService} from "../auth/auth.service";
import {BoardService} from "./board.service";
import {Board} from "./board.entity";

@Controller('api/board')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class BoardController {
    constructor(private boardService: BoardService,
                private authService: AuthService
    ) {
    }

    /**
     * 게시글 전체 조회
     */
    @Get()
    async findAll(): Promise<Board[]> {
        return
    }

    /**
     * 게시글 단건 조회
     */
    @Get('/:id')
    async findOnd(@Param("id", ParseIntPipe) id: number): Promise<Board> {
        return
    }

    /**
     * 게시글 저장
     */
    @Post('/register')
    async create(@Body() boardDto: Board) {
        return
    }

    /**
     * 게시글 수정
     */
    @Patch('/:id')
    async updateBoard(@Param('id', ParseIntPipe) id: number, @Body() board: Board) {
        return
    }

    /**
     * 게시글 삭제
     */
    @Delete("/:id")
    async deleteBoard(@Param('id', ParseIntPipe) id: number) {
        return
    }

}
