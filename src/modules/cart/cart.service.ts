import { Injectable } from '@nestjs/common';
import { CartdbService } from '../../../DB/Cart/cartdb/cartdb.service';

@Injectable()
export class CartService {
  constructor(private readonly _cartModel: CartdbService) {}

  async createCart(user: any) {
    await this._cartModel.create({ user });
  }

  async getCart(user: any) {
    return await this._cartModel.findOneAndPopulate({ user });
  }

  async addToCart(body: any, req: any) {
    const user = req.user._id;
    const cart = await this._cartModel.findOne({ user });
    const check = cart.drug.find((e) => e.drugId == body.drugId);
    if (check) {
      check.quantity += body.quantity;
      return await this._cartModel.findOneAndUpdate(
        { user },
        { drug: cart.drug },
      );
    }
    cart.drug.push(body);
    return await this._cartModel.findOneAndUpdate(
      { user },
      { drug: cart.drug },
    );
  }

  async clearCart(user: any) {
    return await this._cartModel.findOneAndUpdate({ user }, { drug: [] });
  }
}
