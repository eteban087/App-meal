const { AppError } = require('../helpers/appError');
const { catchAsync } = require('../helpers/catchAsync');
const { Meal, mealStatus } = require('../models/meals.model');
const { Restaurant } = require('../models/restaurants.model');

const validMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const meal = await Meal.findOne({
    where: {
      id,
      status: mealStatus.active,
    },
    include: {
      model: Restaurant,
    },
  });

  if (!meal) {
    return next(new AppError(`meal with id ${id} not found`));
  }

  req.meal = meal;

  next();
});

module.exports = {
  validMeal,
};
