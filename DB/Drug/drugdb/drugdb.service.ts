import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Drug } from '../drug.schema';
import { Model } from 'mongoose';

@Injectable()
export class DrugdbService {
  constructor(@InjectModel(Drug.name) private drugModel: Model<Drug>) {}

  async create(object: any): Promise<Drug> {
    return await this.drugModel.create(object);
  }

  async findOne(object: any): Promise<Drug> {
    return await this.drugModel.findOne(object);
  }

  async find(object: any, skip: number = 0, limit: number = 10): Promise<any> {
    return await this.drugModel
      .find(object)
      .skip(skip)
      .limit(limit)
      .populate({ path: 'pharma', select: 'name' });
  }

  async findById(id: any): Promise<Drug> {
    return await this.drugModel.findById(id);
  }

  async findOneAndUpdate(object1: any, object2: any): Promise<Drug> {
    return await this.drugModel.findOneAndUpdate(object1, object2, {
      new: true,
    });
  }

  async findByIdAndUpdate(object1: any, object2: any): Promise<Drug> {
    return await this.drugModel.findByIdAndUpdate(object1, object2, {
      new: true,
    });
  }
}
