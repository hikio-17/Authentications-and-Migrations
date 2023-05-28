const asyncHandler = require('express-async-handler');
const { validateRentalTransactionPayload } = require('../validator/validateRentalTransaction');
const { clientErrorResponse, authorizationErrorResponse } = require('../utils/errorResponse');
const {
  addTransaction,
  getAllTransaction,
  getTransactionById,
  deleteTransactionById,
  verifyUserAccessTransaction,
} = require('../services/rentalTransactionService');

const postTransactionHandler = asyncHandler(async (req, res, next) => {
  const user_id = req.userId;
  const { error } = validateRentalTransactionPayload({ ...req.body, user_id });

  if (error) {
    return clientErrorResponse(res, error.message);
  }

  const transaction = await addTransaction({ ...req.body, user_id });

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
  const userAccess = req.userId;

  const verifyAccess = await verifyUserAccessTransaction(userAccess, id);

  if (!verifyAccess) authorizationErrorResponse(res, 'You are not authorized to access this resource.');
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

  if (error) clientErrorResponse(res, error);

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