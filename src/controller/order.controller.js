const { AppError } = require('../helpers/appError');
const { catchAsync } = require('../helpers/catchAsync');
const { Meal, mealStatus } = require('../models/meals.model');
const { Order, ordertStatus } = require('../models/orders.model');
const { Restaurant } = require('../models/restaurants.model');

const createOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { id: userId } = req.sessionUser;

  const meal = await Meal.findOne({
    where: {
      id: mealId,
      status: mealStatus.active,
    },
  });

  if (!meal) {
    return next(new AppError(`meal with id: ${mealId} not found  `));
  }

  let totalPrice = meal.price * quantity;

  const order = await Order.create({
    quantity,
    mealId,
    totalPrice,
    userId,
  });

  return res.status(200).json({
    status: 'success',
    order,
  });
});

const findMyOrders = catchAsync(async (req, res, next) => {
  const { id: userId } = req.sessionUser;
  const orders = await Order.findAll({
    where: {
      userId,
      status: ordertStatus.active,
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

const updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;
  order.update({
    status: ordertStatus.completed,
  });

  return res.status(200).json({
    status: 'success',
    message: 'order has been completed successfully!',
  });
});

const deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;
  order.update({
    status: ordertStatus.cancelled,
  });

  return res.status(200).json({
    status: 'success',
    message: 'order has been cancelled successfully!',
  });
});

module.exports = {
  createOrder,
  findMyOrders,
  updateOrder,
  deleteOrder,
};
