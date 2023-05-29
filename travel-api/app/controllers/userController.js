const asyncHandler = require('express-async-handler');
const {
  getAllUsers, getUserById, deleteUserById, verifyUserAccess, editUserById,
} = require('../services/userService');
const { clientErrorResponse, authorizationErrorResponse } = require('../utils/errorResponse');

const getAllUsersHandler = asyncHandler(async (req, res, next) => {
  const users = await getAllUsers();

  res.status(200).send({
    status: 'success',
    message: 'Retrive all users',
    data: {
      users,
    },
  });
});

const getUserByIdHandler = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const userAccess = req.userId;

  const verifyAccess = await verifyUserAccess(userAccess, id);

  if (!verifyAccess) authorizationErrorResponse('You are not authorized to access this resource');

  const { error, user } = await getUserById(id);

  if (error) clientErrorResponse(res, error);

  res.status(200).send({
    status: 'success',
    data: {
      user,
    },
  });
});

const editUserByIdHandler = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const userAccess = req.userId;

  const verifyAccess = await verifyUserAccess(userAccess, id);

  if (!verifyAccess) authorizationErrorResponse(res, 'You are not authorized to access this resource');

  const { error, message } = await editUserById(req.body, id);

  if (error) clientErrorResponse(res, message);

  res.status(200).send({
    status: 'success',
    message,
  });
});

const deleteUserByIdHandler = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const { error } = await deleteUserById(id);

  if (error) clientErrorResponse(req, error);

  res.status(200).send({
    status: 'success',
    message: `Delete User with id '${id}' successfully`,
  });
});

module.exports = {
  getAllUsersHandler,
  getUserByIdHandler,
  editUserByIdHandler,
  deleteUserByIdHandler,
};