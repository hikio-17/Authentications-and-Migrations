const asyncHandler = require('express-async-handler');
const { validatePenaltyPayload } = require('../validator/validatePenaltyPayloadSchema');
const { clientErrorResponse } = require('../utils/errorResponse');
const { addPenalty, deletePenalyById } = require('../services/penaltyService');

const postPenaltyHandler = asyncHandler(async (req, res, next) => {
  const { error } = validatePenaltyPayload(req.body);

  if (error) {
    return clientErrorResponse(res, error);
  }

  const penalty = await addPenalty(req.body);

  res.status(200).send({
    status: 'success',
    message: 'Penalty created',
    data: {
      penalty,
    },
  });
});

const deletePenaltyByIdHandler = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const { error } = await deletePenalyById(id);

  if (error) {
    return clientErrorResponse(res, error);
  }

  res.status(200).send({
    status: 'success',
    message: `Delete penalty with id '${id} successfully`,
  });
});

module.exports = {
  postPenaltyHandler,
  deletePenaltyByIdHandler,
};