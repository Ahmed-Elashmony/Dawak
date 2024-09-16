import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'DB/User/user.schema';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Token {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  expireAt: Date;

  @Prop({ default: true })
  vaild: boolean;
}

const tokenSchema = SchemaFactory.createForClass(Token);
export const tokenDBModel = MongooseModule.forFeature([
  { name: Token.name, schema: tokenSchema },
]);
