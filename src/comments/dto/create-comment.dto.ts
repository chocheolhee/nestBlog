import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateCommentDto {

    @IsString()
    @IsNotEmpty({message: '내용를 작성해주세요.'})
    content: string;

}