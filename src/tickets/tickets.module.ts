import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import {forwardRef, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Ticket} from "./tickets.model";
import {User} from "../users/users.model";
import {AuthModule} from "../auth/auth.module";
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [TicketsService],
  controllers: [TicketsController],
  imports: [
    TypeOrmModule.forFeature([User, Ticket]),
    forwardRef(() => AuthModule),
    PassportModule,
  ],
  exports: [
    TicketsService,
  ]
})
export class TicketsModule {}
