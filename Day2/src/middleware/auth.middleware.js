const { ApiError } = require("../utils/ApiError");
const { verifyToken } = require("../services/auth.service");

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return next(new ApiError(401, "Missing or invalid Authorization header"));
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // { sub, email, role, iat, exp }
    return next();
  } catch (e) {
    return next(new ApiError(401, "Invalid or expired token"));
  }
}

module.exports = { requireAuth };
