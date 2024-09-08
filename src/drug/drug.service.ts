import { ConflictException, Injectable } from '@nestjs/common';
import { DrugdbService } from '../../DB/Drug/drugdb/drugdb.service';

@Injectable()
export class DrugService {
  constructor(private readonly _drugModel: DrugdbService) {}

  async addDrug(body: any): Promise<any> {
    const checkName = await this._drugModel.findOne({ name: body.name });
    if (checkName) throw new ConflictException(`This drug already exists`);
    const drug = await this._drugModel.create({ ...body });
    return drug;
  }
}
