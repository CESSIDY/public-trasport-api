import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import { RoutsLocations } from './routs_locations.model';

@Entity('routs')
export class Route{
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'UUID.' })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({ example: '3806', description: 'Route number' })
    @Index("ux_route_number", { unique: true })
    @Column({unique: true, nullable: false})
    route_number: string;

    @OneToMany(() => RoutsLocations, (routsLocations) => routsLocations.route)
    routsLocations: RoutsLocations[];
}
