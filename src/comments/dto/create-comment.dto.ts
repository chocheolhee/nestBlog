import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateCommentDto {

    @IsString()
    @IsNotEmpty({message: '내용를 작성해주세요.'})
    content: string;

    /**
     * Front 에서 <Input hidden 값으로 넘겨준다>
     * 상세페이지 board PK 값으로 url 설정
     * ex) localhost:5000/api/board/83 <-- input hidden 값
     */
    @IsNumber()
    boardId :number
}