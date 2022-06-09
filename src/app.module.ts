import {Module} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { TicketsModule } from './tickets/tickets.module';
import { AppController } from "./app.controller";
import { RoutsModule } from './routs/routs.module';
import { LocationsModule } from './locations/locations.module';

@Module({
    controllers: [AppController],
    providers: [],
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db',
            entities: ['dist/**/*.model.js'],
            synchronize: true,
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        TicketsModule,
        RoutsModule,
        LocationsModule,
    ]
})
export class AppModule {}
