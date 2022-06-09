import {forwardRef, Module} from '@nestjs/common';

import {User} from "../users/users.model";

import { TypeOrmModule } from '@nestjs/typeorm';

import {Role} from "../roles/roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import { PassportModule } from '@nestjs/passport';
import { RoutsController } from './routs.controller';
import { RoutsService } from './routs.service';
import { LocationsModule } from '../locations/locations.module';
import { Location } from '../locations/locations.model';
import { Route } from './routs.model';
import { RoutsLocations } from './routs_locations.model';

@Module({
  controllers: [RoutsController],
  providers: [RoutsService],
  imports: [
    TypeOrmModule.forFeature([User, Role, Route, Location, RoutsLocations]),
      RolesModule,
      forwardRef(() => AuthModule),
      PassportModule,
      LocationsModule,
  ],
    exports: [
        RoutsService,
    ]
})
export class RoutsModule {}

