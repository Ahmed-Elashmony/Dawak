import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../order.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrderdbService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async create(object: any): Promise<Order> {
    return await this.orderModel.create(object);
  }

  async find(object: any): Promise<any> {
    return await this.orderModel.find(object);
  }

  async findOneAndPopulate(object: any): Promise<Order> {
    return await this.orderModel.findOne(object).populate({
      path: 'drug.drugId',
      select: 'name price pharma',
      populate: { path: 'pharma', select: 'name' },
    });
  }

  async findOne(object: any): Promise<Order> {
    return await this.orderModel.findOne(object);
  }

  async findById(id: any): Promise<Order> {
    return await this.orderModel.findById(id);
  }

  async findOneAndUpdate(object1: any, object2: any): Promise<Order> {
    return await this.orderModel.findOneAndUpdate(object1, object2, {
      new: true,
    });
  }

  async findByIdAndUpdate(object1: any, object2: any): Promise<Order> {
    return await this.orderModel.findByIdAndUpdate(object1, object2, {
      new: true,
    });
  }
}
