import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Roles } from 'src/decoreator/roles/roles.decorator';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { JoiValidatePipe } from 'src/pipes/joi-validate/joi-validate.pipe';
import { addSchema, updateSchema } from './drug.joi';
import { DrugService } from './drug.service';

@Controller('drug')
export class DrugController {
  constructor(private readonly _drugService: DrugService) {}

  @Post()
  @UsePipes(new JoiValidatePipe(addSchema))
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  addDrug(@Body() body: object): any {
    return this._drugService.addDrug(body);
  }

  @Patch('/:pharma/:drug')
  @UsePipes(new JoiValidatePipe(updateSchema))
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  updateDrug(@Body() body: object, @Param() param: object): any {
    return this._drugService.updateDrug(body, param);
  }
}
