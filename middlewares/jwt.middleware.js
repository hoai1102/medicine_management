const jwt = require('jsonwebtoken');
const config = require('../commons/config');

exports.generateToken = (user, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    jwt.sign(
      { data: user },
      secretSignature,
      { algorithm: 'HS256', expiresIn: tokenLife },
      (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
};
exports.refreshToken = (user, secretSignature) => {
  return new Promise((resolve, reject) => {
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    jwt.sign(
      { data: user },
      secretSignature,
      { algorithm: 'HS256' },
      (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
};
exports.verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  const token = authorizationHeader.split(' ')[1];
  if (!token) res.sendStatus(401);
  jwt.verify(token, config.JWT_SECRET_KEY, (err, data) => {
    console.log(err, data);
    if (err) res.sendStatus(403);
    next();
  });
};
