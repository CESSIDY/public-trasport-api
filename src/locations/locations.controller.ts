import { LocationsService } from './locations.service';
import {Body, Controller, Get, Post, UseGuards, UsePipes} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import { AddLocationDto } from './dto/add-location.dto';
import { Location } from './locations.model';

@ApiTags('Locations')
@Controller('locations')
export class LocationsController {
    constructor(private locationsService: LocationsService) {}

    @ApiOperation({summary: 'Create new location'})
    @ApiResponse({status: 200, type: Location, description: 'Need to be: ADMIN'})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post("/create")
    create(@Body() addLocationDto: AddLocationDto) {
        return this.locationsService.createLocation(addLocationDto);
    }

    @ApiOperation({summary: 'Get all locations'})
    @ApiResponse({status: 200, type: [Location], description: 'Need to be: ADMIN'})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get("/get-all")
    getAll() {
        return this.locationsService.getAll();
    }
}
