/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { Home } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeController } from './user.controller';
import { HomeService } from './user.service';
import { AuthGuard } from 'src/middleware/authGuad.middleware';
import { AuthConfig } from 'src/auth/auth.config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Home])],
  controllers: [HomeController],
  providers: [HomeService, AuthGuard, AuthConfig,JwtService],
  exports: [HomeService],
})
export class HomeModule {}
