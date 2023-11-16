import { Module } from '@nestjs/common';
import { PassiveInvoice } from './passiveInvoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassiveInvoiceController } from './passiveInvoice.controller';
import { PassiveInvoiceService } from './passiveInvoice.service';
import {  JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/middleware/authGuad.middleware';
import { AuthConfig } from 'src/auth/auth.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([PassiveInvoice]),
      ],
  controllers: [PassiveInvoiceController],
  providers: [PassiveInvoiceService, AuthGuard,AuthConfig,JwtService],
  exports: [PassiveInvoiceService],
})
export class PassiveInvoiceModule {}
