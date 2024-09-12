import { Module } from '@nestjs/common';
import { PharmaService } from './pharma.service';
import { pharmaDBModel } from '../../../DB/Pharma/pharma.schema';
import { userDBModel } from '../../../DB/User/user.schema';
import { PharmadbService } from '../../../DB/Pharma/pharmadb/pharmadb.service';
import { PharmaController } from './pharma.controller';
import { JwtService } from '@nestjs/jwt';
import { UserdbService } from 'DB/User/userdb/userdb.service';

@Module({
  imports: [pharmaDBModel, userDBModel],
  controllers: [PharmaController],
  providers: [PharmaService, PharmadbService, JwtService, UserdbService],
})
export class PharmaModule {}
