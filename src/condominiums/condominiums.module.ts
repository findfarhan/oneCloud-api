import { Module } from '@nestjs/common';
import { Condominiums } from './condominiums.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CondominiumsController } from './condominiums.controller';
import { CondominiumsService } from './condominiums.service';
import {  JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/middleware/authGuad.middleware';
import { AuthConfig } from 'src/auth/auth.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([Condominiums]),
      ],
  controllers: [CondominiumsController],
  providers: [CondominiumsService, AuthGuard,AuthConfig,JwtService],
  exports: [CondominiumsService],
})
export class CondominiumsModule {}
