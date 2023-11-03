import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvPath } from './common/helper/env.helper';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import DatabaseModule from './database/database.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);
console.log('envsFilePath',envFilePath)
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: ['dist/**/*.entity.{ts,js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(configService: ConfigService) {
    console.log('DATABASE_HOST:', configService.get('DATABASE_HOST'));
    console.log('DATABASE_NAME:', configService.get('DATABASE_NAME'));
    console.log('DATABASE_USER:', configService.get('DATABASE_USER'));
    console.log('DATABASE_PASSWORD:', configService.get('DATABASE_PASSWORD'));
    console.log('DATABASE_PORT:', configService.get('DATABASE_PORT'));
  }
}
