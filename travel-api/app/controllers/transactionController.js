const asyncHandler = require('express-async-handler');
const { validateRentalTransactionPayload } = require('../validator/validateRentalTransaction');
const { clientErrorResponse } = require('../utils/errorResponse');
const {
  addTransaction, getAllTransaction, getTransactionById, deleteTransactionById,
} = require('../services/rentalTransactionService');

const postTransactionHandler = asyncHandler(async (req, res, next) => {
  const { error } = validateRentalTransactionPayload(req.body);

  if (error) {
    return clientErrorResponse(res, error);
  }

  const transaction = await addTransaction(req.body);

  res.status(200).send({
    status: 'success',
    message: 'Transaction created',
    data: {
      transaction,
    },
  });
});

const getAllTransactionHandler = asyncHandler(async (req, res, next) => {
  const transactions = await getAllTransaction();

  res.status(200).send({
    status: 'success',
    message: 'Retrieve all transactions',
    data: {
      transactions,
    },
  });
});

const getTransactionByIdHandler = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { error, transaction } = await getTransactionById(id);

  if (error) {
    return clientErrorResponse(res, error);
  }

  res.status(200).send({
    status: 'success',
    data: {
      transaction,
    },
  });
});

const deleteTransactionByIdHandler = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const { error } = await deleteTransactionById(id);

  if (error) {
    return clientErrorResponse(res, error);
  }

  res.status(200).send({
    status: 'success',
    message: `Delete Transaction with id '${id}' successfully`,
  });
});

module.exports = {
  postTransactionHandler,
  getAllTransactionHandler,
  getTransactionByIdHandler,
  deleteTransactionByIdHandler,
};