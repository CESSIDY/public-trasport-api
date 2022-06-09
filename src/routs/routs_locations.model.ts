import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne, OneToMany, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import { Location } from '../locations/locations.model';
import { Route } from './routs.model';

@Entity('routs-locations')
export class RoutsLocations{
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'UUID.' })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Location, (location) => location.routsLocations)
    public location: Location;

    @ManyToOne(() => Route, (route) => route.routsLocations)
    public route: Route;

    @ApiProperty({ example: '3806', description: 'Location order number for particular route' })
    @Column({default: 0})
    location_order: number;
}
