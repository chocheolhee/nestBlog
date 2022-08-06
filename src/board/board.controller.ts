import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post, Req, Res, UnauthorizedException,
    UseFilters,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {SuccessInterceptor} from "../common/interceptor/success.interceptor";
import {AuthService} from "../auth/auth.service";
import {BoardService} from "./board.service";
import {Board} from "./board.entity";
import {CreateBoardDto} from "./dto/createBoardDto";
import {HttpExceptionFilter} from "../common/exception/http-exception.filter";
import {UpdateBoardDto} from "./dto/updateBoardDto";
import {JwtAuthGuard} from "../auth/jwt/jwt.guard";
import {Request, Response} from "express";
import {CurrentUser} from "../common/decorators/user.decorator";

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
        return await this.boardService.findAll();
    }

    /**
     * 게시글 단건 조회
     */
    @Get('/:id')
    async findOne(@Param("id", ParseIntPipe) id: number): Promise<Board> {
        return await this.boardService.findOne(id);
    }

    /**
     * 게시글 저장
     */
    @UseGuards(JwtAuthGuard)
    @Post('/register')
    async create(@Body() boardDto: CreateBoardDto,@CurrentUser() user) {
        return await this.boardService.register(boardDto);
    }

    /**
     * 게시글 수정
     */
    @Patch('/:id')
    async updateBoard(@Param('id', ParseIntPipe) id: number, @Body() updateBoardDto: UpdateBoardDto) {
        return await this.boardService.updateBoard(id, updateBoardDto);
    }

    /**
     * 게시글 삭제
     */
    @Delete("/:id")
    async deleteBoard(@Param('id', ParseIntPipe) id: number) {
        return await this.boardService.deleteBoard(id);
    }

}
