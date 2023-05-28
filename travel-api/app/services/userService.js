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

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: ['id', 'name', 'email'],
  });

  return users;
};

const getUserById = async (id) => {
  const user = await User.findOne({
    where: {
      id,
    },
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    return {
      error: `Not found user with id '${id}'`,
      user: null,
    };
  }

  return {
    error: null,
    user,
  };
};

const deleteUserById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    return {
      error: `Can't delete. User with id '${id}' not found`,
    };
  }
  await user.destroy();
  return {
    error: null,
  };
};

const verifyUserAccess = async (userrAccess, userId) => {
  const user = await User.findByPk(userId);

  if (user.role === 'ADMIN' || user.id === userrAccess) {
    return true;
  }

  return false;
};

module.exports = {
  addUser,
  verifyDuplicateEmail,
  verifyUserCredential,
  getAllUsers,
  getUserById,
  deleteUserById,
  verifyUserAccess,
};