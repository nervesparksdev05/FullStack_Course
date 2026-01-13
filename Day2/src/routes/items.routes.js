const router = require("express").Router();
const { requireAuth } = require("../middleware/auth.middleware");
const { asyncHandler } = require("../utils/asyncHandler");
const {
  listItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/items.controller");

// Protect all item routes with JWT
router.use(requireAuth);

router.get("/", asyncHandler(listItems));        // GET /api/items
router.get("/:id", asyncHandler(getItem));       // GET /api/items/:id
router.post("/", asyncHandler(createItem));      // POST /api/items
router.put("/:id", asyncHandler(updateItem));    // PUT /api/items/:id
router.delete("/:id", asyncHandler(deleteItem)); // DELETE /api/items/:id

module.exports = router;
