import {ApiProperty} from "@nestjs/swagger";

export class BanUserDto {
    @ApiProperty({example: '#@!dw12e-...-e21ed!D!', description: 'user Id'})
    readonly userId: string;
    @ApiProperty({example: 'Because...', description: 'Ban reason'})
    readonly banReason: string;
}
