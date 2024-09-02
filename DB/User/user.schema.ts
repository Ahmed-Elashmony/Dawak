import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ min: 3, max: 100 })
  age: number;

  @Prop({ enum: ['male', 'female'] })
  gender: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  @Prop({ default: false })
  confirm: boolean;

  @Prop()
  activationCode: string;

  @Prop({ length: 6 })
  forgetCode: string;
}

const userSchema = SchemaFactory.createForClass(User);
export const userDBModel = MongooseModule.forFeature([
  { name: User.name, schema: userSchema },
]);
