import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import {Board} from "./board.entity";
import {CreateBoardDto} from "./dto/createBoardDto";
import {UpdateBoardDto} from "./dto/updateBoardDto";
import {User} from "../users/user.entity";

@Injectable()
export class BoardService {
    constructor(@InjectRepository(Board)
                private boardRepository: Repository<Board>,
                @InjectRepository(User)
                private userRepository: Repository<User>,
                private dataSource: DataSource
    ) {
    }

    /**
     * 전체 게시글 조회
     */
    findAll(): Promise<Board[]> {
        return this.boardRepository.createQueryBuilder('board')
            .leftJoinAndSelect('board.user', 'user')
            .orderBy('board.id', "DESC")
            .getMany();
    }

    /**
     * 게시글 단건 조회
     */
    async findOne(id: number): Promise<Board> {
        const isBoard = await this.boardRepository.createQueryBuilder('board')
            .leftJoinAndSelect('board.user', 'user')
            .where('board.id = :id', {id})
            .getOne();

        if (!isBoard) {
            throw new UnauthorizedException('게시글이 없습니다');
        }
        return isBoard;
    }

    /**
     * 게시글 저장
     */
    async register(user: User, boardDto: CreateBoardDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const {title, description, content} = boardDto;
            const userId = user[0].id;

            const board = new Board();
            board.title = title;
            board.description = description;
            board.content = content;
            board.user = userId;

            const resultBoard = await queryRunner.manager.save(board);
            await queryRunner.commitTransaction();
            return resultBoard;
        } catch (err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

    /**
     * 게시글 수정
     */
    async updateBoard(id: number, updateBoardDto: UpdateBoardDto): Promise<void> {
        const findBoard = await this.boardRepository.findOne({
            where: {id: id}
        })

        if (!findBoard) {
            throw new NotFoundException(`'게시글이 없습니다'`)
        }

        await this.boardRepository.update(id, updateBoardDto);
    }

    /**
     * 게시글 삭제
     */
    async deleteBoard(id: number): Promise<void> {
        const findBoard = await this.boardRepository.findOneBy({id: id});

        if (!findBoard) {
            throw new NotFoundException('게시글이 없습니다')
        }

        await this.boardRepository.delete(id);
    }

    /**
     * Todo 이미지 업로드
     */
}
