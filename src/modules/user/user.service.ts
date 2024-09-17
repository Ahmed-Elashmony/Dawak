import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserdbService } from '../../../DB/User/userdb/userdb.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import Cryptr from 'cryptr';
import { CartService } from '../../modules/cart/cart.service';
import { confirmTemp, resetPassTemp } from '../../utils/htmlTemp';
import sendEmail from '../../utils/sendEmail';
import { TokendbService } from '../../../DB/token/tokendb/tokendb.service';

@Injectable()
export class UserService {
  constructor(
    private readonly _userModel: UserdbService,
    private readonly _jwtService: JwtService,
    private readonly _cartService: CartService,
    private readonly _tokenService: TokendbService,
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
    const user = await this._userModel.findOneAndUpdate(
      {
        activationCode: param.code,
      },
      { confirm: true, $unset: { activationCode: 1 } },
    );
    await this._cartService.createCart(user['_id']);
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

    await this._tokenService.create({
      token,
      user: user['_id'],
      expireAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
    });

    return { message: 'Login successful', token };
  }

  async update(body: any, req: any): Promise<any> {
    if (body.phone) {
      const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);
      const encryptedPhone = cryptr.encrypt(body.phone);
      body.phone = encryptedPhone;
    }
    const user = await this._userModel.findByIdAndUpdate(
      { _id: req.user.id },
      body,
    );
    return { message: 'Updated', user };
  }

  async getUser(req: any): Promise<any> {
    const user = await this._userModel.findById(req.user.id);
    if (user.phone) {
      const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);
      const phone = cryptr.decrypt(user.phone);
      user.phone = phone;
    }
    return { user };
  }

  async forgetPass(body: any): Promise<any> {
    const code = Math.floor(Math.random() * 1000000 + 1);
    const user = await this._userModel.findOneAndUpdate(
      { email: body.email },
      { $set: { forgetCode: code } },
    );

    await sendEmail({
      to: body.email,
      subject: 'Reset Password',
      html: resetPassTemp(code),
    });

    if (!user) throw new ConflictException('Email Not Found');
    return { message: 'Check Your Email' };
  }

  async resetPass(body: any): Promise<any> {
    const hashPass = await bcrypt.hash(body.password, +process.env.Salat_Round);
    const user = await this._userModel.findOneAndUpdate(
      { forgetCode: body.code },
      { password: hashPass, $unset: { forgetCode: 1 } },
    );
    if (!user) throw new ConflictException('Please provide a valid code');
    await this._tokenService.updateMany(
      { user: user['_id'] },
      { vaild: false },
    );
    return { message: 'Done, Password Changed' };
  }

  async logOut(req: any): Promise<any> {
    await this._tokenService.updateMany(
      { user: req.user.id },
      { vaild: false },
    );
    return { message: 'Logged Out' };
  }
}
