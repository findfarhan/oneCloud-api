import { Module } from '@nestjs/common';
import { IpList } from './ipList.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IpListController } from './ipList.controller';
import { IpListService } from './ipList.service';
import {  JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/middleware/authGuad.middleware';
import { AuthConfig } from 'src/auth/auth.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([IpList]),
      ],
  controllers: [IpListController],
  providers: [IpListService, AuthGuard,AuthConfig,JwtService],
  exports: [IpListService],
})
export class IpListModule {}
