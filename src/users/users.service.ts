import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from './dto/createUserDto';
import * as bcrypt from 'bcrypt';

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
    async register(userDto: CreateUserDto): Promise<User> {
        const isEmail = await this.userRepository.findOneBy({email: userDto.email});

        if (isEmail) {
            throw new NotFoundException('이미 회원가입된 이메일입니다.')
        }

        const hashedPassword = await bcrypt.hash(userDto.password, 10);

        const saveUser = this.userRepository.create({
            userName: userDto.userName,
            email: userDto.email,
            password: hashedPassword,
        });

        return await this.userRepository.save(saveUser);
    }

    /**
     * 회원 수정
     */
    async updateUser(id: number, user: User): Promise<void> {
        const findUser = await this.userRepository.findOneBy({id: id});

        if (!findUser) {
            throw new NotFoundException(`Can't find User with id: ${id}`)
        }

        await this.userRepository.update(id, user);
    }

    /**
     * 회원 삭제
     */
    async deleteUser(id: number): Promise<void> {
        const findUser = await this.userRepository.findOneBy({id: id});

        if (!findUser) {
            throw new NotFoundException(`Can't find User with id: ${id}`)
        }
        await this.userRepository.delete(id);
    }
}
