/* eslint-disable import/no-extraneous-dependencies */
const asyncHandler = require('express-async-handler');
const { validateRentalPricePayload } = require('../validator/validateRentalPricePayload');
const { clientErrorResponse } = require('../utils/errorResponse');
const { addRentalPrice, deleteRentalPriceById } = require('../services/rentalPriceService');

const postRentalPriceHandler = asyncHandler(async (req, res, next) => {
  const { cardId: card_id } = req.params;
  const { rental_price } = req.body;
  const { error } = validateRentalPricePayload({ card_id, rental_price });

  if (error) {
    return clientErrorResponse(req, error);
  }

  const rentalPrice = await addRentalPrice({ card_id, rental_price });

  res.status(200).send({
    status: 'success',
    message: 'Rental price created',
    data: {
      rentalPrice,
    },
  });
});

const deleteRentalPriceByIdHandler = asyncHandler(async (req, res, next) => {
  const { rentalPriceId } = req.params;

  const { error } = await deleteRentalPriceById(rentalPriceId);

  if (error) {
    return clientErrorResponse(res, error);
  }

  res.status(200).send({
    status: 'success',
    message: `Successfully delete Rental price with id '${rentalPriceId}'`,
  });
});

module.exports = {
  postRentalPriceHandler,
  deleteRentalPriceByIdHandler,
};
