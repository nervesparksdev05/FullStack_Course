const { ApiError } = require("../utils/ApiError");
const itemsService = require("../services/items.service");

async function listItems(req, res) {
  const ownerId = req.user.sub;
  const items = itemsService.list(ownerId);
  res.json({ success: true, items });
}

async function getItem(req, res) {
  const ownerId = req.user.sub;
  const item = itemsService.getById(req.params.id, ownerId);
  if (!item) throw new ApiError(404, "Item not found");
  res.json({ success: true, item });
}

async function createItem(req, res) {
  const ownerId = req.user.sub;
  const { name } = req.body || {};
  if (!name) throw new ApiError(400, "name is required");
  const item = itemsService.create({ name, ownerId });
  res.status(201).json({ success: true, item });
}

async function updateItem(req, res) {
  const ownerId = req.user.sub;
  const { name } = req.body || {};
  if (!name) throw new ApiError(400, "name is required");
  const item = itemsService.update(req.params.id, ownerId, { name });
  res.json({ success: true, item });
}

async function deleteItem(req, res) {
  const ownerId = req.user.sub;
  const deleted = itemsService.remove(req.params.id, ownerId);
  res.json({ success: true, deleted });
}

module.exports = { listItems, getItem, createItem, updateItem, deleteItem };
