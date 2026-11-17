const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("../errors/index");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      new CustomAPIError("Authentication required", StatusCodes.UNAUTHORIZED),
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS);
    req.user = {
      role: payload.role,
      userId: payload.userId,
      email: payload.email,
    };
    console.log(req.user);

    next();
  } catch (error) {
    return next(
      new CustomAPIError("Invalid or expired token", StatusCodes.UNAUTHORIZED),
    );
  }
};

module.exports = authenticate;
