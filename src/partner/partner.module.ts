import { Module } from '@nestjs/common';
import { Partner } from './partner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/middleware/authGuad.middleware';
import { AuthConfig } from 'src/auth/auth.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([Partner]),
      ],
  controllers: [PartnerController],
  providers: [PartnerService, AuthGuard,AuthConfig,JwtService],
  exports: [PartnerService],
})
export class PartnerModule {}
