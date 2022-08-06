import {ExtractJwt, Strategy, VerifiedCallback} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {Payload} from "./jwt.payload";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../users/user.entity";
import {Repository} from "typeorm";
import {jwtExtractorFromCookies} from "../../common/utils/jwtExtractorFromCookies";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        super({
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            jwtFromRequest:ExtractJwt.fromExtractors([jwtExtractorFromCookies]),
            secretOrKey: process.env.JWT_SECRET,
            ignoreExpiration: false,
        });
    }

    async validate(payload: Payload, done: VerifiedCallback) {

        const authUser = await this.userRepository.find({
            where: {id: payload.sub}
        })

        if (authUser) {
            return done(null, authUser);
        } else {
            return done(new UnauthorizedException({message: 'user does not exist'}), false);
        }
    }
}
