import {IsEmail, IsNotEmpty} from "class-validator";

export class UserDto {

    @IsNotEmpty()
    userName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}