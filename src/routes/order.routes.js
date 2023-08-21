const {
  createOrder,
  findMyOrders,
  deleteOrder,
  updateOrder,
} = require('../controller/order.controller');
const express = require('express');

const router = express.Router();
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/user.middlewares');

const { validCreateOrder } = require('../middlewares/validations.middlewares');

const { validOrder } = require('../middlewares/order.middlewares');
const { validMeal } = require('../middlewares/meal.middlewares');

router.use(protect);
router.post('/', validCreateOrder, createOrder);
router.get('/me', findMyOrders);
router.use('/:id', validOrder, protectAccountOwner);
router.route('/:id').patch(updateOrder).delete(deleteOrder);

module.exports = router;
