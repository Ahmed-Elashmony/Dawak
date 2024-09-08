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
}
