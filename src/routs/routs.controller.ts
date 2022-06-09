import {Body, Controller, Get, Post, Param, UseGuards, Request} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import { RoutsService } from './routs.service';
import { Route } from './routs.model';
import { CreateRouteDto } from './dto/create-route.dto';

@ApiTags('Routs')
@Controller('routs')
export class RoutsController {
    constructor(private routsService: RoutsService) {}

    @ApiOperation({summary: 'Create new route'})
    @ApiResponse({status: 201, type: Route, description: 'Need to be: ADMIN'})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post("/create")
    create(@Body() createRouteDto: CreateRouteDto) {
        return this.routsService.createRoute(createRouteDto);
    }

    @ApiOperation({summary: 'Get route by ID'})
    @ApiResponse({status: 200, type: Route, description: 'Need to be: ADMIN'})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get("/get/:id")
    getAll(@Param('id') route_id: string, @Request() req) {
        return this.routsService.getRoute(route_id);
    }
}
