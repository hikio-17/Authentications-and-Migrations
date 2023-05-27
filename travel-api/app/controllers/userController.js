/* eslint-disable import/no-extraneous-dependencies */
const asyncHandler = require('express-async-handler');
const { addUser, verifyUserCredential, verifyDuplicateEmail } = require('../services/userService');
const TokenManager = require('../tokenize/TokenManager');
const { clientErrorResponse, authenticationErrorResponse } = require('../utils/errorResponse');
const { validateUserSigninPayload } = require('../validator/validateUserSignin');
const { validateUserSignupPayload } = require('../validator/validateUserSignup');

const signup = asyncHandler(async (req, res, next) => {
  const { error } = validateUserSignupPayload(req.body);
  const emailExisting = await verifyDuplicateEmail(req.body.email);

  if (emailExisting) {
    return clientErrorResponse(res, `${emailExisting} already used.`);
  }
  if (error) {
    return clientErrorResponse(res, error.message);
  }

  const userId = await addUser(req.body);

  res.status(200).send({
    status: 'success',
    message: 'User registered successfully!',
    data: {
      userId,
    },
  });
});

const signin = asyncHandler(async (req, res, next) => {
  const { error } = validateUserSigninPayload(req.body);

  if (error) {
    return clientErrorResponse(res, error.message);
  }

  const { error: errMessage, userId } = await verifyUserCredential(req.body);
  if (errMessage) {
    return authenticationErrorResponse(res, errMessage);
  }
  const token = TokenManager.generateAccessToken(userId);

  res.status(200).send({
    status: 'success',
    message: 'Authentication successfully',
    data: {
      token,
    },
  });
});

module.exports = {
  signin,
  signup,
};
