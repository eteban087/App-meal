const { validationResult, body } = require('express-validator');

validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

const validCreateUser = [
  body('name').notEmpty().withMessage('name is require'),
  body('email')
    .notEmpty()
    .withMessage('email is require')
    .isEmail()
    .withMessage('invalid email'),

  body('role').notEmpty().withMessage('role is required'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .matches(/[A-Za-z]/)
    .withMessage('Password must have at least one letter')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  validateFields,
];

const validLogInUser = [
  body('email')
    .notEmpty()
    .withMessage('email is require')
    .isEmail()
    .withMessage('invalid email'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .matches(/[A-Za-z]/)
    .withMessage('Password must have at least one letter')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  validateFields,
];

const validCreateRestaurant = [
  body('name').notEmpty().withMessage('name is required'),
  body('address').notEmpty().withMessage('address is required'),
  body('rating').notEmpty().withMessage('rating is required'),
  validateFields,
];

const validUpdateRestaurant = [
  body('name').notEmpty().withMessage('name is required'),
  body('address').notEmpty().withMessage('address is required'),
  validateFields,
];

const validCreateMeal = [
  body('name').notEmpty().withMessage('name is required'),
  body('price').notEmpty().withMessage('price is required'),
  validateFields,
];

const validCreateOrder = [
  body('quantity').notEmpty().withMessage('quantity is required'),
  body('mealId').notEmpty().withMessage('mealId is required'),
  validateFields,
];

module.exports = {
  validCreateUser,
  validLogInUser,
  validCreateRestaurant,
  validUpdateRestaurant,
  validCreateMeal,
  validCreateOrder,
};
