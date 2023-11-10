import { Module } from '@nestjs/common';
import { UserList } from './userList.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserListController } from './userList.controller';
import { UserListService } from './userList.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/middleware/authGuad.middleware';
import { AuthConfig } from 'src/auth/auth.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserList]),
      ],
  controllers: [UserListController],
  providers: [UserListService, AuthGuard,AuthConfig,JwtService],
  exports: [UserListService],
})
export class UserListModule {}
