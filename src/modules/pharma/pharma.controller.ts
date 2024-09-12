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
import { PharmaService } from './pharma.service';
import { AuthGuard } from '../../guard/auth/auth.guard';
import { JoiValidatePipe } from '../../pipes/joi-validate/joi-validate.pipe';
import { addSchema, updateSchema } from './pharma.joi';
import { Roles } from '../../decoreator/roles/roles.decorator';

@Controller('pharma')
export class PharmaController {
  constructor(private readonly _pharmaService: PharmaService) {}

  @Post()
  @UsePipes(new JoiValidatePipe(addSchema))
  @UseGuards(AuthGuard)
  addPharma(@Body() body: object, @Req() req: object): any {
    return this._pharmaService.addPharma(body, req);
  }

  @Get('/pending')
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  pendingPharma(): any {
    return this._pharmaService.pendingPharma();
  }

  @Get('/all')
  getAllPharma(): any {
    return this._pharmaService.getAllPharma();
  }

  @Get('/:id')
  getPharma(@Param() param: object): any {
    return this._pharmaService.getPharma(param);
  }

  @Patch('/confirm/:id')
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  confirmPharma(@Param() param: object): any {
    return this._pharmaService.confirmPharma(param);
  }

  @Patch('/:id')
  @UsePipes(new JoiValidatePipe(updateSchema))
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  updatePharma(@Body() body: object, @Param() param: object): any {
    return this._pharmaService.updatePharma(body, param);
  }
}
