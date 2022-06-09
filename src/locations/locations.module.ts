import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import {forwardRef, Module} from '@nestjs/common';

import {User} from "../users/users.model";

import { TypeOrmModule } from '@nestjs/typeorm';

import {Role} from "../roles/roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import { PassportModule } from '@nestjs/passport';
import { RoutsLocations } from '../routs/routs_locations.model';
import { Location } from './locations.model';

@Module({
  providers: [LocationsService],
  controllers: [LocationsController],
  imports: [
    TypeOrmModule.forFeature([User, Role, Location, RoutsLocations]),
      RolesModule,
      forwardRef(() => AuthModule),
      PassportModule
  ],
    exports: [
      LocationsService,
    ]
})
export class LocationsModule {}