import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '../../guard/auth/auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly _orderService: OrderService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createOrder(@Body() body: any, @Req() req: any) {
    return await this._orderService.createOrder(body, req);
  }

  @Post('webhook')
  async webhook(@Req() req: any, @Res() res: any) {
    return await this._orderService.webhook(req, res);
  }

  @Get()
  @UseGuards(AuthGuard)
  async orders(@Req() req: any) {
    return await this._orderService.orders(req);
  }
}
