const { nanoid } = require('nanoid');
const { RentalCompany, Car } = require('../models');

const addRentalCompany = async ({ name, address, telephone }) => {
  const id = `rental_company-${nanoid(10)}`;

  const rentalCompany = await RentalCompany.create({
    id,
    name,
    address,
    telephone,
  });

  return rentalCompany;
};

const getRentalCompanyById = async (id) => {
  const rentalCompany = await RentalCompany.findOne({
    where: {
      id,
    },
    include: {
      model: Car,
      attributes: ['id', 'name', 'type', 'year'],
    },
  });

  if (!rentalCompany) {
    return {
      error: `Rental company not found with id '${id}'`,
      rentalCompany: null,
    };
  }

  return {
    error: null,
    rentalCompany,
  };
};

const getAllRentalComapanies = async () => {
  const rentalCompanies = await RentalCompany.findAll({
    attributes: ['id', 'name', 'address'],
  });

  return rentalCompanies;
};

const editRentalCompanyById = async ({
  name = '',
  address = '',
  telephone = '',
}, id) => {
  const rentalCompany = await RentalCompany.findByPk(id);

  if (!rentalCompany) {
    return {
      error: true,
      message: `Cant found rental company with id '${id}`,
    };
  }

  await RentalCompany.update({
    name: name || rentalCompany.name,
    address: address || rentalCompany.address,
    telephone: telephone || rentalCompany.telephone,
  }, {
    where: {
      id,
    },
  });

  return {
    error: true,
    message: `Successfully edit Rental Company with id '${id}`,
  };
};

const deleteRentalCompanyById = async (id) => {
  const rentalCompany = await RentalCompany.findByPk(id);

  if (!rentalCompany) {
    return { error: `can't delete. Rental company with id '${id}' not found` };
  }

  await rentalCompany.destroy();
  return { error: null };
};

module.exports = {
  addRentalCompany,
  getAllRentalComapanies,
  getRentalCompanyById,
  editRentalCompanyById,
  deleteRentalCompanyById,
};