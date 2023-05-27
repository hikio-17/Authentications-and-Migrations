const { User } = require('../models');
const { authenticationErrorResponse } = require('./errorResponse');

const adminRole = async (req, res, next) => {
  const id = req.userId;

  const user = await User.findOne({
    where: {
      id,
    },
  });

  if (user.role !== 'ADMIN') {
    return authenticationErrorResponse(res, 'Require only  role admin!');
  }

  next();
};

module.exports = adminRole;