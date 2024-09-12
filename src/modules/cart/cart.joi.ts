import * as joi from 'joi';
import { isValidObjectId } from '../../pipes/joi-validate/joi-validate.pipe';

export const addSchema = {
  body: joi
    .object({
      drugId: joi.string().custom(isValidObjectId).required(),
      quantity: joi.number().min(1).required(),
    })
    .required(),
};
