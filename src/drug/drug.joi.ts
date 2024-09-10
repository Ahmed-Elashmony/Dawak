import * as joi from 'joi';
import { isValidObjectId } from 'src/pipes/joi-validate/joi-validate.pipe';

export const addSchema = {
  body: joi
    .object({
      name: joi.string().required(),
      price: joi.number().min(1).required(),
      quantity: joi.number().min(1).required(),
      category: joi.string().required(),
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
      category: joi.string(),
    })
    .required(),
  param: joi
    .object({
      drug: joi.string().min(4).required(),
      pharma: joi.string().custom(isValidObjectId).required(),
    })
    .required(),
};
