import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserdbService } from 'DB/User/userdb/userdb.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _userModel: UserdbService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const { token } = req.headers;
    if (!token) {
      throw new UnauthorizedException('LogIn First');
    }
    try {
      const payload = this._jwtService.verify(token, {
        secret: process.env.Secert_Key_Auth,
      });

      const user = await this._userModel.findById(payload.id);

      if (!user) {
        throw new NotFoundException();
      }
      req.user = user;
      return true;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
