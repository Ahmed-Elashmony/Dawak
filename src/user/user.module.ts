import { Module } from '@nestjs/common';
import { userDBModel } from 'DB/User/user.schema';
import { UserdbService } from 'DB/User/userdb/userdb.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [userDBModel],
  controllers: [UserController],
  providers: [UserService, UserdbService],
  exports: [UserdbService],
})
export class UserModule {}
