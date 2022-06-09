import {Body, Controller, Get, Post, UseGuards, UsePipes} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    // @ApiOperation({summary: 'Create user'})
    // @ApiResponse({status: 200, type: User})
    // @Post()
    // create(@Body() userDto: CreateUserDto) {
    //     return this.usersService.createUser(userDto);
    // }

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [User], description: 'Need to be: ADMIN'})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }


    @ApiOperation({summary: 'Ban user'})
    @ApiResponse({status: 200, description: 'Need to be: ADMIN'})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto);
    }
}
