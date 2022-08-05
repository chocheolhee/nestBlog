import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class CreateBoardDto {

    @IsString()
    @IsNotEmpty({message:'제목을 작성해주세요.'})
    title: string;

    @IsString()
    @IsNotEmpty({message:'빈칸을 작성해주세요.'})
    description: string;

    @IsString()
    @IsNotEmpty({message:'내용를 작성해주세요.'})
    content: string;
}