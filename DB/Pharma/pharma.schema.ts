import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../User/user.schema';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Pharma {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  createdBy: User;

  @Prop()
  city: [{ type: string }];

  @Prop()
  phone: string;

  @Prop({ min: 0, max: 5 })
  rating: number;

  @Prop({ default: false })
  confirmed: boolean;

  @Prop({ type: Object })
  image: { url: string; id: string };
}
const pharmaSchema = SchemaFactory.createForClass(Pharma);

pharmaSchema.virtual('drugs', {
  ref: 'Drug',
  localField: '_id',
  foreignField: 'pharma',
});

export const pharmaDBModel = MongooseModule.forFeature([
  { name: Pharma.name, schema: pharmaSchema },
]);
