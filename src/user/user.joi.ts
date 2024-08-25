import * as joi from 'joi';

export const signUpSchema = {
  body: joi
    .object({
      userName: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
      cPassword: joi.string().valid(joi.ref('password')).required(),
    })
    .required(),
  //   query: joi.object({ x: joi.string() }).required(),
};

export const signInSchema = {
  body: joi
    .object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    })
    .required(),
};

export const updateSchema = {
  body: joi
    .object({
      address: joi.string().required(),
      gender: joi.string().valid('male', 'female').required(),
      phone: joi.string().required(),
    })
    .required(),
};
