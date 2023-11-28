import { Module } from '@nestjs/common';
import { Rate } from './rate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';
import {  JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/middleware/authGuad.middleware';
import { AuthConfig } from 'src/auth/auth.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([Rate]),
      ],
  controllers: [RateController],
  providers: [RateService, AuthGuard,AuthConfig,JwtService],
  exports: [RateService],
})
export class RateModule {}
