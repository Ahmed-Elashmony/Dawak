import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DrugModule } from './drug/drug.module';
import { PharmaModule } from './pharma/pharma.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_Link),
    UserModule,
    DrugModule,
    PharmaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
