const jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;

// Guard function
function userShouldBeLoggedIn(req, res, next) {
  // Read the token from the authorization header
  const authorization = req.headers["authorization"] || "";

  // Take out the "Bearer" part of the token that comes at the beginning
  const token = authorization.replace(/^Bearer\s/, "");

  if (!token) {
    // If there is no token, you are blocked from going forward
    res.status(401).send({ message: "please provide a token" });
  } else {
    // Verify the token using the supersecret password
    jwt.verify(token, supersecret, function (err, decoded) {
      // Decoded payload: an object containing the user id
      if (err) res.status(401).send({ message: err.message });
      else {
        // There is a token and it is valid
        req.user_id = decoded.user_id;
        // Let the code move to teh next layer
        next();
      }
    });
  }
}

module.exports = userShouldBeLoggedIn;
