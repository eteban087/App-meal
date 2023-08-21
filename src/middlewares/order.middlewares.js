const { AppError } = require('../helpers/appError');
const { catchAsync } = require('../helpers/catchAsync');
const { Order, ordertStatus } = require('../models/orders.model');
const { User } = require('../models/users.model');

const validOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findOne({
    where: {
      id,
      status: ordertStatus.active,
    },
    include: [
      {
        model: User,
      },
    ],
  });

  if (!order) {
    return next(new AppError(`order with id: ${id} not found`));
  }

  req.order = order;
  req.user = order.user;
  next();
});

module.exports = {
  validOrder,
};
