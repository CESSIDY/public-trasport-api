import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

@Entity('roles')
export class Role{

    @ApiProperty({example: '1', description: 'UUID.'})
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({example: 'ADMIN', description: 'Unique user role '})
    @Column({unique: true, nullable: false})
    value: string;

    @ApiProperty({example: 'Administrator', description: 'Role description'})
    @Column({nullable: true})
    description: string;
}
