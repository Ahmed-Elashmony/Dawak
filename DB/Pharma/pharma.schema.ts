import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'DB/User/user.schema';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Pharma {
  @Prop({ required: true, lowercase: true, unique: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  createdBy: User;

  @Prop()
  city: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  @Prop({ min: 0, max: 5 })
  rating: number;

  @Prop({ default: false })
  confirmed: boolean;
}

const pharmaSchema = SchemaFactory.createForClass(Pharma);
export const pharmaDBModel = MongooseModule.forFeature([
  { name: Pharma.name, schema: pharmaSchema },
]);
