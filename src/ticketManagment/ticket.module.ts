import { Module } from '@nestjs/common';
import { Ticket } from './ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import {  JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/middleware/authGuad.middleware';
import { AuthConfig } from 'src/auth/auth.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([Ticket]),
      ],
  controllers: [TicketController],
  providers: [TicketService, AuthGuard,AuthConfig,JwtService],
  exports: [TicketService],
})
export class TicketModule {}
