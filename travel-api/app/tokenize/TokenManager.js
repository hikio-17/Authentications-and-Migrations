const Jwt = require('jsonwebtoken');

const TokenManager = {
  generateAccessToken: (id) => `Bearer ${Jwt.sign({
    id,
  }, 'hikio010217', {
    expiresIn: 86400,
  })}`,
  verifyAccessToken: (req, res, next) => {
    const tokenHeader = req.headers['x-access-token'];
    if (!tokenHeader) {
      return res.status(500).send({
        status: 'error',
        message: 'Access token not found',
      });
    }
    if (tokenHeader.split(' ')[0] !== 'Bearer') {
      return res.status(500).send({
        status: 'error',
        message: 'Incorrect token format',
      });
    }

    const token = tokenHeader.split(' ')[1];

    if (!token) {
      return res.status(500).send({
        status: 'error',
        message: 'No token provided',
      });
    }

    Jwt.verify(token, 'hikio010217', (err, decode) => {
      if (err) {
        return res.status(500).send({
          status: 'error',
          message: err,
        });
      }

      req.userId = decode.id;
      next();
    });
  },
};

module.exports = TokenManager;