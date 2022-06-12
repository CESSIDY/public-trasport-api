import { Injectable, HttpStatus, HttpException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './tickets.model';
import { BuyTicketDto } from './dto/buy-ticket.dto';
import * as bcrypt from 'bcryptjs'
import { User } from '../users/users.model';

@Injectable()
export class TicketsService {
    priceForMinute = 0.04
    constructor(@InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
                @InjectRepository(User) private userRepository: Repository<User>) {}

    private async make_hash(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
       var hash = bcrypt.hashSync(result, 13);
       return hash.replace('/','').replace('\\','').replace('%','').replace('&','');
    }

    async buyTicket(dto: BuyTicketDto, user: User) {
        var today = new Date();
        var ticket_cost = dto.minutes * this.priceForMinute
        if(!dto.race_number){
            throw new HttpException('Please enter race number!', HttpStatus.BAD_REQUEST)
        }
        if (this.PayForTicket(user, ticket_cost)){
            var expired_date = new Date(today.getTime() + dto.minutes*60000);

            var ticket_data = {
                race_number: dto.race_number,
                expired_date: expired_date,
                hash_id: await this.make_hash(20),
                owner: user
            }
            const ticket = await this.ticketRepository.save(ticket_data);
            return await this.getViewTicket(ticket);
        }
        throw new HttpException('Don\'t have enough money!', HttpStatus.BAD_REQUEST)
    }

    async PayForTicket(user: User, ticketCost: number){
        var left_money = user.cash_amount - ticketCost
        if (left_money >= 0){
            user.cash_amount = left_money
            await this.userRepository.save(user);
            return true;
        }
        return false;
    }

    millisToMinutesAndSeconds(millis: number) {
        var minutes: number = Math.floor(millis / 60000);
        var seconds: number = ((millis % 60000) / 1000);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds.toFixed(0);
      }

    async getViewTicket(ticker: Ticket){
        var today = new Date();
        var expired_date = new Date(ticker.expired_date);
        if (expired_date > today){
            var difference = expired_date.getTime()-today.getTime();

            return {"hash_id": ticker.hash_id, "left_time": this.millisToMinutesAndSeconds(difference), "race_number": ticker.race_number}
        }
        return {"hash_id": ticker.hash_id, "left_time": 0, "race_number": ticker.race_number} 
    }

    async verification(hashID: string) {
        const ticket = await this.ticketRepository.findOne({
            where: {
                hash_id: hashID,
            },
          });

        return await this.getViewTicket(ticket);
    }

    async checkOwnTicket(hashID: string, user: User) {
        const ticket = await this.ticketRepository.findOne({
            where: {
                hash_id: hashID,
            },
            relations: ['owner']
          });

        if (ticket.owner.id == user.id){
            return await this.getViewTicket(ticket);
        }
        throw new HttpException("It's not your ticket", HttpStatus.BAD_REQUEST)
    }
}
