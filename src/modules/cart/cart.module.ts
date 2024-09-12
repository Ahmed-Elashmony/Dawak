import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { cartDBModel } from '../../../DB/Cart/cart.schema';
import { CartdbService } from '../../../DB/Cart/cartdb/cartdb.service';
import { userDBModel } from '../../../DB/User/user.schema';
import { UserdbService } from '../../../DB/User/userdb/userdb.service';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports: [cartDBModel, userDBModel],
  controllers: [CartController],
  providers: [CartService, CartdbService, JwtService, UserdbService],
})
export class CartModule {}
