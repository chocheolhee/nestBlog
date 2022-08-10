import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Comment} from "./comments.entity";
import {User} from "../users/user.entity";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {UpdateCommentDto} from "./dto/update-comment.dto";

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(Comment)
                private commentRepository: Repository<Comment>,
    ) {}

    /**
     * 전체 댓글 조회
     */
    findAll() : Promise<Comment[]>{
        return
    }

    /**
     * 댓글 단건 조회
     */
    async findOne(id: number): Promise<Comment> {
return
    }

    /**
     * 댓글 저장
     */
    async register(user: User, commentDto: CreateCommentDto) {

    }

    /**
     * 댓글 수정
     */
    async updateComment(id: number, updateCommentDto: UpdateCommentDto) {

        }

    /**
     * 댓글 삭제
     */
    async deleteComment(id: number) {

    }

}
