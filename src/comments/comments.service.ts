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
                @InjectRepository(Board)
                private boardRepository: Repository<Board>,
                @InjectRepository(User)
                private userRepository: Repository<User>,
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
            throw new UnauthorizedException('댓글이 없습니다');
        }
        return isComment;
    }

    /**
     * 댓글 저장
     */
    async register(user: User, boardId: number, commentDto: CreateCommentDto) {

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const {content} = commentDto;
            const userId = user[0].id;

            const isBoard = await this.boardRepository.findOne({
                where: {id: boardId},
            });

            const isUser = await this.userRepository.findOne({
                where: {id: userId},
            });

            const comment = new Comment();
            comment.content = content;
            comment.board = isBoard;
            comment.user = isUser;

            const resultBoard = await queryRunner.manager.save(comment);
            await queryRunner.commitTransaction();
            return resultBoard;
        } catch (err) {
            console.log(err);
            await queryRunner.rollbackTransaction();
            throw new NotFoundException('게시글이 없습니다');
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
            throw new NotFoundException('댓글이 없습니다')
        }

        await this.commentRepository.update(id, updateCommentDto);
    }

    /**
     * 댓글 삭제
     */
    async deleteComment(id: number) {
        const findComment = await this.commentRepository.findOne({
            where: {id: id}
        });

        if (!findComment) {
            throw new NotFoundException('댓글이 없습니다')
        }

        await this.commentRepository.delete(id);
    }

}
