import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { DrugService } from './drug.service';
import { JoiValidatePipe } from 'src/pipes/joi-validate/joi-validate.pipe';
import { addSchema } from './drug.joi';

@Controller('drug')
export class DrugController {
  constructor(private readonly _drugService: DrugService) {}

  @Post()
  @UsePipes(new JoiValidatePipe(addSchema))
  addDrug(@Body() body: object): any {
    return this._drugService.addDrug(body);
  }
}
