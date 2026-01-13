const router = require("express").Router();
const { asyncHandler } = require("../utils/asyncHandler");
const { login, me } = require("../controllers/auth.controller");
const { requireAuth } = require("../middleware/auth.middleware");

router.post("/login", asyncHandler(login));
router.get("/me", requireAuth, asyncHandler(me));

module.exports = router;
