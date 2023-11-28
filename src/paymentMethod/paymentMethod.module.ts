import { Module } from '@nestjs/common';
import { PaymentMethod } from './paymentMethod.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethodController } from './paymentMethod.controller';
import { PaymentMethodService } from './paymentMethod.service';
import {  JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/middleware/authGuad.middleware';
import { AuthConfig } from 'src/auth/auth.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([PaymentMethod]),
      ],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService, AuthGuard,AuthConfig,JwtService],
  exports: [PaymentMethodService],
})
export class PaymentMethodModule {}
