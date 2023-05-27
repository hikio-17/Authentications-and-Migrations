const { nanoid } = require('nanoid');
const { RentalCompany } = require('../models');

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
  const rentalCompany = await RentalCompany.findByPk(id);

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
  const rentalCompanies = await RentalCompany.findAll();

  return rentalCompanies;
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
  deleteRentalCompanyById,
};