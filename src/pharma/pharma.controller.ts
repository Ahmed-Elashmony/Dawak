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
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { JoiValidatePipe } from 'src/pipes/joi-validate/joi-validate.pipe';
import { addSchema } from './pharma.joi';
import { Roles } from 'src/decoreator/roles/roles.decorator';

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

  @Patch('/:id')
  confirmPharma(@Param() param: object): any {
    return this._pharmaService.confirmPharma(param);
  }
}
