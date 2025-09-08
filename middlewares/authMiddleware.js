const jwt = require("jsonwebtoken");

const authMiddleware = (req) => {
  const authHeader = req.headers.authorization || "";
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (err) {
      throw new Error("Invalid JWT");
    }
  }
  return null;
};

module.exports = authMiddleware;
