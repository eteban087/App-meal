const express = require('express');

const {
  signUp,
  logIn,
  updateUser,
  deleteUser,
  findOrders,
  findOneOrder,
} = require('../controller/user.controller');

const {
  validCreateUser,
  validLogInUser,
} = require('../middlewares/validations.middlewares');
const {
  validUser,
  protect,
  protectAccountOwner,
} = require('../middlewares/user.middlewares');

const router = express.Router();

router.post('/signup', validCreateUser, signUp);
router.post('/login', validLogInUser, logIn);

router
  .route('/:id')
  .patch(validUser, protect, protectAccountOwner, updateUser)
  .delete(validUser, protect, protectAccountOwner, deleteUser);

router.get('/orders', protect, findOrders);

router.get('/orders/:id', protect, findOneOrder);

module.exports = router;
