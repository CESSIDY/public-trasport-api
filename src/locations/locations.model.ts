import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import { RoutsLocations } from '../routs/routs_locations.model';

@Entity('locations')
export class Location{
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'UUID.' })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({ example: 'Aleje Racławickie 1, 20-059 Lublin, Poland', description: 'Address' })
    @Column({unique: true, nullable: false})
    address: string;

    @OneToMany(() => RoutsLocations, (routsLocations) => routsLocations.location)
    routsLocations: RoutsLocations[];
}
