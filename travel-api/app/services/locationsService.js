const { nanoid } = require('nanoid');
const { Location, RentalCompany } = require('../models');

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
  const location = await Location.findOne({
    where: {
      id,
    },
    attributes: { exclude: ['rental_company_id'] },
    include: {
      model: RentalCompany,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
  });

  if (!location) {
    return {
      error: ` Can't found location with id '${id}`,
      location: null,
    };
  }

  return {
    location,
    error: null,
  };
};

const getAllLocation = async () => {
  const locations = await Location.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });

  return locations;
};

const editLocationById = async ({ name, address }, id) => {
  const location = await Location.findByPk(id);

  if (!location) {
    return {
      error: true,
      message: `Can't found Location with id '${id}`,
    };
  }

  await location.update({
    name: name || location.name,
    address: address || location.address,
  }, {
    where: {
      id,
    },
  });

  return {
    error: false,
    message: `Successfully Update Location with id '${id}'`,
  };
};

const deleteLocationById = async (id) => {
  const location = await Location.findByPk(id);

  if (!location) {
    return { error: ` Can't delete. Location with id '${id}' not found.` };
  }

  await location.destroy();
  return { error: null };
};

module.exports = {
  addLocation,
  getAllLocation,
  getLocationById,
  editLocationById,
  deleteLocationById,
};