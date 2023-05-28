const asyncHandler = require('express-async-handler');
const { validateLocationPayload } = require('../validator/validateLocationPayload');
const { clientErrorResponse } = require('../utils/errorResponse');
const { addLocation, deleteLocationById } = require('../services/locationsService');

const postLocationHandler = asyncHandler(async (req, res, next) => {
  const { error } = validateLocationPayload(req.body);

  if (error) {
    return clientErrorResponse(res, error);
  }

  const location = await addLocation(req.body);

  res.status(200).send({
    status: 'success',
    message: 'Location created',
    data: {
      location,
    },
  });
});

const deleteLocationByIdHandler = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const { error } = await deleteLocationById(id);

  if (error) {
    return clientErrorResponse(res, error);
  }

  res.status(200).send({
    status: 'success',
    message: `Successfully delete Location with id '${id}'`,
  });
});

module.exports = {
  postLocationHandler,
  deleteLocationByIdHandler,
};