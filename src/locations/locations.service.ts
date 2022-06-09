import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Location} from "./locations.model";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddLocationDto } from './dto/add-location.dto';

@Injectable()
export class LocationsService {
    constructor(@InjectRepository(Location) private locationRepository: Repository<Location>) {}
    
    async createLocation(dto: AddLocationDto) {
        const location = await this.locationRepository.create(dto);

        return await this.locationRepository.save(location);
    }

    async getAll(){
        return await this.locationRepository.find();
    }
}
