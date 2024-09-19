import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '../../guard/auth/auth.guard';
import { addSchema } from './cart.joi';
import { JoiValidatePipe } from '../../pipes/joi-validate/joi-validate.pipe';

@Controller('cart')
export class CartController {
  constructor(private readonly _cartService: CartService) {}

  //   when confirm email it create cart auto
  //   @Post()
  //   @UseGuards(AuthGuard)
  //   async createCart(@Body() body: any) {
  //     return await this._cartService.createCart(body.user);
  //   }

  @Get()
  @UseGuards(AuthGuard)
  async getCart(@Req() req: any) {
    return await this._cartService.getCart(req.user._id);
  }

  @Patch()
  @UsePipes(new JoiValidatePipe(addSchema))
  @UseGuards(AuthGuard)
  async addToCart(@Body() body: any, @Req() req: any) {
    return await this._cartService.addToCart(body, req);
  }

  @Patch('/clear')
  @UseGuards(AuthGuard)
  async clearCart(@Req() req: any) {
    return await this._cartService.clearCart(req.user._id);
  }

  @Patch('/remove/:drugId')
  @UseGuards(AuthGuard)
  async remove(@Req() req: any, @Param() param: any, @Query() query: any) {
    return await this._cartService.remove(req.user._id, param, query);
  }
}
