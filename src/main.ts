import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { config } from 'dotenv';
import { getEnvPath } from './common/helper/env.helper';
import { ValidationPipe } from '@nestjs/common';
config({ path: getEnvPath(`${__dirname}/common/envs`) });


export let app: NestExpressApplication;

async function bootstrap() {

  app = await NestFactory.create(AppModule, {
    rawBody: true,
  });
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  const swagConfig = new DocumentBuilder()
  .setTitle('OneCloud')
  .setDescription('OneCloud api description')
  .setVersion('1.0')
  .addTag('')
  .addBearerAuth()
  .build();
const document = SwaggerModule.createDocument(app, swagConfig);
SwaggerModule.setup('api', app, document);
app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(port);
}
bootstrap();
