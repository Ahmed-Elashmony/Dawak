import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JoiValidatePipe } from 'src/pipes/joi-validate/joi-validate.pipe';
import {
  forgetSchema,
  resetSchema,
  signInSchema,
  signUpSchema,
  updateSchema,
} from './user.joi';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guard/auth/auth.guard';

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

  @Patch()
  @UsePipes(new JoiValidatePipe(updateSchema))
  @UseGuards(AuthGuard)
  update(@Body() body: object, @Req() req: any) {
    return this._userService.update(body, req);
  }

  @Get()
  @UseGuards(AuthGuard)
  get(@Req() req: any) {
    return this._userService.getUser(req);
  }

  @Patch('forget-password')
  @UsePipes(new JoiValidatePipe(forgetSchema))
  forget(@Body() body: object) {
    return this._userService.forgetPass(body);
  }

  @Patch('reset-password')
  @UsePipes(new JoiValidatePipe(resetSchema))
  reset(@Body() body: object) {
    return this._userService.resetPass(body);
  }
}
