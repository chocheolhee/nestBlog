import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany} from "typeorm";
import {BaseEntity} from "../common/baseEntity/base.entity";
import {User} from "../users/user.entity";
import {Comment} from "../comments/comments.entity";

@Entity()
export class Board extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false})
    title: string;

    @Column({type: 'varchar'})
    description: string;

    @Column({type: 'varchar'})
    content: string;

    @ManyToOne(() => User, (user) => user.boards,
        {
            onUpdate:'CASCADE',
            onDelete: 'CASCADE'
        })
    @JoinColumn([{
        name: 'user_id',
        referencedColumnName: 'id',
    }])
    user: User

    @OneToMany(() => Comment, (comment) => comment.board,
        {cascade: true})
    comments: Comment[]
}