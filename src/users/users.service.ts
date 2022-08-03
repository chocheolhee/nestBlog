import {Injectable, NotFoundException, UnauthorizedException, UseFilters} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {UserDto} from './dto/userDto';
import {HttpExceptionFilter} from "../common/exception/http-exception.filter";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User)
                private userRepository: Repository<User>,
    ) {
    }

    /**
     * 전체 회원 조회
     */
    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    /**
     * 유저 조회
     */
    async findOne(id: number): Promise<User> {
        const isExist = await this.userRepository.findOneBy({id: id});
        if (isExist === null) {
            throw new UnauthorizedException('해당 유저는 존재하지 않습니다');
        }
        return isExist;
    }

    /**
     * 회원 저장
     */
    async register(userDto: UserDto): Promise<void> {
        const isEmail = await this.userRepository.findOneBy({email: userDto.email});

        if (!(isEmail === null)) {
            throw new NotFoundException('이미 회원가입된 이메일입니다.')
        }

        await this.userRepository.save(userDto);
    }

    /**
     * 회원 수정
     */
    async updateUser(id: number, user: User): Promise<void> {
        const findUser = await this.userRepository.findOneBy({id: id});

        if (!findUser) {
            throw new NotFoundException(`Can't find Board with id: ${id}`)
        }

        await this.userRepository.update(id, user);
    }

    /**
     * 회원 삭제
     */
    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
