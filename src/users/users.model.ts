import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import { Ticket } from "../tickets/tickets.model";

@Entity('users')
export class User{
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'UUID.' })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({ example: 'user@host.com', description: 'Account email.' })
    @Index("ux_users_email", { unique: true })
    @Column({ length: 32, unique: true, nullable: false, update: false})
    email: string;
  
    @ApiProperty({ example: 'd1e8a70...8943d082', description: 'Password.' })
    @Column({ length: 255, nullable: false, select: true })
    password: string;

    @ApiProperty({example: '10.10', description: 'Cash amount'})
    @Column({nullable: false, default:0 })
    cash_amount: number;

    @ApiProperty({example: 'true', description: 'Bun or not'})
    @Column({default: false})
    banned: boolean;

    @ApiProperty({example: 'For some reason', description: 'Ban reason'})
    @Column({nullable: true})
    banReason: string;

    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[];

    @OneToMany(() => Ticket, ticket => ticket.owner)
    tickets: Ticket[];
}
