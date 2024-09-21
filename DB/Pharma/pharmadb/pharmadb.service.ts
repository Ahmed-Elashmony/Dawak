import { Injectable } from '@nestjs/common';
import { Pharma } from '../pharma.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PharmadbService {
  constructor(
    @InjectModel(Pharma.name) private readonly pharmaModel: Model<Pharma>,
  ) {}
  async create(object: any): Promise<Pharma> {
    return await this.pharmaModel.create(object);
  }

  async find(object: any, skip: number = 0, limit: number = 10): Promise<any> {
    return await this.pharmaModel.find(object).skip(skip).limit(limit);
  }

  async findOne(object: any): Promise<Pharma> {
    return await this.pharmaModel.findOne(object);
  }

  async findByIdAndPopulate(id: any): Promise<Pharma> {
    return await this.pharmaModel
      .findById(id)
      .select('-__v -confirmed -createdAt -updatedAt')
      .populate({ path: 'createdBy', select: 'userName email' })
      .populate({ path: 'drugs', select: 'name price image quantity -pharma' });
  }
  async findById(id: any): Promise<Pharma> {
    return await this.pharmaModel.findById(id);
  }

  async findOneAndUpdate(object1: any, object2: any): Promise<Pharma> {
    return await this.pharmaModel.findOneAndUpdate(object1, object2, {
      new: true,
    });
  }

  async findByIdAndUpdate(object1: any, object2: any): Promise<Pharma> {
    return await this.pharmaModel.findByIdAndUpdate(object1, object2, {
      new: true,
    });
  }
}
