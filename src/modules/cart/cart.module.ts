import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { cartDBModel } from '../../../DB/Cart/cart.schema';
import { CartdbService } from '../../../DB/Cart/cartdb/cartdb.service';
import { userDBModel } from '../../../DB/User/user.schema';
import { UserdbService } from '../../../DB/User/userdb/userdb.service';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TokendbService } from '../../../DB/token/tokendb/tokendb.service';
import { tokenDBModel } from '../../../DB/token/token.schema';

@Module({
  imports: [cartDBModel, userDBModel, tokenDBModel],
  controllers: [CartController],
  providers: [
    CartService,
    CartdbService,
    JwtService,
    UserdbService,
    TokendbService,
  ],
})
export class CartModule {}
