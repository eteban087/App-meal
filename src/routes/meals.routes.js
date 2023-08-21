const {
  createMeal,
  findAllMeals,
  findOneMeal,
  updateMeal,
  deleteMeal,
} = require('../controller/meal.controller');
const express = require('express');

const router = express.Router();

const { validCreateMeal } = require('../middlewares/validations.middlewares');
const { protect, restrictTo } = require('../middlewares/user.middlewares');
const { validMeal } = require('../middlewares/meal.middlewares');

router.post('/:id', validCreateMeal, protect, restrictTo('admin'), createMeal);

router.get('/', findAllMeals);

router.use('/:id', validMeal);
router
  .route('/:id')
  .get(findOneMeal)
  .patch(validCreateMeal, protect, restrictTo('admin'), updateMeal)
  .delete(protect, restrictTo('admin'), deleteMeal);

module.exports = router;
