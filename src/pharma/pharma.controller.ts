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
  pendingPharma(): any {
    return this._pharmaService.pendingPharma();
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
