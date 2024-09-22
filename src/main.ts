import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { json } from 'body-parser';
import { Request, Response } from 'express';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    '/webhook',
    json({
      verify: (req: Request, res: Response, buf: Buffer) => {
        req['rawBody'] = buf;
      },
    }),
  );
  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
