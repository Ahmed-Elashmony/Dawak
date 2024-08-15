import { ConflictException, Injectable } from '@nestjs/common';
import { UserdbService } from 'DB/User/userdb/userdb.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(private readonly _userModel: UserdbService) {}

  async signUp(body: any): Promise<any> {
    const checkEmail = await this._userModel.findOne({ email: body.email });
    if (checkEmail) {
      throw new ConflictException(`Email ${body.email} registed before`);
    }
    const checkName = await this._userModel.findOne({
      userName: body.userName,
    });
    if (checkName) {
      throw new ConflictException(`Name Must Be Unique`);
    }
    const activationCode = crypto.randomBytes(64).toString('hex');
    body.activationCode = activationCode;

    //hash pass
    const hashPass = await bcrypt.hash(body.password, +process.env.Salat_Round);
    body.password = hashPass;

    await this._userModel.create({ ...body });

    return { message: 'Please Confirm Email, Check Your Gmail' };
  }
}
