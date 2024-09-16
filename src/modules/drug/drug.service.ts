import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DrugdbService } from '../../../DB/Drug/drugdb/drugdb.service';
import { PharmadbService } from '../../../DB/Pharma/pharmadb/pharmadb.service';
import cloudinary from 'src/utils/cloudinary';

@Injectable()
export class DrugService {
  constructor(
    private readonly _drugModel: DrugdbService,
    private readonly _pharmaModel: PharmadbService,
  ) {}

  async addDrug(body: any, file: any): Promise<any> {
    const checkPharma = await this._pharmaModel.findById(body.pharma);
    if (file) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        file[0].path,
        {
          folder: 'drugs',
        },
      );
      body.image = { url: secure_url, id: public_id };
    }

    if (!checkPharma.confirmed) {
      throw new ConflictException(`This Pharma is not confirmed yet`);
    }
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

  async getDrug(param: any): Promise<any> {
    const drug = await this._drugModel.findById(param.id);
    if (!drug) throw new NotFoundException(`This drug doesn't exist`);
    return { message: 'Drug Fetched Successfully', drug };
  }

  async serachDrug(query: any): Promise<any> {
    if (query.name == '' || query.name == ' ') {
      return { message: 'Drug Fetched Successfully', drugs: [] };
    }

    // Set default values for page and limit if not provided
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;

    const skip = (page - 1) * limit;
    if (query.pharma) {
      const drugs = await this._drugModel.find(
        {
          name: { $regex: query.name, $options: 'i' },
          pharma: query.pharma,
        },
        skip,
        limit,
      );
      return { message: 'Drug Fetched Successfully', drugs };
    }
    const drugs = await this._drugModel.find(
      {
        name: { $regex: query.name, $options: 'i' },
      },
      skip,
      limit,
    );
    return { message: 'Drug Fetched Successfully', drugs };
  }
}
