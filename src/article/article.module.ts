import { Module } from '@nestjs/common';
import { Article } from './article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import {  JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/middleware/authGuad.middleware';
import { AuthConfig } from 'src/auth/auth.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([Article]),
      ],
  controllers: [ArticleController],
  providers: [ArticleService, AuthGuard,AuthConfig,JwtService],
  exports: [ArticleService],
})
export class ArticleModule {}
