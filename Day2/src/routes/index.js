const router = require("express").Router();

router.use("/auth", require("./auth.routes"));
router.use("/items", require("./items.routes"));

module.exports = router;
