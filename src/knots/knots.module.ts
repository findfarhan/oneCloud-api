import { Module } from '@nestjs/common';
import { Knots } from './knots.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KnotsController } from './knots.controller';
import { KnotsService } from './knots.service';
import {  JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/middleware/authGuad.middleware';
import { AuthConfig } from 'src/auth/auth.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([Knots]),
      ],
  controllers: [KnotsController],
  providers: [KnotsService, AuthGuard,AuthConfig,JwtService],
  exports: [KnotsService],
})
export class KnotsModule {}
