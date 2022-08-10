import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "../common/baseEntity/base.entity";
import {Board} from "../board/board.entity";
import {User} from "../users/user.entity";

@Entity()
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    content: string;

    @ManyToOne(() => Board, (board) => board.comments,
        {
            onDelete: 'CASCADE'
        })
    board: Board

    @ManyToOne(() => User, (user) => user.comments,
        {
            onDelete: 'CASCADE'
        })
    user: User
}