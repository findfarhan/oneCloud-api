import { Module } from '@nestjs/common';
import { MorRates } from './morRates.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MorRatesController } from './morRates.controller';
import { MorRatesService } from './morRates.service';
import {  JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/middleware/authGuad.middleware';
import { AuthConfig } from 'src/auth/auth.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([MorRates]),
      ],
  controllers: [MorRatesController],
  providers: [MorRatesService, AuthGuard,AuthConfig,JwtService],
  exports: [MorRatesService],
})
export class MorRatesModule {}
