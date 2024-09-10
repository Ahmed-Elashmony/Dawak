import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class JoiValidatePipe implements PipeTransform {
  constructor(private readonly schema: object) {}
  transform(value: any, metadata: ArgumentMetadata) {
    // if (this.schema[metadata.type]) {
    // } or by includes try to fix it
    if (this.schema[metadata.type]) {
      const validationResult = this.schema[metadata.type].validate(value, {
        abortEarly: false,
      });
      if (validationResult.error) {
        throw new BadRequestException(validationResult.error.details);
      }
      return value;
    }
    // i think this what make query or param return when not in schema
    // try to pass error in it
    return value;
  }
}

export const isValidObjectId = (value, helper) => {
  return Types.ObjectId.isValid(value)
    ? true
    : helper.message('invalid objectId');
};
