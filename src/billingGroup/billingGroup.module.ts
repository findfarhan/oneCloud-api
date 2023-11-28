import { Module } from '@nestjs/common';
import { BillingGroup } from './billingGroup.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingGroupController } from './billingGroup.controller';
import { BillingGroupService } from './billingGroup.service';
import {  JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/middleware/authGuad.middleware';
import { AuthConfig } from 'src/auth/auth.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([BillingGroup]),
      ],
  controllers: [BillingGroupController],
  providers: [BillingGroupService, AuthGuard,AuthConfig,JwtService],
  exports: [BillingGroupService],
})
export class BilligGroupModule {}
