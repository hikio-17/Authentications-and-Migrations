const { User } = require('../models');
const { authorizationErrorResponse } = require('./errorResponse');

const adminRole = async (req, res, next) => {
  console.log('===================================');
  const id = req.userId;
  console.log(id);

  const user = await User.findOne({
    where: {
      id,
    },
  });

  if (user.role !== 'ADMIN') {
    return authorizationErrorResponse(res, 'Require only  role admin!');
  }

  next();
};

module.exports = adminRole;