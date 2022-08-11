import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import {Comment} from "./comments.entity";
import {User} from "../users/user.entity";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {UpdateCommentDto} from "./dto/update-comment.dto";
import {Board} from "../board/board.entity";

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(Comment)
                private commentRepository: Repository<Comment>,
                private dataSource: DataSource
    ) {
    }

    /**
     * 전체 댓글 조회
     */
    findAll(): Promise<Comment[]> {
        return this.commentRepository.createQueryBuilder('comment')
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.board', 'board')
            .orderBy('comment.id', "ASC")
            .getMany();
    }

    /**
     * 댓글 단건 조회
     */
    async findOne(id: number): Promise<Comment> {
        const isComment = await this.commentRepository.createQueryBuilder('comment')
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.board', 'board')
            .where('comment.id = :id', {id})
            .getOne();

        if (!isComment) {
            throw new UnauthorizedException('게시글이 없습니다');
        }
        return isComment;
    }

    /**
     * 댓글 저장
     */
    async register(user: User, commentDto: CreateCommentDto) {

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const {content, boardId} = commentDto;
            const userId = user[0].id;

            const comment = new Comment();
            comment.content = content;
            comment.board = boardId;
            comment.user = userId;

            const resultBoard = await queryRunner.manager.save(comment);
            await queryRunner.commitTransaction();
            return resultBoard;
        } catch (err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

    /**
     * 댓글 수정
     */
    async updateComment(id: number, updateCommentDto: UpdateCommentDto) {
        const findComment = await this.commentRepository.findOne({
            where: {id: id}
        })

        if (!findComment) {
            throw new NotFoundException(`'게시글이 없습니다'`)
        }

        await this.commentRepository.update(id, updateCommentDto);
    }

    /**
     * 댓글 삭제
     */
    async deleteComment(id: number) {
        const findBoard = await this.commentRepository.findOneBy({id: id});

        if (!findBoard) {
            throw new NotFoundException('게시글이 없습니다')
        }

        await this.commentRepository.delete(id);
    }

}
