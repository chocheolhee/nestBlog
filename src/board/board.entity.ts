import {Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity()
export class Board {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false})
    title: string;

    @Column({type: 'varchar', nullable: false})
    content: string;

}