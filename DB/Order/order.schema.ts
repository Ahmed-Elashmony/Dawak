import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Drug } from 'DB/Drug/drug.schema';
import { User } from 'DB/User/user.schema';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Order {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User;

  @Prop([
    {
      _id: false,
      drugId: { type: mongoose.Schema.Types.ObjectId, ref: 'Drug' },
      price: Number,
      quantity: Number,
    },
  ])
  drug: [
    {
      drugId: Drug;
      price: number;
      quantity: number;
    },
  ];

  @Prop()
  price: number;

  @Prop({ enum: ['visa', 'cash'], default: 'cash' })
  payment: string;

  @Prop({ enum: ['Paid', 'Unpaid', 'Refunded'], default: 'Unpaid' })
  status: string;
}

const orderSchema = SchemaFactory.createForClass(Order);
export const orderDBModel = MongooseModule.forFeature([
  { name: Order.name, schema: orderSchema },
]);
