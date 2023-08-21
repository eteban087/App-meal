const { catchAsync } = require('../helpers/catchAsync');
const { Restaurant, restaurantStatus } = require('../models/restaurants.model');
const { AppError } = require('../helpers/appError');
const { Review, reviewtStatus } = require('../models/reviews.model');

const validRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findOne({
    where: {
      id,
      status: restaurantStatus.active,
    },
    include: {
      model: Review,
      where: {
        status: reviewtStatus.active,
      },
    },
  });

  if (!restaurant) {
    return next(new AppError(`restaurant with id ${id} not found`));
  }

  req.restaurant = restaurant;

  next();
});

module.exports = {
  validRestaurant,
};
