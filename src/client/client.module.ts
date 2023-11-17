import { Module } from '@nestjs/common';
import { Client } from './client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientControll } from './client.controller';
import { ClientService } from './client.service';
import {  JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/middleware/authGuad.middleware';
import { AuthConfig } from 'src/auth/auth.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([Client]),
      ],
  controllers: [ClientControll],
  providers: [ClientService, AuthGuard,AuthConfig,JwtService],
  exports: [ClientService],
})
export class ClientModule {}
