const jwt = require("jsonwebtoken");
const { env } = require("../config/env");

// Demo user store 
const USERS = [
  { id: "1", email: "user@demo.com", password: "user123", role: "user" },
];

function validateCredentials(email, password) {
  const user = USERS.find((u) => u.email === email);
  if (!user || user.password !== password) return null;
  return { id: user.id, email: user.email, role: user.role };
}

function signToken(payload) {
  return jwt.sign(payload, env.jwt.secret, { expiresIn: env.jwt.expiresIn });
}

function verifyToken(token) {
  return jwt.verify(token, env.jwt.secret);
}

module.exports = { validateCredentials, signToken, verifyToken };
