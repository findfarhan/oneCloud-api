import { Module } from '@nestjs/common';
import { Home } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeController } from './user.controller';
import { HomeService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { MiddlewareConfig } from 'src/middleware/midddleware.config';
import { AuthGuard } from 'src/middleware/authGuad.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Home]),
    JwtModule.register({
      secret: MiddlewareConfig.jwt_secret,
    }),
  ],
  controllers: [HomeController],
  providers: [HomeService, AuthGuard],
  exports: [HomeService],
})
export class HomeModule {}







  
