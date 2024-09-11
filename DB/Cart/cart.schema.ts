import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Drug } from 'DB/Drug/drug.schema';
import { User } from 'DB/User/user.schema';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Cart {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
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
}

const cartSchema = SchemaFactory.createForClass(Cart);

cartSchema.virtual('totalPrice').get(function () {
  return this.drug.reduce((acc, curr) => {
    return acc + curr.quantity * curr.drugId.price;
  }, 0);
});

export const cartDBModel = MongooseModule.forFeature([
  { name: Cart.name, schema: cartSchema },
]);
