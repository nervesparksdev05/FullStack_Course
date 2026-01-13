const { ApiError } = require("../utils/ApiError");
const { validateCredentials, signToken } = require("../services/auth.service");

async function login(req, res) {
  const { email, password } = req.body || {};
  if (!email || !password) throw new ApiError(400, "email and password required");

  const user = validateCredentials(email, password);
  if (!user) throw new ApiError(401, "Invalid credentials");

  const token = signToken({ sub: user.id, email: user.email, role: user.role });

  res.json({
    success: true,
    token,
    user,
  });
}

async function me(req, res) {
  res.json({
    success: true,
    user: req.user,
  });
}

module.exports = { login, me };
