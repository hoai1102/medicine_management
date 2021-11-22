const User = require('../models/user.model');
const { Success } = require('../utils/Success');
const { Error } = require('../utils/Error');

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.find({});
    if (!user) {
      throw new Error({
        statusCode: 400,
        message: 'user.notFound',
        error: 'user not found',
      });
    }

    const success = new Success({ data: user });
    res.status(200).send(success);
  } catch (error) {
    return next(error);
  }
};
const emailRegex =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
exports.create = async (req, res, next) => {
  console.log(req.body, 'hoài');
  try {
    // Validate request
    if (!req.body.email) {
      throw new Error({
        statusCode: 400,
        message: 'Content can not be empty!',
        error: 'password and confirm_password do not matched',
      });
    }
    const existedUser = await User.findOne({
      email: req.body.email,
    });
    if (existedUser) {
      throw new Error({
        statusCode: 400,
        message: 'Email already exists!',
        error: 'password and confirm_password do not matched',
      });
    }
    const valid = emailRegex.test(req.body.email);
    if (!valid) {
      throw new Error({
        statusCode: 400,
        message: 'Email incorrect!',
        error: 'password and confirm_password do not matched',
      });
    }
    // Create a Tutorial
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    // Save Tutorial in the database
    const savedUser = await user.save();

    const success = new Success({ data: savedUser });
    res.status(200).send(success);
  } catch (error) {
    return next(error);
  }
};
