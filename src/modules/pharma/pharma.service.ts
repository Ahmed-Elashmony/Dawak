import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PharmadbService } from '../../../DB/Pharma/pharmadb/pharmadb.service';
import { UserdbService } from '../../../DB/User/userdb/userdb.service';
import cloudinary from '../../utils/cloudinary';
import * as streamifier from 'streamifier';

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

  async pendingPharma(query): Promise<any> {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const pharma = await this._pharmaModel.find(
      { confirmed: false },
      skip,
      limit,
    );
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

  async getAllPharma(query): Promise<any> {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const pharma = await this._pharmaModel.find(
      { confirmed: true },
      skip,
      limit,
    );
    return { message: 'Pharmas Fetched Successfully', pharma };
  }

  async getPharma(param: any): Promise<any> {
    const pharma = await this._pharmaModel.findByIdAndPopulate(param.id);
    if (!pharma) throw new NotFoundException(`This Pharma doesn't exist`);
    return { message: 'Pharma Fetched Successfully', pharma };
  }

  async updatePharma(body: any, param: any, image: any): Promise<any> {
    if (image) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'pharma',
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        );
        streamifier.createReadStream(image).pipe(uploadStream);
      });

      body.image = { url: result['secure_url'], id: result['public_id'] };
    }

    const pharma = await this._pharmaModel.findByIdAndUpdate(param.id, body);
    if (!pharma) throw new NotFoundException(`This Pharma doesn't exist`);
    return { message: 'Pharma Updated Successfully', pharma };
  }

  async searchPharma(query: any): Promise<any> {
    if (query.name == '' || query.name == ' ') {
      return { message: 'Pharma Fetched Successfully', pharma: [] };
    }

    // Set default values for page and limit if not provided
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 5;
    const skip = (page - 1) * limit;

    const pharma = await this._pharmaModel.find(
      {
        name: { $regex: query.name, $options: 'i' },
      },
      skip,
      limit,
    );
    return { message: 'Pharma Fetched Successfully', pharma };
  }

  async pharmaByCity(param: any, query: any): Promise<any> {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 5;
    const skip = (page - 1) * limit;

    const pharma = await this._pharmaModel.find(
      {
        city: param.city,
      },
      skip,
      limit,
    );
    return { message: 'Pharma Fetched Successfully', pharma };
  }

  async searchParma(query: any): Promise<any> {
    if (query.name == '' || query.name == ' ') {
      return { message: 'Pharma Fetched Successfully', pharma: [] };
    }

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 5;
    const skip = (page - 1) * limit;

    const pharma = await this._pharmaModel.find(
      {
        name: { $regex: query.name, $options: 'i' },
      },
      skip,
      limit,
    );
    return { message: 'Pharma Fetched Successfully', pharma };
  }
}
