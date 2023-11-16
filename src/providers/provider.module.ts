import { Module } from '@nestjs/common';
import { Provider } from './provider.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderController } from './provider.controller';
import { ProviderService } from './provider.service';
import {  JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/middleware/authGuad.middleware';
import { AuthConfig } from 'src/auth/auth.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([Provider]),
      ],
  controllers: [ProviderController],
  providers: [ProviderService, AuthGuard,AuthConfig,JwtService],
  exports: [ProviderService],
})
export class ProviderModule {}
