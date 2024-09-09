import * as joi from 'joi';

export const addSchema = {
  body: joi
    .object({
      name: joi.string().required(),
      price: joi.number().min(1).required(),
      quantity: joi.number().min(1).required(),
      category: joi.string().required(),
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
      name: joi.string().min(4).required(),
    })
    .required(),
};
