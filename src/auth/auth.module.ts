import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthService } from './jwt-auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthConfig } from './auth.config'; 

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthService, JwtService, AuthConfig], 
  exports:[AuthConfig]
})
export class AuthModule {}
