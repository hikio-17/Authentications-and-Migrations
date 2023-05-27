const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const addUser = async ({
  name, email, telephone, address, password, role = 'USER',
}) => {
  const id = `user-${nanoid()}`;
  const user = {
    id,
    name,
    email,
    telephone,
    address,
    password: bcrypt.hashSync(password, 10),
    role,
  };

  const newUser = await User.create(user);

  return newUser.id;
};

const verifyUserCredential = async ({ email, password }) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      error: 'Kredential not valid!',
    };
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return {
      error: 'Kredential not valid!',
    };
  }

  return {
    userId: user.id,
  };
};

const verifyDuplicateEmail = async (email) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (user) {
    return user.email;
  }
};

module.exports = {
  addUser,
  verifyDuplicateEmail,
  verifyUserCredential,
};