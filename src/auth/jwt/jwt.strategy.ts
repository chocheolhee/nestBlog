import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException, UseFilters} from '@nestjs/common';
import {Payload} from "./jwt.payload";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../users/user.entity";
import {Repository} from "typeorm";
import {HttpExceptionFilter} from "../../common/exception/http-exception.filter";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
            ignoreExpiration: false,
        });
    }

    /**
     * Todo 글쓰기, 이미지 업로드 인증 구현하기
     */
    async validate(payload: Payload) {
        const authUser = await this.userRepository.findOneBy({id: parseInt(payload.sub)});

        if (authUser) {
            return authUser;
        } else {
            throw new UnauthorizedException('인증 실패')
        }
    }
}
