import { Module } from '@nestjs/common';
import { NAS } from './nas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NASController } from './nas.controller';
import { NASService } from './nas.service';
import {  JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/middleware/authGuad.middleware';
import { AuthConfig } from 'src/auth/auth.config';
import { Knots } from 'src/knots/knots.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([NAS, Knots]), 
  ],
  controllers: [NASController],
  providers: [NASService, AuthGuard,AuthConfig,JwtService],
  exports: [NASService],
})
export class NASModule {}
