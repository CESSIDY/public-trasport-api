import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./users.model";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";

@Injectable()
export class UsersService {
    defaultMoney = 10
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
                private roleService: RolesService) {}
    
    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER")
        user.roles = [role]
        user.cash_amount = this.defaultMoney
        
        return await this.userRepository.save(user);
    }

    async getAllUsers() {
        const users = await this.userRepository.find();
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOneBy({email: email})
        return user;
    }

    // async addRole(dto: AddRoleDto) {
    //     const user = await this.userRepository.findOneBy({id: dto.userId});
    //     const role = await this.roleService.getRoleByValue(dto.value);
    //     if (role && user) {
    //         await user ('roles', role.id);
    //         return dto;
    //     }
    //     throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    // }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findOneBy({id: dto.userId});
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        
        return await this.userRepository.save(user);
    }
}
