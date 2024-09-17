import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { Roles } from '../../decoreator/roles/roles.decorator';
import { AuthGuard } from '../../guard/auth/auth.guard';
import { JoiValidatePipe } from '../../pipes/joi-validate/joi-validate.pipe';
import { addSchema, updateSchema } from './drug.joi';
import { DrugService } from './drug.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('drug')
export class DrugController {
  constructor(private readonly _drugService: DrugService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('image'))
  @UsePipes(new JoiValidatePipe(addSchema))
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  addDrug(
    @Body() body: object,
    @UploadedFiles() image: Express.Multer.File,
  ): any {
    return this._drugService.addDrug(body, image[0].buffer);
  }

  @Patch('/:pharma/:drug')
  @UseInterceptors(FilesInterceptor('image'))
  @UsePipes(new JoiValidatePipe(updateSchema))
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  updateDrug(
    @Body() body: object,
    @Param() param: object,
    @UploadedFiles() image: Express.Multer.File,
  ): any {
    return this._drugService.updateDrug(body, param, image);
  }

  @Get('/search')
  searchDrug(@Query() query: object): any {
    return this._drugService.serachDrug(query);
  }

  @Get('/:id')
  getDrug(@Param() param: object): any {
    return this._drugService.getDrug(param);
  }
}
