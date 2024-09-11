import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Cart } from '../cart.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CartdbService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
  ) {}

  async create(object: any): Promise<Cart> {
    return await this.cartModel.create(object);
  }

  async find(object: any): Promise<any> {
    return await this.cartModel.find(object);
  }

  async findOneAndPopulate(object: any): Promise<Cart> {
    return await this.cartModel.findOne(object).populate({
      path: 'drug.drugId',
      select: 'name price pharma',
      populate: { path: 'pharma', select: 'name' },
    });
  }

  async findOne(object: any): Promise<Cart> {
    return await this.cartModel.findOne(object);
  }

  async findById(id: any): Promise<Cart> {
    return await this.cartModel.findById(id);
  }

  async findOneAndUpdate(object1: any, object2: any): Promise<Cart> {
    return await this.cartModel.findOneAndUpdate(object1, object2, {
      new: true,
    });
  }

  async findByIdAndUpdate(object1: any, object2: any): Promise<Cart> {
    return await this.cartModel.findByIdAndUpdate(object1, object2, {
      new: true,
    });
  }
}
