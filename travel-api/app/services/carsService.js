const { nanoid } = require('nanoid');
const { Car } = require('../models');

const addCar = async ({
  rental_company_id, name, type, year, status = 'AVAILABLE',
}) => {
  const id = `car-${nanoid()}`;

  const car = await Car.create({
    id,
    rental_company_id,
    name,
    type,
    year,
    status,
  });

  return car;
};

const getCars = async () => {
  const cars = await Car.findAll({
    attributes: ['id', 'name', 'rental_company_id'],
  });
  return cars;
};

const getCarById = async (id) => {
  const car = await Car.findByPk(id);

  if (!car) {
    return {
      error: `Car not found with id '${id}'`,
      car: null,
    };
  }

  return {
    error: null,
    car,
  };
};

const deleteCarById = async (id) => {
  const car = await Car.findByPk(id);

  if (!car) {
    return {
      error: `can't delete. car with id '${id}' not found`,
    };
  }

  await car.destroy();
  return {
    error: null,
  };
};

module.exports = {
  addCar,
  getCarById,
  getCars,
  deleteCarById,
};
