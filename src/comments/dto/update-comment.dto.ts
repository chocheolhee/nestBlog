import {IsNotEmpty, IsString} from "class-validator";

export class UpdateCommentDto{

    @IsString()
    @IsNotEmpty({message: '내용를 작성해주세요.'})
    content: string;
}