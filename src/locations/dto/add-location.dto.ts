import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class AddLocationDto {

    @ApiProperty({example: 'Aleje Racławickie 1, 20-059 Lublin, Poland', description: 'Address'})
    @IsString({message: 'Need to be a string'})
    readonly address: string;
}
