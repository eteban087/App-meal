const { catchAsync } = require('../helpers/catchAsync');
const { Meal, mealStatus } = require('../models/meals.model');
const { Restaurant } = require('../models/restaurants.model');

const createMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { id: restaurantId } = req.params;

  const meal = await Meal.create({
    name,
    price,
    restaurantId,
  });

  return res.status(200).json({
    status: 'success',
    message: 'meal has been created successfully!',
    meal,
  });
});

const findAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: {
      status: mealStatus.active,
    },

    include: [
      {
        model: Restaurant,
      },
    ],
  });

  return res.status(200).json({
    status: 'success',
    meals,
  });
});

const findOneMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  return res.status(200).json({
    ststus: 'success',
    meal,
  });
});

const updateMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { meal } = req;

  meal.update({
    name,
    price,
  });

  return res.status(200).json({
    status: 'success',
    message: 'meal has been updated successfully!',
  });
});

const deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  meal.update({
    status: mealStatus.disabled,
  });

  return res.status(200).json({
    status: 'success',
    message: 'meal has been deleted successfully!',
  });
});

module.exports = {
  createMeal,
  findAllMeals,
  findOneMeal,
  updateMeal,
  deleteMeal,
};
