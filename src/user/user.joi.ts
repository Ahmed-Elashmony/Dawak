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
      address: joi.string(),
      gender: joi.string().valid('male', 'female'),
      phone: joi.string(),
    })
    .required(),
};

export const forgetSchema = {
  body: joi
    .object({
      email: joi.string().email().required(),
    })
    .required(),
};

export const resetSchema = {
  body: joi
    .object({
      password: joi.string().required(),
      cPassword: joi.string().valid(joi.ref('password')).required(),
      code: joi.string().length(6).required(),
    })
    .required(),
};
