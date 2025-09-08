const jwt = require("jsonwebtoken");

const authMiddleware = (req) => {
  const authHeader = req.headers.authorization || "";
  if (authHeader.startsWith("Bearer ")) {
    verifyJWT(authHeader);
  }
  return {};
};

const verifyJWT = async (token) => {
  try {
    let authData = jwt.verify(token.split(" ")[1], JWT_SECRET);
    return authData;
  } catch (err) {
    throw new Error("Invalid JWT");
  }
};

module.exports = authMiddleware;
