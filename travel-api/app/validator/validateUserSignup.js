/* eslint-disable import/no-extraneous-dependencies */
const Joi = require('joi');

const validateUserSignupPayload = (payload) => {
  const UserSignupPayloadSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    telephone: Joi.string().required(),
    address: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('ADMIN', 'USER'),
  });
  return UserSignupPayloadSchema.validate(payload);
};

module.exports = {
  validateUserSignupPayload,
};