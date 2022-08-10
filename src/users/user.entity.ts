import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "../common/baseEntity/base.entity";
import {Board} from "../board/board.entity";
import {Exclude} from "class-transformer";
import {Comment} from "../comments/comments.entity";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false})
    userName: string;

    @Column({type: 'varchar', unique: true, nullable: false})
    email: string;

    @Column({type: 'varchar', nullable: false})
    @Exclude()
    password: string;

    @OneToMany(() => Board, (board) => board.user,
        {cascade: true})
    boards: Board[];

    @OneToMany(() => Comment, (comment) => comment.user,
        {cascade: true})
    comments: Comment[]
}