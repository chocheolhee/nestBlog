import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class UserDto {

    @IsNotEmpty({message:'이름을 작성해주세요.'})
    userName: string;

    @IsEmail({},{message:'잘못 입력했습니다.'})
    @IsNotEmpty({message:'이메일을 작성해주세요.'})
    email: string;

    @IsString()
    @IsNotEmpty({message:'비밀번호를 작성해주세요.'})
    password: string;
}