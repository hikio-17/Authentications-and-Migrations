const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { clientErrorResponse } = require('../utils/errorResponse');

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

const editUserById = async ({
  name = '',
  email = '',
  address = '',
  telephone = '',
  role = '',
  old_password = '',
  new_password = '',
}, userId) => {
  const user = await User.findByPk(userId);

  if (old_password || new_password) {
    const passwordIsValid = await bcrypt.compare(old_password, user.password);

    if (!passwordIsValid) {
      return {
        error: true,
        message: 'Password not valid',
      };
    }
    return false;
  }

  await user.update({
    name: name || user.name,
    address: address || user.address,
    email: email || user.email,
    telephone: telephone || user.telephone,
    password: new_password || user.password,
    role: role || user.role,
  }, {
    where: {
      id: userId,
    },
  });

  return {
    error: false,
    message: `User with id '${userId}' successfully updated!`,
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
  const userAccess = await User.findByPk(userrAccess);

  const user = await User.findByPk(userId);

  if (userAccess.role === 'ADMIN' || userAccess.id === user.id) {
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
  editUserById,
};