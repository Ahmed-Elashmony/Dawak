import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userDBModel } from 'DB/User/user.schema';
import { UserdbService } from 'DB/User/userdb/userdb.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CartService } from 'src/cart/cart.service';
import { CartdbService } from 'DB/Cart/cartdb/cartdb.service';
import { cartDBModel } from 'DB/Cart/cart.schema';

@Module({
  imports: [userDBModel, cartDBModel],
  controllers: [UserController],
  providers: [
    UserService,
    UserdbService,
    JwtService,
    CartdbService,
    CartService,
  ],
  exports: [UserdbService],
})
export class UserModule {}
