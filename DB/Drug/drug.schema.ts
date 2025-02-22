import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Pharma } from '../Pharma/pharma.schema';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Drug {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, min: 1 })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ type: Object })
  image: { url: string; id: string };

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Pharma', required: true })
  pharma: Pharma;
}

const drugSchema = SchemaFactory.createForClass(Drug);
export const drugDBModel = MongooseModule.forFeature([
  { name: Drug.name, schema: drugSchema },
]);
