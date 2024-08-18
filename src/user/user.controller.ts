import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post('sign-up')
  // @UsePipes(valid)
  signUp(@Body() body: object): any {
    return this._userService.signUp(body);
  }

  @Get('confirm/:code')
  confirmEmail(@Param() param: any) {
    return this._userService.confirmEmail(param);
  }

  @Post('sign-in')
  signIn(@Body() body: object) {
    return this._userService.signIn(body);
  }
}
