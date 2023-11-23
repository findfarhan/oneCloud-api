import { Module } from '@nestjs/common';
import { NAS } from './nas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NASController } from './nas.controller';
import { NASService } from './nas.service';
import {  JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/middleware/authGuad.middleware';
import { AuthConfig } from 'src/auth/auth.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([NAS]),
      ],
  controllers: [NASController],
  providers: [NASService, AuthGuard,AuthConfig,JwtService],
  exports: [NASService],
})
export class NASModule {}
