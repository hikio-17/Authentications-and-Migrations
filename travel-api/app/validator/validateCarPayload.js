/* eslint-disable import/no-extraneous-dependencies */
const Joi = require('joi');

const validatePostCarPayload = (payload) => {
  const PostCarPayloadSchema = Joi.object({
    rental_company_id: Joi.string().required(),
    name: Joi.string().required(),
    type: Joi.string().required(),
    year: Joi.date().required(),
    status: Joi.valid('AVAILABLE', 'RENTED', 'UNAVAILABLE'),
  });

  return PostCarPayloadSchema.validate(payload);
};

module.exports = {
  validatePostCarPayload,
};