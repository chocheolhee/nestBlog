import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "../common/baseEntity/base.entity";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false})
    userName: string;

    @Column({type: 'varchar', unique: true, nullable: false})
    email: string;

    @Column({type: 'varchar', nullable: false})
    password: string;
}