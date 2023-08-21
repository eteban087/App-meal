const {
  createRestaurant,
  deleteRestaurant,
  findAllRestaurants,
  updateRestaurant,
  findRestaurant,
  createReview,
  updateReview,
  deleteReview,
} = require('../controller/restaurant.controller');
const express = require('express');
const router = express.Router();

const { validRestaurant } = require('../middlewares/restaurants.middlewares');
const {
  validCreateRestaurant,
  validUpdateRestaurant,
} = require('../middlewares/validations.middlewares');

const {
  protect,
  protectAccountOwner,
  restrictTo,
} = require('../middlewares/user.middlewares');
const { validReview } = require('../middlewares/review.middlewares');

router.get('/', findAllRestaurants);
router.post(
  '/',
  validCreateRestaurant,
  protect,
  restrictTo('admin'),
  createRestaurant
);

router.post('/reviews/:id', protect, createReview);

router.patch(
  '/reviews/:restaurantId/:id',
  validReview,
  protect,
  protectAccountOwner,
  updateReview
);

router.delete(
  '/reviews/:restaurantId/:id',
  validReview,
  protect,
  protectAccountOwner,
  deleteReview
);

router
  .route('/:id')
  .get(validRestaurant, findRestaurant)
  .patch(
    validUpdateRestaurant,
    validRestaurant,
    protect,
    restrictTo('admin'),
    updateRestaurant
  )
  .delete(validRestaurant, protect, restrictTo('admin'), deleteRestaurant);

module.exports = router;
