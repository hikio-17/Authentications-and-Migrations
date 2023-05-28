const { nanoid } = require('nanoid');
const { RentalTransaction, Car, RentalPrice } = require('../models');
const { getUserById } = require('./userService');

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
  const transactions = await RentalTransaction.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });

  return transactions;
};

const getTransactionById = async (id) => {
  const transaction = await RentalTransaction.findAll({
    where: {
      id,
    },
    include: [
      {
        model: Car,
        attributes: ['id', 'name', 'year', 'rental_company_id', 'type'],
        include: [
          { model: RentalPrice, nested: true }],
      },
    ],
  });

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