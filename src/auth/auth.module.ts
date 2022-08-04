import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {JwtStrategy} from "./jwt/jwt.strategy";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule.register({defaultStrategy: 'jwt', session: false}),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: '1y'},
        }),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {
}
