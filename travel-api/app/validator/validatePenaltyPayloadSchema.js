const Joi = require('joi');

const validatePenaltyPayload = (payload) => {
  const PenaltyPayloadSchema = Joi.object({
    rental_price_id: Joi.string().required(),
    penalty_amount: Joi.number().required(),
  });

  return PenaltyPayloadSchema.validate(payload);
};

module.exports = {
  validatePenaltyPayload,
};