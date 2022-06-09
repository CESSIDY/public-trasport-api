import {Body, Controller, Get, Post, Param, UseGuards, Request} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import { TicketsService } from './tickets.service';
import { BuyTicketDto } from './dto/buy-ticket.dto';
import { Ticket } from './tickets.model';
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {

    constructor(private ticketsService: TicketsService) {}

    @ApiOperation({summary: 'Buy ticket'})
    @ApiResponse({status: 200, type: Ticket, description: 'Need to be authorization'})
    @UseGuards(JwtAuthGuard)
    @Post("/Buy")
    buy(@Body() ticketDto: BuyTicketDto, @Request() req) {
        return this.ticketsService.buyTicket(ticketDto, req.user);
    }

    @ApiOperation({summary: 'Ticket verification'})
    @ApiResponse({status: 200, type: Ticket, description: 'Need to be authorization'})
    @UseGuards(JwtAuthGuard)
    @Get('/check/:hashID')
    checkOwnTicket(@Param('hashID') hashID: string, @Request() req) {
        return this.ticketsService.checkOwnTicket(hashID, req.user);
    }

    @ApiOperation({summary: 'Ticket verification'})
    @ApiResponse({status: 200, type: Ticket, description: 'Need to be: CONDUCTOR'})
    @UseGuards(JwtAuthGuard)
    @Roles("CONDUCTOR")
    @UseGuards(RolesGuard)
    @Get('/verification/:hashID')
    verification(@Param('hashID') hashID: string, @Request() req) {
        return this.ticketsService.verification(hashID);
    }
}
