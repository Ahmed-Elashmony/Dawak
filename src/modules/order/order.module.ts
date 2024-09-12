import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { orderDBModel } from 'DB/Order/order.schema';
import { OrderService } from './order.service';
import { JwtService } from '@nestjs/jwt';
import { UserdbService } from 'DB/User/userdb/userdb.service';
import { userDBModel } from 'DB/User/user.schema';
import { CartdbService } from 'DB/Cart/cartdb/cartdb.service';
import { OrderdbService } from 'DB/Order/orderdb/orderdb.service';
import { cartDBModel } from 'DB/Cart/cart.schema';

@Module({
  imports: [orderDBModel, userDBModel, cartDBModel],
  controllers: [OrderController],
  providers: [
    OrderService,
    JwtService,
    UserdbService,
    OrderdbService,
    CartdbService,
  ],
})
export class OrderModule {}
