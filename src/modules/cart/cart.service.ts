import { ConflictException, Injectable } from '@nestjs/common';
import { CartdbService } from '../../../DB/Cart/cartdb/cartdb.service';
import { DrugdbService } from 'DB/Drug/drugdb/drugdb.service';

@Injectable()
export class CartService {
  constructor(
    private readonly _cartModel: CartdbService,
    private readonly _drugModel: DrugdbService,
  ) {}

  async createCart(user: any) {
    await this._cartModel.create({ user });
  }

  async getCart(user: any) {
    return await this._cartModel.findOneAndPopulate({ user });
  }

  async addToCart(body: any, req: any) {
    const user = req.user._id;

    const cart = await this._cartModel.findOne({ user });

    const drug = await this._drugModel.findById(body.drugId);

    const check = cart.drug.find((e) => e.drugId == body.drugId);
    if (check) {
      check.quantity += body.quantity;
      if (check.quantity > drug.quantity) {
        throw new ConflictException(`Sorry, Only ${drug.quantity} available`);
      }
      return await this._cartModel.findOneAndUpdate(
        { user },
        { drug: cart.drug },
      );
    }

    if (body.quantity > drug.quantity) {
      throw new ConflictException(`Sorry, Only ${drug.quantity} available`);
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

  async remove(userId: any, param: any, query: any) {
    if (query.quantity) {
      const Cart = await this._cartModel.findOne({ user: userId });

      const drug = Cart.drug.find((e) => e.drugId == param.drugId);

      if (drug.quantity > query.quantity) {
        drug.quantity -= query.quantity;
        const cart = await this._cartModel.findOneAndUpdate(
          { user: userId },
          { drug: Cart.drug },
        );

        return { message: 'Drug quantity updated', cart };
      }
    }

    const cart = await this._cartModel.findOneAndUpdate(
      { user: userId },
      { $pull: { drug: { drugId: param.drugId } } },
    );

    return { message: 'Drug removed from cart', cart };
  }
}
