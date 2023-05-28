const asyncHandler = require('express-async-handler');
const { validateLocationPayload } = require('../validator/validateLocationPayload');
const { clientErrorResponse } = require('../utils/errorResponse');
const {
  addLocation, deleteLocationById, getAllLocation, getLocationById,
} = require('../services/locationsService');

const postLocationHandler = asyncHandler(async (req, res, next) => {
  const { error } = validateLocationPayload(req.body);

  if (error) clientErrorResponse(res, error.message);

  const location = await addLocation(req.body);

  res.status(200).send({
    status: 'success',
    message: 'Location created',
    data: {
      location,
    },
  });
});

const getAllLocationsHandler = asyncHandler(async (req, res, next) => {
  const locations = await getAllLocation();

  res.status(200).send({
    status: 'success',
    message: 'Retrieve all locations',
    data: {
      locations,
    },
  });
});

const getLocationByIdHandler = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { error, location } = await getLocationById(id);

  if (error) clientErrorResponse(res, error);

  res.status(200).send({
    status: 'success',
    data: {
      location,
    },
  });
});

const deleteLocationByIdHandler = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { error } = await deleteLocationById(id);
  console.log('================ lagi delete');

  if (error) return clientErrorResponse(res, error);

  res.status(200).send({
    status: 'success',
    message: `Successfully delete Location with id '${id}'`,
  });
});

module.exports = {
  postLocationHandler,
  getAllLocationsHandler,
  getLocationByIdHandler,
  deleteLocationByIdHandler,
};