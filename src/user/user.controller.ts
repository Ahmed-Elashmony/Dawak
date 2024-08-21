import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { JoiValidatePipe } from 'src/pipes/joi-validate/joi-validate.pipe';
import { signInSchema, signUpSchema } from './user.joi';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post('sign-up')
  @UsePipes(new JoiValidatePipe(signUpSchema))
  signUp(@Body() body: object): any {
    return this._userService.signUp(body);
  }

  @Get('confirm/:code')
  confirmEmail(@Param() param: any) {
    return this._userService.confirmEmail(param);
  }

  @Post('sign-in')
  @UsePipes(new JoiValidatePipe(signInSchema))
  signIn(@Body() body: object) {
    return this._userService.signIn(body);
  }
}
