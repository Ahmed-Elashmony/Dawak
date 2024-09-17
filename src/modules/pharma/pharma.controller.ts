import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { PharmaService } from './pharma.service';
import { AuthGuard } from '../../guard/auth/auth.guard';
import { JoiValidatePipe } from '../../pipes/joi-validate/joi-validate.pipe';
import { addSchema, updateSchema } from './pharma.joi';
import { Roles } from '../../decoreator/roles/roles.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';

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
  pendingPharma(@Query() query: any): any {
    return this._pharmaService.pendingPharma(query);
  }

  @Get('/all')
  getAllPharma(@Query() query: any): any {
    return this._pharmaService.getAllPharma(query);
  }

  @Get('/search')
  async searchParma(@Query() query: any): Promise<any> {
    return this._pharmaService.searchParma(query);
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
  @UseInterceptors(FilesInterceptor('image'))
  @UsePipes(new JoiValidatePipe(updateSchema))
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  updatePharma(
    @Body() body: object,
    @Param() param: object,
    @UploadedFiles() image: Express.Multer.File,
  ): any {
    return this._pharmaService.updatePharma(body, param, image[0].buffer);
  }

  @Get('/filter/:city')
  async pharmaByCity(@Param() param: any, @Query() query: any): Promise<any> {
    return this._pharmaService.pharmaByCity(param, query);
  }
}
