/* eslint-disable import/no-extraneous-dependencies */
const Joi = require('joi');

const validateUserSigninPayload = (payload) => {
  const UserSigninPayloadSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  return UserSigninPayloadSchema.validate(payload);
};

module.exports = {
  validateUserSigninPayload,
};