import {IsNotEmpty} from "class-validator";

export class UserDto {

    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    password: string;
}