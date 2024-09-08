import { Module } from '@nestjs/common';
import { DrugController } from './drug.controller';
import { DrugService } from './drug.service';
import { drugDBModel } from 'DB/Drug/drug.schema';
import { DrugdbService } from 'DB/Drug/drugdb/drugdb.service';

@Module({
  imports: [drugDBModel],
  controllers: [DrugController],
  providers: [DrugService, DrugdbService],
  exports: [DrugdbService],
})
export class DrugModule {}
