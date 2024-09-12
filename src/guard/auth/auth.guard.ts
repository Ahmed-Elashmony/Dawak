import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserdbService } from '../../../DB/User/userdb/userdb.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _userModel: UserdbService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const { token } = req.headers;
    if (!token) {
      throw new UnauthorizedException('LogIn First');
    }
    try {
      const payload = this._jwtService.verify(token, {
        secret: process.env.SECRET_KEY,
      });

      const user = await this._userModel.findById(payload.id);

      if (!user) {
        throw new NotFoundException();
      }
      const roles = this.reflector.getAllAndOverride<string>('roles', [
        context.getHandler(),
      ]);

      if (roles && !roles.includes(user.role)) {
        throw new UnauthorizedException('');
      }
      req.user = user;
      return true;
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }
}
