import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne, OneToMany, } from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";

@Entity('tickets')
export class Ticket {
    @ApiProperty({example: '1', description: 'Unique ID'})
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({example: '3803', description: 'Race number'})
    @Column({nullable: false})
    race_number: string;

    @ApiProperty({example: '11/01/2022 21:20', description: 'Expired Date'})
    @Column({nullable: false, type: "datetime"})
    expired_date!: Date;

    @ApiProperty({example: 'dw1DWd2@Wd1@E@!DF#1d1D!@EDCr341D!aa', description: 'Unique HashID'})
    @Column({unique: true})
    hash_id: string;

    @ManyToOne(() => User, user => user.tickets)
    owner: User;
}
