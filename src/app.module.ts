import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { DrugModule } from './modules/drug/drug.module';
import { PharmaModule } from './modules/pharma/pharma.module';
import { CartModule } from './modules/cart/cart.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_Link),
    UserModule,
    DrugModule,
    PharmaModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
