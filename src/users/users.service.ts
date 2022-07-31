import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {UserDto} from './dto/userDto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User)
                private userRepository: Repository<User>) {
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
    findOne(id: number): Promise<User> {
        return this.userRepository.findOneBy({id: id});
    }

    /**
     * 회원 저장
     */
    async register(userDto: UserDto): Promise<void> {
        await this.userRepository.save(userDto)
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
    async deleteUser(id:number):Promise<void> {
        await this.userRepository.delete(id);
    }
}
