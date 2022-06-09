import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Location} from "../locations/locations.model";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from './routs.model';
import { CreateRouteDto } from './dto/create-route.dto';
import { RoutsLocations } from './routs_locations.model';

@Injectable()
export class RoutsService {
    constructor(@InjectRepository(Route) private routeRepository: Repository<Route>,
                @InjectRepository(Location) private locationRepository: Repository<Location>,
                @InjectRepository(RoutsLocations) private routsLocationsRepository: Repository<RoutsLocations>) {}

    async createRoute(createRouteDto: CreateRouteDto){

        var route_data = {
            route_number: createRouteDto.route_number,
            routsLocations: []
        }
        var routeModel = await this.routeRepository.save(route_data);
        for (const locationDto of createRouteDto.locations) {
            var locationModel = await this.getLocation(locationDto.location_id)
            if (locationModel){
                var routeLocationModel = {
                    location: locationModel,
                    route: routeModel,
                    location_order: locationDto.location_order
                }
                await this.routsLocationsRepository.save(routeLocationModel);
            }
        }
        
        const route = await this.getRoute(routeModel.id);
        return route;
    }

    async getLocation(locationId: string){
        const location = await this.locationRepository.findOne({
            where: {
                id: locationId,
            },
        });
        return location;
    }

    async getRoute(routeId: string){
        console.log(routeId)
        const route = await this.routeRepository.findOne({
            where: {
                id: routeId,
            },
            relations: ['routsLocations'] 
        });
        console.log(route)
        return route;
    }
}
