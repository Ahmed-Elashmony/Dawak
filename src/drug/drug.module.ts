import { Module } from '@nestjs/common';
import { DrugController } from './drug.controller';
import { DrugService } from './drug.service';
import { drugDBModel } from 'DB/Drug/drug.schema';
import { DrugdbService } from 'DB/Drug/drugdb/drugdb.service';
import { JwtService } from '@nestjs/jwt';
import { UserdbService } from 'DB/User/userdb/userdb.service';
import { userDBModel } from 'DB/User/user.schema';

@Module({
  imports: [drugDBModel, userDBModel],
  controllers: [DrugController],
  providers: [DrugService, DrugdbService, UserdbService, JwtService],
  exports: [DrugdbService],
})
export class DrugModule {}
