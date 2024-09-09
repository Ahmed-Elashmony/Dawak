import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Pharma {
  @Prop({ required: true, lowercase: true, unique: true })
  name: string;

  @Prop()
  city: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  @Prop({ min: 0, max: 5 })
  rating: number;
}

const pharmaSchema = SchemaFactory.createForClass(Pharma);
export const pharmaDBModel = MongooseModule.forFeature([
  { name: Pharma.name, schema: pharmaSchema },
]);
