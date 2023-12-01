import { Module } from '@nestjs/common';
import { InventionGrid } from './inventionGrid.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventionGridController } from './inventionGrid.controller';
import { InventionGridService } from './inventionGrid.service';
import {  JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/middleware/authGuad.middleware';
import { AuthConfig } from 'src/auth/auth.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([InventionGrid]),
      ],
  controllers: [InventionGridController],
  providers: [InventionGridService, AuthGuard,AuthConfig,JwtService],
  exports: [InventionGridService],
})
export class InventionGridModule {}
