import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/user.entity";
import {Repository} from "typeorm";
import {LoginRequestDto} from "./dto/login.request.dto";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {
    }

    async jwtLogin(data: LoginRequestDto) {

       const isUser = await this.userRepository.findOneBy({email: data.email});

        /**
         * 해당하는 유저 이메일 체크
         */
        if (isUser === null) {
            throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.')
        }

        /**
         * 해당하는 유저 비밀번호 체크
         */
        const isPasswordValidated: boolean = await bcrypt.compare(
            data.password,
            isUser.password
        );

        if (!isPasswordValidated) {
            throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.')
        }

        const payload = {email: data.email, sub: isUser.id}

        return {
            token: this.jwtService.sign(payload, {secret: process.env.JWT_SECRET}),
        }
    }
}
