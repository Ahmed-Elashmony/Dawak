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
  //   query: joi.object({ x: joi.string() }).required(),
};
