const { catchAsync } = require('../helpers/catchAsync');
const { User, usertStatus } = require('../models/users.model');
const bycript = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const { AppError } = require('../helpers/appError');
const { Order } = require('../models/orders.model');
const { Meal } = require('../models/meals.model');
const { Restaurant } = require('../models/restaurants.model');

const signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const salt = await bycript.genSalt(12);
  const encryptedPassword = await bycript.hash(password, salt);

  const user = await User.create({
    name: name.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
    password: encryptedPassword,
    role,
  });

  const token = await generateJWT(user.id);

  return res.status(200).json({
    status: 'success',
    token,
    user,
  });
});

const logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase().trim(),
      status: usertStatus.active,
    },
  });

  if (!user) {
    return next(new AppError(`user with email ${email} not found`), 404);
  }

  if (!(await bycript.compare(password, user.password))) {
    return next(new AppError('password or email incorrect'), 401);
  }

  const token = await generateJWT(user.id);

  return res.status(200).json({
    status: 'success',
    token,
    user,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { user } = await req;
  const { name, email } = req.body;

  user.update({
    name,
    email,
  });

  return res.status(200).json({
    status: 'succes',
    message: 'user has been  udated successfully!',
  });
});

const deleteUser = catchAsync(async (req, res, nex) => {
  const { user } = await req;

  user.update({
    status: usertStatus.disabled,
  });

  return res.status(200).json({
    status: 'success',
    message: 'user has been delted successfully!',
  });
});

const findOrders = catchAsync(async (req, res, next) => {
  const { id: userId } = req.sessionUser;
  const orders = await Order.findAll({
    where: {
      userId,
    },

    include: [
      {
        model: Meal,
        include: [
          {
            model: Restaurant,
          },
        ],
      },
    ],
  });
  return res.status(200).json({
    status: 'success',
    orders,
  });
});

const findOneOrder = catchAsync(async (req, res, next) => {
  const { id: userId } = req.sessionUser;
  const { id } = req.params;
  const order = await Order.findOne({
    where: {
      id,
      userId,
    },
    include: [
      {
        model: Meal,
        include: [
          {
            model: Restaurant,
          },
        ],
      },
    ],
  });

  if (!order) {
    return next(new AppError(`order with id: ${id} not found`));
  }
  return res.status(200).json({
    status: 'success',
    order,
  });
});

module.exports = {
  signUp,
  logIn,
  deleteUser,
  updateUser,
  findOrders,
  findOneOrder,
};
