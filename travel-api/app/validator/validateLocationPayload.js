const Joi = require('joi');

const validateLocationPayload = (payload) => {
  const LocationPayloadSchema = Joi.object({
    rental_company_id: Joi.string().required(),
    name: Joi.string().required(),
    address: Joi.string().required(),
  });

  return LocationPayloadSchema.validate(payload);
};

module.exports = {
  validateLocationPayload,
};