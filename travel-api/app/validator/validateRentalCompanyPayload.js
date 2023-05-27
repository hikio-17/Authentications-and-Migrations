const Joi = require('joi');

const validateRentalCompanyPayload = (payload) => {
  const RentalCompanyPayloadSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    telephone: Joi.string().required(),
  });

  return RentalCompanyPayloadSchema.validate(payload);
};

module.exports = {
  validateRentalCompanyPayload,
};