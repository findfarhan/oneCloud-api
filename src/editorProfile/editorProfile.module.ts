import { Module } from '@nestjs/common';
import { EditorProfile } from './editorProfile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EditorProfileController } from './editorProfile.controller';
import { EditorProfileService } from './editorProfile.service';
import {  JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/middleware/authGuad.middleware';
import { AuthConfig } from 'src/auth/auth.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([EditorProfile]),
      ],
  controllers: [EditorProfileController],
  providers: [EditorProfileService, AuthGuard,AuthConfig,JwtService],
  exports: [EditorProfileService],
})
export class EditorProfileModule {}
