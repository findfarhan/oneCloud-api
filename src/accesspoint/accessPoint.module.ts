import { Module } from '@nestjs/common';
import { AccessPoint } from './accessPoint.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessPointController } from './accessPoint.controller';
import { AccessPointService } from './accessPoint.service';
import {  JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/middleware/authGuad.middleware';
import { AuthConfig } from 'src/auth/auth.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([AccessPoint]),
      ],
  controllers: [AccessPointController],
  providers: [AccessPointService, AuthGuard,AuthConfig,JwtService],
  exports: [AccessPointService],
})
export class IpListModule {}
