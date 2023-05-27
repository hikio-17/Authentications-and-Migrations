/* eslint-disable import/no-unresolved */
const { nanoid } = require('nanoid');
const { RentalPrice } = require('../models');

const addRentalPrice = async (card_id, rental_price) => {
  const id = `rental_price-${nanoid(10)}`;

  const rentalPrice = await RentalPrice.create({
    id,
    card_id,
    rental_price,
  });

  return rentalPrice;
};

const deleteRentalPriceById = async (id) => {
  const rentalPrice = await RentalPrice.findByPk(id);

  if (!rentalPrice) {
    return { error: `can't delete. Rental price with id '${id}' not found` };
  }

  await rentalPrice.destroy();
  return { error: null };
};

module.exports = {
  addRentalPrice,
  deleteRentalPriceById,
};