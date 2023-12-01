import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvPath } from './common/helper/env.helper';
import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import DatabaseModule from './database/database.module';
import { HomeModule } from './addUser/user.module';
import { PartnerModule } from './partner/partner.module';
import { UserListModule } from './userList/userList.module';
import { NetMapModule } from './netMap/netMap.module';
import { PassiveInvoiceModule } from './passiveInvoice/passiveInvoice.module';
import { ProviderModule } from './providers/provider.module';
import { ClientModule } from './client/client.module';
import { TicketModule } from './ticketManagment/ticket.module';
import { IpListModule } from './ipList/ipList.module';
import { CondominiumsModule } from './condominiums/condominiums.module';
import { KnotsModule } from './knots/knots.module';
import { NASModule } from './nas/nas.module';
import { AccessPointModule } from './accesspoint/accessPoint.module';
import { EditorProfileModule } from './editorProfile/editorProfile.module';
import { MorRatesModule } from './morRates/morRates.module';
import { PaymentMethodModule } from './paymentMethod/paymentMethod.module';
import { BilligGroupModule } from './billingGroup/billingGroup.module';
import { RateModule } from './rate/rate.module';
import { InventionGridModule } from './inventionGrid/inventionGrid.module';

const envFilePath: string = getEnvPath(
  `${__dirname}/common/envs`,
);
console.log('envsFilePath', envFilePath);
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (
        configService: ConfigService,
      ) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get<number>(
          'DATABASE_PORT',
        ),
        username: configService.get(
          'DATABASE_USER',
        ),
        password: configService.get(
          'DATABASE_PASSWORD',
        ),
        database: configService.get(
          'DATABASE_NAME',
        ),
        entities: ['dist/**/*.entity.{ts,js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    AuthModule,
    HomeModule,
    PartnerModule,
    UserListModule,
    NetMapModule,
    PassiveInvoiceModule,
    ProviderModule,
    ClientModule,
    TicketModule,
    IpListModule,
    AccessPointModule,
    CondominiumsModule,
    KnotsModule,
    NASModule,
    EditorProfileModule,
    MorRatesModule,
    PaymentMethodModule,
    BilligGroupModule,
    RateModule,
    InventionGridModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(configService: ConfigService) {

 
  }
}
