const jwt = require('jsonwebtoken');
const fs = require('fs');
if (fs.existsSync('config/secrets.js')) {
  var secrets = require('../config/secrets.js');
} else {
  var secrets = { jwtSecret: process.env.JWT_SECRET };
}
module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err) => {
      if (err) {
        res.status(401).json({ you: "aren't registered" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ you: 'need a token' });
  }
};