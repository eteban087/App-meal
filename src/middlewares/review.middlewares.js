const { AppError } = require('../helpers/appError');
const { catchAsync } = require('../helpers/catchAsync');
const { Review, reviewtStatus } = require('../models/reviews.model');
const { User } = require('../models/users.model');

const validReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findOne({
    where: {
      id,
      status: reviewtStatus.active,
    },
    include: {
      model: User,
    },
  });

  if (!review) {
    return next(new AppError(`review with id ${id} not found`));
  }

  req.user = review.user;

  next();
});

module.exports = {
  validReview,
};
