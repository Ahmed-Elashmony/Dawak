import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Drug {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, min: 1 })
  price: number;

  @Prop({ required: true })
  quantity: number;

  //@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  @Prop({ required: true })
  category: string; // Category
}

const drugSchema = SchemaFactory.createForClass(Drug);
export const drugDBModel = MongooseModule.forFeature([
  { name: Drug.name, schema: drugSchema },
]);
