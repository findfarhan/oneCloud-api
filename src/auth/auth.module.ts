import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { User } from "./auth.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtAuthService } from "./jwt-auth.service";


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers :[AuthController],
    providers:[AuthService]
})
export class AuthModule{}