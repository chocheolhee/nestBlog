import {
    Body,
    Controller,
    Delete,
    Get, Logger, NotFoundException,
    Param,
    ParseIntPipe,
    Patch,
    Post, Req, Res,
    UseFilters, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {CreateUserDto} from './dto/createUserDto';
import {UsersService} from "./users.service";
import {User} from "./user.entity";
import {HttpExceptionFilter} from "../common/exception/http-exception.filter";
import {SuccessInterceptor} from "../common/interceptor/success.interceptor";
import {AuthService} from "../auth/auth.service";
import {LoginRequestDto} from "../auth/dto/login.request.dto";
import {request, Request, Response} from "express";
import {JwtAuthGuard} from "../auth/jwt/jwt.guard";

@Controller('api/user')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class UsersController {

    constructor(private usersService: UsersService,
                private authService: AuthService
    ) {
    }

    /**
     * 전체 회원 조회
     */
    @Get()
    async findAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    /**
     * 유저 조회
     */
    @Get('/:id')
    async findOne(@Param("id", ParseIntPipe) id: number): Promise<User> {
        return await this.usersService.findOne(id);
    }

    /**
     * 회원 저장
     */
    @Post('/register')
    async create(@Body() userDto: CreateUserDto) {
        return await this.usersService.register(userDto);
    }

    /**
     * 회원 수정
     */
    @Patch('/:id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: User) {
        return await this.usersService.updateUser(id, user);
    }

    /**
     * 회원 삭제
     */
    @Delete("/:id")
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        return await this.usersService.deleteUser(id);
    }

    /**
     * 로그인
     */
    @Post("/login")
    async login(@Body() data: LoginRequestDto) {
        return await this.authService.validateUser(data);

        /**
         * Todo jwt Cookie 적용
         */
        // const jwt = await this.authService.validateUser(data);
        // res.setHeader('Authorization', 'Bearer ' + jwt.token);
        // res.cookie('jwt', jwt.token, {
        //     httpOnly: true,
        //     maxAge: 24 * 60 * 60 * 1000 //1 day
        // });
        //
        // return res.send({
        //     message: 'success'
        // })
    }

    /**
     * Todo 로그아웃
     */
    // @Post('/logout')
    // logout(@Req() req: Request, @Res() res: Response): any {
    //     res.cookie('jwt', '', {
    //         maxAge: 0
    //     })
    //     return res.send({
    //         message: 'success'
    //     })
    // }
}
