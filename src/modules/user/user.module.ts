import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userDBModel } from '../../../DB/User/user.schema';
import { UserdbService } from '../../../DB/User/userdb/userdb.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CartService } from '../../modules/cart/cart.service';
import { CartdbService } from '../../../DB/Cart/cartdb/cartdb.service';
import { cartDBModel } from '../../../DB/Cart/cart.schema';
import { tokenDBModel } from '../../../DB/token/token.schema';
import { TokendbService } from '../../../DB/token/tokendb/tokendb.service';
import { DrugdbService } from 'DB/Drug/drugdb/drugdb.service';
import { drugDBModel } from 'DB/Drug/drug.schema';

@Module({
  imports: [userDBModel, cartDBModel, tokenDBModel, drugDBModel],
  controllers: [UserController],
  providers: [
    UserService,
    UserdbService,
    JwtService,
    CartdbService,
    CartService,
    TokendbService,
    DrugdbService,
  ],
  exports: [UserdbService],
})
export class UserModule {}
