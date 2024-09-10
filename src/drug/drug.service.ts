import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DrugdbService } from '../../DB/Drug/drugdb/drugdb.service';

@Injectable()
export class DrugService {
  constructor(private readonly _drugModel: DrugdbService) {}

  async addDrug(body: any): Promise<any> {
    const checkDrug = await this._drugModel.findOne({
      name: body.name,
      pharma: body.pharma,
    });
    if (checkDrug) throw new ConflictException(`This drug already exists`);
    const drug = await this._drugModel.create({ ...body });
    return { message: 'Drug Created Successfully', drug };
  }

  async updateDrug(body: any, param: any): Promise<any> {
    const drug = await this._drugModel.findOneAndUpdate(
      { name: param.drug, pharma: param.pharma },
      body,
    );
    if (!drug) throw new NotFoundException(`This drug doesn't exist`);
    return { message: 'Drug Updated Successfully', drug };
  }
}
