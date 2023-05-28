const Joi = require('joi');

const validateRentalTransactionPayload = (payload) => {
  const RentalTransactionSchema = Joi.object({
    car_id: Joi.string().required(),
    user_id: Joi.string().required(),
    rental_date: Joi.date().required(),
    return_date: Joi.date().required(),
    destination_address: Joi.string().required(),
  });

  return RentalTransactionSchema.validate(payload);
};

module.exports = {
  validateRentalTransactionPayload,
};