import { Module } from '@nestjs/common';
import { PharmaService } from './pharma.service';
import { pharmaDBModel } from '../../../DB/Pharma/pharma.schema';
import { userDBModel } from '../../../DB/User/user.schema';
import { PharmadbService } from '../../../DB/Pharma/pharmadb/pharmadb.service';
import { PharmaController } from './pharma.controller';
import { JwtService } from '@nestjs/jwt';
import { UserdbService } from '../../../DB/User/userdb/userdb.service';
import { tokenDBModel } from '../../../DB/token/token.schema';
import { TokendbService } from '../../../DB/token/tokendb/tokendb.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    pharmaDBModel,
    userDBModel,
    tokenDBModel,
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [PharmaController],
  providers: [
    PharmaService,
    PharmadbService,
    JwtService,
    UserdbService,
    TokendbService,
  ],
})
export class PharmaModule {}
