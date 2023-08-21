const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { globalErrorHandler } = require('./controller/error.controller');
const { AppError } = require('./helpers/appError');

// ============RUTAS===========
const userRoutes = require('./routes/user.routes');
const restaurantRoutes = require('./routes/restaurant.routes');
const mealRoutes = require('./routes/meals.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/restaurants', restaurantRoutes);
app.use('/api/v1/meals', mealRoutes);
app.use('/api/v1/orders', orderRoutes);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`the url ${req.originalUrl} not found on this server`)
  );
});

app.use(globalErrorHandler);

module.exports = { app };
