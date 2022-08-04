import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Board} from "./board.entity";
import {User} from "../users/user.entity";
import {UserDto} from "../users/dto/userDto";
import * as bcrypt from "bcrypt";

@Injectable()
export class BoardService {
    constructor(@InjectRepository(Board)
                private boardRepository: Repository<Board>
    ) {}
    /**
     * 전체 게시글 조회
     */
    findAll(): Promise<Board[]> {
        return
    }

    /**
     * 게시글 단건 조회
     */
    async findOne(id: number): Promise<Board> {
       return
    }

    /**
     * 게시글 저장
     */
    async register(userDto: UserDto): Promise<Board> {
        return
    }

    /**
     * 게시글 수정
     */
    async updateBoard(id: number, user: User): Promise<void> {
        return
    }

    /**
     * 게시글 삭제
     */
    async deleteBoard(id: number): Promise<void> {
        return
    }
}
