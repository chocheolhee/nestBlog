import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "../common/baseEntity/base.entity";

@Entity()
export class Board extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false})
    title: string;

    @Column({type: 'varchar'})
    description: string;

    @Column({type: 'varchar'})
    content: string;

}