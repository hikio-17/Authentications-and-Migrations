const { nanoid } = require('nanoid');
const { Penalty } = require('../models');

const addPenalty = async ({ rental_price_id, penalty_amount }) => {
  const id = `penalty-${nanoid(10)}`;

  const penalty = await Penalty.create({
    id,
    rental_price_id,
    penalty_amount,
  });

  return penalty;
};

const deletePenalyById = async (id) => {
  const penalty = await Penalty.findByPk(id);

  if (!penalty) {
    return {
      error: `Can't delete. Penalty with id '${id} not found`,
    };
  }

  await penalty.destroy();

  return { error: null };
};

module.exports = {
  addPenalty,
  deletePenalyById,
};