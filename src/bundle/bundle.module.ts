import { Module } from '@nestjs/common';
import { Bundle } from './bundle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BundleController } from './bundle.controller';
import { BundleService } from './bundle.service';
import {  JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/middleware/authGuad.middleware';
import { AuthConfig } from 'src/auth/auth.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([Bundle]),
      ],
  controllers: [BundleController],
  providers: [BundleService, AuthGuard,AuthConfig,JwtService],
  exports: [BundleService],
})
export class BundleModule {}
