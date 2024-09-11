import { Module } from '@nestjs/common';
import { DrugController } from './drug.controller';
import { DrugService } from './drug.service';
import { drugDBModel } from 'DB/Drug/drug.schema';
import { DrugdbService } from 'DB/Drug/drugdb/drugdb.service';
import { JwtService } from '@nestjs/jwt';
import { UserdbService } from 'DB/User/userdb/userdb.service';
import { userDBModel } from 'DB/User/user.schema';
import { PharmadbService } from 'DB/Pharma/pharmadb/pharmadb.service';
import { pharmaDBModel } from 'DB/Pharma/pharma.schema';

@Module({
  imports: [drugDBModel, userDBModel, pharmaDBModel],
  controllers: [DrugController],
  providers: [
    DrugService,
    DrugdbService,
    UserdbService,
    JwtService,
    PharmadbService,
  ],
  exports: [DrugdbService],
})
export class DrugModule {}
