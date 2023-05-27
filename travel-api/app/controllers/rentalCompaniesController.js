/* eslint-disable import/no-extraneous-dependencies */
const asyncHandler = require('express-async-handler');
const { validateRentalCompanyPayload } = require('../validator/validateRentalCompanyPayload');
const { clientErrorResponse } = require('../utils/errorResponse');
const {
  addRentalCompany, getAllRentalComapanies, getRentalCompanyById, deleteRentalCompanyById,
} = require('../services/rentalCompanyService');

const postRentalCompanyHandler = asyncHandler(async (req, res, next) => {
  const { error } = validateRentalCompanyPayload(req.body);

  if (error) {
    return clientErrorResponse(res, error.message);
  }

  const rentalCompany = await addRentalCompany(req.body);

  res.status(200).send({
    status: 'success',
    message: 'Rental company created.',
    data: {
      rentalCompany,
    },
  });
});

const getAllRentalComapaniesHandler = asyncHandler(async (req, res, next) => {
  const rentalCompanies = await getAllRentalComapanies();

  res.status(200).send({
    status: 'success',
    message: 'Retrieve all Rental company',
    data: {
      rentalCompanies,
    },
  });
});

const getRentalCompanyByIdHandler = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { error, rentalCompany } = await getRentalCompanyById(id);

  if (error) {
    return clientErrorResponse(res, error);
  }

  res.status(200).send({
    status: 'success',
    data: {
      rentalCompany,
    },
  });
});

const deleteRentalCompanyByIdHandler = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const { error } = await deleteRentalCompanyById(id);

  if (error) {
    return clientErrorResponse(res, error);
  }

  res.status(200).send({
    status: 'success',
    message: `Delete Rental company with id '${id}' successfully`,
  });
});

module.exports = {
  postRentalCompanyHandler,
  getAllRentalComapaniesHandler,
  getRentalCompanyByIdHandler,
  deleteRentalCompanyByIdHandler,
};