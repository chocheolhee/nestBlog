import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Board} from "./board.entity";
import {CreateBoardDto} from "./dto/createBoardDto";
import {UpdateBoardDto} from "./dto/updateBoardDto";
import {Request} from "express";

@Injectable()
export class BoardService {
    constructor(@InjectRepository(Board)
                private boardRepository: Repository<Board>
    ) {
    }

    /**
     * 전체 게시글 조회
     */
    findAll(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    /**
     * 게시글 단건 조회
     */
    async findOne(id: number): Promise<Board> {
        const isBoard = await this.boardRepository.findOneBy({id: id});

        if (!isBoard) {
            throw new UnauthorizedException('게시글이 없습니다');
        }
        return isBoard;
    }

    /**
     * 게시글 저장
     */
    async register(boardDto: CreateBoardDto): Promise<Board> {

        return await this.boardRepository.save(boardDto);
    }

    /**
     * 게시글 수정
     */
    async updateBoard(id: number, updateBoardDto: UpdateBoardDto): Promise<void> {
        const findBoard = await this.boardRepository.findOneBy({id: id});

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
}
