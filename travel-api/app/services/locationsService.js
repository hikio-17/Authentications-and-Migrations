const { nanoid } = require('nanoid');
const { Location } = require('../models');

const addLocation = async ({ name, address, rental_company_id }) => {
  const id = `location-${nanoid()}`;

  const location = await Location.create({
    id,
    name,
    address,
    rental_company_id,
  });

  return location;
};

const getLocationById = async (id) => {
  const location = await Location.findByPk(id);

  if (!location) {
    return { error: ` Can't found location with id '${id}` };
  }

  return location;
};

const getAllLocation = async () => {
  const locations = await Location.findAll();

  return locations;
};

const deleteLocationById = async (id) => {
  const location = await Location.findByPk(id);

  if (!location) {
    return { error: ` Can't delete. Location with id '${id} not found.` };
  }

  await location.destroy();
  return { error: null };
};

module.exports = {
  addLocation,
  getAllLocation,
  getLocationById,
  deleteLocationById,
};