const { AppError } = require('../helpers/appError');
const { catchAsync } = require('../helpers/catchAsync');
const { Restaurant, restaurantStatus } = require('../models/restaurants.model');
const { Review, reviewtStatus } = require('../models/reviews.model');

const createRestaurant = catchAsync(async (req, res, next) => {
  const { rating, address, name } = req.body;
  const restaurant = await Restaurant.create({
    rating,
    address,
    name,
  });

  if (rating > 5) {
    return next(new AppError('the rating cannot be higher than 5', 400));
  }

  if (rating < 1) {
    return next(new AppError('the rating cannot be less than 1', 400));
  }

  return res.status(200).json({
    status: 'success',
    message: 'Restaurant has been created successfullly!',
    restaurant,
  });
});

const findAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: restaurantStatus.active,
    },
    include: [
      {
        model: Review,
        where: {
          status: reviewtStatus.active,
        },
      },
    ],
  });

  return res.status(200).json({
    status: 'success',
    restaurants,
  });
});

const findRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  return res.status(200).json({
    status: 'success',
    restaurant,
  });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, address } = req.body;

  restaurant.update({
    name,
    address,
  });

  return res.status(200).json({
    status: 'success',
    message: 'restaurant has benn updated successfully!',
  });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  restaurant.update({
    status: restaurantStatus.disabled,
  });

  return res.status(200).json({
    status: 'success',
    message: 'restaurant has been deleted successfully!',
  });
});

const createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { id: restaurantId } = req.params;
  const { id: userId } = req.sessionUser;
  const review = await Review.create({
    comment,
    rating,
    userId,
    restaurantId,
  });

  if (rating > 5) {
    return next(new AppError('the rating cannot be higher than 5', 400));
  }

  if (rating < 1) {
    return next(new AppError('the rating cannot be less than 1', 400));
  }

  return res.status(200).json({
    status: ' success',
    review,
  });
});

const updateReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { id } = req.params;
  const { restaurantId } = req.params;
  const review = await Review.findOne({
    where: {
      id,
      restaurantId,
    },
  });

  if (rating > 5) {
    return next(new AppError('the rating cannot be higher than 5', 400));
  }

  if (rating < 1) {
    return next(new AppError('the rating cannot be less than 1', 400));
  }

  review.update({
    comment,
    rating,
  });

  return res.status(200).json({
    status: 'success',
    message: 'review has been update successfully!',
  });
});

const deleteReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { restaurantId } = req.params;
  const review = await Review.findOne({
    where: {
      id,
      restaurantId,
    },
  });

  review.update({
    status: reviewtStatus.disabled,
  });

  return res.status(200).json({
    status: 'success',
    message: 'review has been deleted successfully!',
  });
});

module.exports = {
  createRestaurant,
  findAllRestaurants,
  findRestaurant,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview,
};
