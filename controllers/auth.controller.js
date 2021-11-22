const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { Success } = require('../utils/Success');
const { Error } = require('../utils/Error');
const {
  generateToken,
  refreshToken,
} = require('../middlewares/jwt.middleware');
const config = require('../commons/config');

let refreshTokens = [];

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
      password,
    });
    console.log(user, '8888888888');
    if (!user) {
      throw new Error({
        statusCode: 404,
        message: 'user.notFound',
        error: 'user has been not registered',
      });
    }

    const accessToken = await generateToken(
      user,
      config.JWT_SECRET_KEY,
      config.JWT_TOKEN_LIFE
    );
    const newToken = await refreshToken(user, config.JWT_SECRET_KEY_REFRESH);
    refreshTokens.push(newToken);
    await user.save();

    const data = {
      access_token: accessToken,
      new_token: newToken,
      user: {
        _id: user._id,
        email: user.email,
      },
    };
    const success = new Success({ data });
    res.status(200).send(success);
  } catch (error) {
    return next(error);
  }
};
exports.refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.body.token;
    if (!refreshToken) {
      throw new Error({
        statusCode: 404,
        message: 'Not token',
        error: 'Token expire',
      });
    }
    console.log(refreshTokens, '111111111111');
    console.log(refreshToken, '2222222222222');
    if (!refreshTokens.includes(refreshToken)) {
      throw new Error({
        statusCode: 403,
        message: 'Not rule',
        error: 'Not rule',
      });
    }

    jwt.verify(refreshToken, config.JWT_SECRET_KEY_REFRESH, (err, data) => {
      console.log(err, data);
      if (err) {
        throw new Error({
          statusCode: 400,
          message: 'Not token new',
          error: 'Not rule',
        });
      }

      const user = { ...data.data };
      const accessToken = jwt.sign({ data: user }, config.JWT_SECRET_KEY, {
        algorithm: 'HS256',
        expiresIn: config.JWT_TOKEN_LIFE,
      });
      const dataNew = {
        access_token: accessToken,
      };

      const success = new Success({ dataNew });
      console.log(success, '2222');
      res.status(200).send(dataNew);
    });
  } catch (error) {
    return next(error);
  }
};
