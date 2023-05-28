const { nanoid } = require('nanoid');
const { RentalTransaction } = require('../models');

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

  return transaction;
};

const getAllTransaction = async () => {
  const transactions = await RentalTransaction.findAll();

  return transactions;
};

const getTransactionById = async (id) => {
  const transaction = await RentalTransaction.findByPk(id);

  if (!transaction) {
    return {
      error: ` Can't found transaction with id '${id}`,
      transaction: null,
    };
  }

  return {
    error: null,
    transaction,
  };
};

const deleteTransactionById = async (id) => {
  const transaction = await RentalTransaction.findByPk(id);

  if (transaction) {
    return { error: ` Can't delete. Transaction with id '${id} not found` };
  }

  await transaction.destroy();
  return { error: null };
};

module.exports = {
  addTransaction,
  getAllTransaction,
  getTransactionById,
  deleteTransactionById,
};