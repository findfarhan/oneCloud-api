import { Module } from '@nestjs/common';
import { NetMap } from './netMap.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetMapController } from './netMap.controller';
import { NetMapService } from './netMap.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/middleware/authGuad.middleware';
import { AuthConfig } from 'src/auth/auth.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([NetMap]),
      ],
  controllers: [NetMapController],
  providers: [NetMapService, AuthGuard,AuthConfig,JwtService],
  exports: [NetMapService],
})
export class NetMapModule {}
