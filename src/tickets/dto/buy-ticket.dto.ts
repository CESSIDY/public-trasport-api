import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class BuyTicketDto {

    @ApiProperty({example: 'Race', description: 'Race number'})
    @IsString({message: 'Need to be a string'})
    readonly race_number: string;
    @ApiProperty({example: '60', description: 'Minutes'})
    @IsNumber({}, {message: 'Need to be a number'})
    readonly minutes: number;
}
