import * as joi from 'joi';

export const addSchema = {
  body: joi
    .object({
      name: joi.string().required(),
      city: joi.string(),
      address: joi.string(),
      phone: joi.string(),
    })
    .required(),
};

export const updateSchema = {
  body: joi
    .object({
      city: joi.array().items(joi.string()),
      phone: joi.string(),
    })
    .required(),
  param: joi
    .object({
      id: joi.string().required(),
    })
    .required(),
};
