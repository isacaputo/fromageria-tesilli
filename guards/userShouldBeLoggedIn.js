var jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;

function userShouldBeLoggedIn(req, res, next) {
  const authorization = req.headers["authorization"] || "";
  const token = authorization.replace(/^Bearer\s/, "");
  if (!token) {
    //no token, you are blcoked from going forward 
    res.status(401).send({ message: "please provide a token" });
  } else {
    //verify the token using supersecret
    jwt.verify(token, supersecret, function (err, decoded) {
      if (err) res.status(401).send({ message: err.message });
      else {
        //everything is awesome
        req.user_id = decoded.user_id;
        next();
      }
    });
  }
}

module.exports = userShouldBeLoggedIn;