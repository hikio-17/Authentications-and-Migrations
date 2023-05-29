/* eslint-disable import/no-extraneous-dependencies */
const asyncHandler = require('express-async-handler');
const {
  addCar, getCars, getCarById, deleteCarById, editCarById,
} = require('../services/carsService');
const { clientErrorResponse } = require('../utils/errorResponse');
const { validatePostCarPayload } = require('../validator/validateCarPayload');

const postCarHandler = asyncHandler(async (req, res, next) => {
  const { error } = validatePostCarPayload(req.body);

  if (error) {
    return clientErrorResponse(res, error.message);
  }

  const car = await addCar(req.body);

  res.status(200).send({
    status: 'success',
    message: 'Car created',
    data: {
      car,
    },
  });
});

const getCarsHandler = asyncHandler(async (req, res, next) => {
  const cars = await getCars();

  res.status(200).send({
    status: 'success',
    message: 'Retrieve all cars',
    data: {
      cars,
    },
  });
});

const getCarByIdHandler = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { error, car } = await getCarById(id);

  if (error) {
    return clientErrorResponse(res, error);
  }

  res.status(200).send({
    status: 'success',
    data: {
      car,
    },
  });
});

const editCarByIdHandler = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const { error, message } = await editCarById(req.body, id);

  if (error) clientErrorResponse(res, message);

  res.status(200).send({
    status: 'success',
    message,
  });
});

const deleteCarByIdHandler = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const { error } = await deleteCarById(id);

  if (error) {
    return clientErrorResponse(res, error);
  }

  res.status(200).send({
    status: 'success',
    message: `Successfully delete car with id '${id}'`,
  });
});

module.exports = {
  postCarHandler,
  getCarsHandler,
  getCarByIdHandler,
  editCarByIdHandler,
  deleteCarByIdHandler,
};