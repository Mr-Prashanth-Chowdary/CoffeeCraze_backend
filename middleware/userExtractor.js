const jwt = require("jsonwebtoken");
require("dotenv").config();

const key = process.env.JWT_SECRET;

const userExtractor = (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const user = jwt.verify(req.token, key);
    req.id = user.id;
    req.username = user.username;
    req.role = user.role;
    next();
  } catch (e) {
    console.error(e);
    if (e.name === "TokenExpiredError") {
      return res.status(401).json({ error: "JWT token expired" });
    }
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = userExtractor;
