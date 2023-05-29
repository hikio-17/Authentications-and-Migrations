const { nanoid } = require('nanoid');
const { RentalTransaction, Car, RentalPrice } = require('../models');
const { getUserById } = require('./userService');
const calculateTotalDays = require('../utils/calculateTotalDays');

const addTransaction = async ({
  car_id, user_id, rental_date, return_date, destination_address,
}) => {
  const id = `transaction-${nanoid(10)}`;

  const transaction = await RentalTransaction.create({
    id,
    car_id,
    user_id,
    rental_date,
    return_date,
    destination_address,
  });

  // update status car to RENTED
  await Car.update({
    status: 'RENTED',
  }, {
    where: {
      id: car_id,
    },
  });

  return transaction;
};

const getAllTransaction = async () => {
  const transactions = await RentalTransaction.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });

  return transactions;
};

const getTransactionById = async (id) => {
  // Transaction
  const {
    id: transactionId, car_id, rental_date, return_date, destination_address, user_id,
  } = await RentalTransaction.findByPk(id);
  const { rental_price } = await RentalPrice.findOne({
    where: {
      car_id,
    },
  });

  // Car
  const {
    id: carId, name, type, year,
  } = await Car.findByPk(car_id);

  const totalDay = calculateTotalDays(rental_date, return_date);

  const price = rental_price * totalDay;

  if (!transactionId) {
    return {
      error: ` Can't found transaction with id '${id}`,
      transaction: null,
    };
  }

  return {
    error: null,
    transaction: {
      id: transactionId,
      user_id,
      car: {
        id: carId,
        name,
        type,
        year,
      },
      rental_date,
      return_date,
      destination_address,
      price: `${rental_price} * ${totalDay} = Rp.${price}`,
    },
  };
};

const deleteTransactionById = async (id) => {
  const transaction = await RentalTransaction.findByPk(id);

  if (!transaction) {
    return { error: ` Can't delete. Transaction with id '${id}' not found` };
  }

  await transaction.destroy();
  return { error: null };
};

const verifyUserAccessTransaction = async (userAccess, transactionId) => {
  const user = await getUserById(userAccess);
  const transaction = await getTransactionById(transactionId);

  if (user.id === transaction.user_id || user.role === 'ADMIN') {
    return true;
  }

  return false;
};

module.exports = {
  addTransaction,
  getAllTransaction,
  getTransactionById,
  deleteTransactionById,
  verifyUserAccessTransaction,
};