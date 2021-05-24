const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET =
  '$2y$10$7G2APt9ivpP3oUKZDWjwzO7SIp9ccXaI4Q5c8WZmwCMgRCy1IQ3k.';
module.exports = {
  generateTokenForUser: function(userData) {
    return jwt.sign(
      {
        userId: userData.id,
        isAdmin: userData.isAdmin,
      },
      JWT_SIGN_SECRET,
      {
        expiresIn: "24h",
      }
    );
  },
  parseAuthorization: function(authorization) {
    return authorization != null ? authorization.replace("Bearer ", "") : null;
  },
  getUserId: function(authorization) {
    var userId = -1;
    var token = module.exports.parseAuthorization(authorization);
    if (token != null) {
      try {
        var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if (jwtToken != null) userId = jwtToken.userId;
      } catch (err) {}
    }
    return userId;
  },
};