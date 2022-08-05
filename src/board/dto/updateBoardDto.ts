import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class UpdateBoardDto{
    title: string;
    description: string;
    content: string;
}