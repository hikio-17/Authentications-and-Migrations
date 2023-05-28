const errorHandler = (error, req, res, next) => res.status(500).send({
  status: 'error',
  message: error.message || 'Internal server error',
});

/* eslint-disable default-param-last */
const clientErrorResponse = (res, message) => res.status(400).send({
  status: 'fail',
  message,
});

const authenticationErrorResponse = (res, message) => res.status(401).send({
  status: 'fail',
  message,
});

const authorizationErrorResponse = (res, message) => res.status(403).send({
  status: 'fail',
  message,
});

module.exports = {
  errorHandler,
  clientErrorResponse,
  authenticationErrorResponse,
  authorizationErrorResponse,
};