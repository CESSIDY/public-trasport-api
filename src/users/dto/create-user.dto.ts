import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {

    @ApiProperty({example: 'user@mail.com', description: 'Email'})
    @IsString({message: 'Need to be a string'})
    @IsEmail({}, {message: "Incorrect email"})
    readonly email: string;
    @ApiProperty({example: '12345', description: 'Password'})
    @IsString({message: 'Need to be a string'})
    @Length(4, 16, {message: 'More than 4 and less then 16'})
    readonly password: string;
}
