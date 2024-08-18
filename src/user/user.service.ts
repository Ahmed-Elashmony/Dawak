import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserdbService } from 'DB/User/userdb/userdb.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { confirmTemp } from 'src/utils/htmlTemp';
import sendEmail from 'src/utils/sendEmail';

@Injectable()
export class UserService {
  constructor(
    private readonly _userModel: UserdbService,
    private readonly _jwtService: JwtService,
  ) {}

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

    const link = `http://localhost:3000/user/confirm/${activationCode}`;

    await sendEmail({
      to: body.email,
      subject: 'Confirm Email',
      html: confirmTemp(link),
    });

    await this._userModel.create({ ...body });

    return { message: 'Please Confirm Email, Check Your Gmail' };
  }

  async confirmEmail(param: any): Promise<any> {
    await this._userModel.findOneAndUpdate(
      {
        activationCode: param.code,
      },
      { confirm: true, $unset: { activationCode: 1 } },
    );
    return { message: 'Done' };
  }

  async signIn(body: any): Promise<any> {
    const user = await this._userModel.findOne({ email: body.email });
    if (!user) {
      throw new ConflictException('Email Not Found');
    }
    const matchPass = await bcrypt.compare(body.password, user.password);
    if (!matchPass) {
      throw new ConflictException('wrong password');
    }

    delete user.password;

    const token = this._jwtService.sign(
      { id: user['_id'], email: user.email },
      { secret: process.env.SECRET_KEY },
    );

    return { message: 'Login successful', user, token };
  }
}
