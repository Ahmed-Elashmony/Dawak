import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PharmadbService } from 'DB/Pharma/pharmadb/pharmadb.service';
import { UserdbService } from 'DB/User/userdb/userdb.service';

@Injectable()
export class PharmaService {
  constructor(
    private readonly _pharmaModel: PharmadbService,
    private readonly _userModel: UserdbService,
  ) {}

  async addPharma(body: any, req: any): Promise<any> {
    const checkPharma = await this._pharmaModel.findOne({ name: body.name });
    if (checkPharma) throw new ConflictException(`This Pharma already exist`);
    body.createdBy = req.user._id;
    const pharma = await this._pharmaModel.create({ ...body });
    return { message: 'Pharma Created Successfully', pharma };
  }

  async pendingPharma(): Promise<any> {
    const pharma = await this._pharmaModel.find({ confirmed: false });
    return { message: 'Pharma Fetched Successfully', pharma };
  }

  async confirmPharma(param: any): Promise<any> {
    const pharma = await this._pharmaModel.findByIdAndUpdate(param.id, {
      confirmed: true,
    });
    if (!pharma) throw new NotFoundException(`This Pharma doesn't exist`);
    await this._userModel.findByIdAndUpdate(
      { _id: pharma.createdBy },
      {
        role: 'admin',
      },
    );
    return { message: 'Pharma Confirmed Successfully', pharma };
  }

  async getAllPharma(): Promise<any> {
    const pharma = await this._pharmaModel.find({ confirmed: true });
    return { message: 'Pharmas Fetched Successfully', pharma };
  }

  async getPharma(param: any): Promise<any> {
    const pharma = await this._pharmaModel.findByIdAndPopulate(param.id);
    if (!pharma) throw new NotFoundException(`This Pharma doesn't exist`);
    return { message: 'Pharma Fetched Successfully', pharma };
  }

  async updatePharma(body: any, param: any): Promise<any> {
    const pharma = await this._pharmaModel.findByIdAndUpdate(param.id, body);
    if (!pharma) throw new NotFoundException(`This Pharma doesn't exist`);
    return { message: 'Pharma Updated Successfully', pharma };
  }
}
