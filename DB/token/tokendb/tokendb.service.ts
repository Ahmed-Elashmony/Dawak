import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from '../token.schema';
import { Model } from 'mongoose';

@Injectable()
export class TokendbService {
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<Token>,
  ) {}

  async create(object: any): Promise<Token> {
    return await this.tokenModel.create(object);
  }

  async find(object: any, skip: number = 0, limit: number = 10): Promise<any> {
    return await this.tokenModel.find(object).skip(skip).limit(limit);
  }

  async findOne(object: any): Promise<Token> {
    return await this.tokenModel.findOne(object);
  }

  async findOneAndUpdate(object1: any, object2: any): Promise<Token> {
    return await this.tokenModel.findOneAndUpdate(object1, object2, {
      new: true,
    });
  }

  async updateMany(object1: any, object2: any): Promise<any> {
    return await this.tokenModel.updateMany(object1, object2, {
      new: true,
    });
  }
}
