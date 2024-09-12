import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
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
}
