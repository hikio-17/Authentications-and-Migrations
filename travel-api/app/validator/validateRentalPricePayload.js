const Joi = require('joi');

const validateRentalPricePayload = (payload) => {
  const RentalPricePayloadSchema = Joi.object({
    car_id: Joi.string().required(),
    rental_price: Joi.number().required(),
  });

  return RentalPricePayloadSchema.validate(payload);
};

module.exports = {
  validateRentalPricePayload,
};