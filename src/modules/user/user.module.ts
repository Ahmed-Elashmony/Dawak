import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userDBModel } from '../../../DB/User/user.schema';
import { UserdbService } from '../../../DB/User/userdb/userdb.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CartService } from '../../modules/cart/cart.service';
import { CartdbService } from '../../../DB/Cart/cartdb/cartdb.service';
import { cartDBModel } from '../../../DB/Cart/cart.schema';
import { tokenDBModel } from 'DB/token/token.schema';
import { TokendbService } from 'DB/token/tokendb/tokendb.service';

@Module({
  imports: [userDBModel, cartDBModel, tokenDBModel],
  controllers: [UserController],
  providers: [
    UserService,
    UserdbService,
    JwtService,
    CartdbService,
    CartService,
    TokendbService,
  ],
  exports: [UserdbService],
})
export class UserModule {}
