/* eslint-disable import/no-extraneous-dependencies */
const asyncHandler = require('express-async-handler');
const { validateRentalPricePayload } = require('../validator/validateRentalPricePayload');
const { clientErrorResponse } = require('../utils/errorResponse');
const { addRentalPrice, deleteRentalPriceById } = require('../services/rentalPriceService');

const postRentalPriceHandler = asyncHandler(async (req, res, next) => {
  const { carId: car_id } = req.params;
  const { rental_price } = req.body;
  const { error } = validateRentalPricePayload({ car_id, rental_price });

  if (error) clientErrorResponse(res, error.message);

  const rentalPrice = await addRentalPrice({ car_id, rental_price });

  res.status(200).send({
    status: 'success',
    message: 'Rental price created',
    data: {
      rentalPrice,
    },
  });
});

const deleteRentalPriceByIdHandler = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const { error } = await deleteRentalPriceById(id);

  if (error) clientErrorResponse(res, error);

  res.status(200).send({
    status: 'success',
    message: `Successfully delete Rental price with id '${id}'`,
  });
});

module.exports = {
  postRentalPriceHandler,
  deleteRentalPriceByIdHandler,
};
