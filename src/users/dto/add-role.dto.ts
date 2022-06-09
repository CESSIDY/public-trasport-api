import {IsNumber, IsString} from "class-validator";

export class AddRoleDto {
    @IsString({message: "Need to be a string"})
    readonly value: string;
    @IsString({message: "Need to be a string"})
    readonly userId: string;
}
