import * as joi from 'joi';
import { isValidObjectId } from '../../pipes/joi-validate/joi-validate.pipe';

export const addSchema = {
  body: joi
    .object({
      name: joi.string().required(),
      price: joi.number().min(1).required(),
      quantity: joi.number().min(1).required(),
      pharma: joi.string().custom(isValidObjectId).required(),
    })
    .required(),
};

export const updateSchema = {
  body: joi
    .object({
      name: joi.string(),
      price: joi.number().min(1),
      quantity: joi.number().min(1),
    })
    .required(),
  param: joi
    .object({
      drug: joi.string().custom(isValidObjectId).required(),
      pharma: joi.string().custom(isValidObjectId).required(),
    })
    .required(),
};
