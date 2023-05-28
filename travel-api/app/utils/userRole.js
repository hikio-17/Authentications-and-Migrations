const { User } = require('../models');
const { authenticationErrorResponse, authorizationErrorResponse } = require('./errorResponse');

const adminRole = async (req, res, next) => {
  const id = req.userId;

  const user = await User.findOne({
    where: {
      id,
    },
  });

  console.log(user);

  if (user.role !== 'ADMIN') {
    return authorizationErrorResponse(res, 'Require only  role admin!');
  }

  next();
};

module.exports = adminRole;