import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {UserDto} from './dto/userDto';
import {UsersService} from "./users.service";
import {User} from "./user.entity";

@Controller('api/user')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    /**
     * 전체 회원 조회
     */
    @Get()
    async findAll(): Promise<User[]> {
        const userList = await this.usersService.findAll();

        /**
         * return 부분은 별도의 exception 만든 후 @Res() 사용해서 리펙토링 할 계획
         * 일단 임시로 Object 만들어서 반환함
         */
        return Object.assign({
            data: userList,
            statusCode: 200,
            statusMsg: `data successfully`,
        });
    }

    /**
     * 유저 조회
     */
    @Get('/:id')
    async findOnd(@Param("id") id: number): Promise<User> {
        let findUser = await this.usersService.findOne(id);
        return Object.assign({
            data: findUser,
            statusCode: 200,
            statusMsg: `유저 조회 성공`,
        })
    }

    /**
     * 회원 저장
     */
    @Post('/register')
    async create(@Body() userDto: UserDto) {
        await this.usersService.register(userDto);
        return Object.assign({
            data: {...userDto},
            statusCode: 200,
            statusMsg: `saved successfully`,
        });
    }

    /**
     * 회원 수정
     */
    @Patch('/:id')
    async updateUser(@Param('id') id: number, @Body() user: User) {
        await this.usersService.updateUser(id, user);
        return Object.assign({
            data: {...user},
            statusCode: 200,
            statusMsg: `update successfully`,
        })
    }

    /**
     * 회원 삭제
     */
    @Delete("/:id")
    async deleteUser(@Param('id') id: number) {
        await this.usersService.deleteUser(id);
        return Object.assign({
            data: {userId: id},
            statusCode: 200,
            statusMsg: `delete successfully`,
        })
    }
}
