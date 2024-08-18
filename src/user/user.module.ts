import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userDBModel } from 'DB/User/user.schema';
import { UserdbService } from 'DB/User/userdb/userdb.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [userDBModel],
  controllers: [UserController],
  providers: [UserService, UserdbService, JwtService],
  exports: [UserdbService],
})
export class UserModule {}
