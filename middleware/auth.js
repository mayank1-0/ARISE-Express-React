const jwt = require('jsonwebtoken');
const config = require('../config.json');

module.exports = (req, res, next) => {
  try {
    console.log('111111', req.headers.authorization);
    const token = req.headers.authorization.split(' ')[1];
    console.log('Session Data: ', req.session.user, 'Token: ', req.session.token);
    if (req.session.user && req.session.token && req.session.token === token) {
    const decodedToken = jwt.verify(token, config.jwtSecret);
    const tokenStatus = decodedToken.isActive;
    if (tokenStatus) {
      next();
    } else {
      throw 'Invalid token';
    }
    }else if(!req.session.token) {
      console.log('##########TOKEN VERIFIED. API ACCESS VIA REST CLIENT i.e POSTMAN,etc########');
      const decodedToken = jwt.verify(token, config.jwtSecret);
      const tokenStatus = decodedToken.isActive;
      if (tokenStatus) {
        next();
      } else {
        throw 'Invalid token';
      }
    } else {
      throw 'Invalid token';
    }
  } catch {
    res.status(401).send({
      error: 'Authorization Failed. Invalid Token'
    });
  }
};