const { ApiError } = require("../utils/ApiError");

// In-memory store 
let ITEMS = [
  { id: "1", name: "First item", ownerId: "1" },
  { id: "2", name: "Second item", ownerId: "1" },
];

function list(ownerId) {
  return ITEMS.filter((it) => it.ownerId === ownerId);
}

function getById(id, ownerId) {
  const item = ITEMS.find((it) => it.id === id && it.ownerId === ownerId);
  return item || null;
}

function create({ name, ownerId }) {
  const id = String(Date.now());
  const item = { id, name, ownerId };
  ITEMS.push(item);
  return item;
}

function update(id, ownerId, { name }) {
  const item = getById(id, ownerId);
  if (!item) throw new ApiError(404, "Item not found");
  item.name = name ?? item.name;
  return item;
}

function remove(id, ownerId) {
  const item = getById(id, ownerId);
  if (!item) throw new ApiError(404, "Item not found");
  ITEMS = ITEMS.filter((it) => !(it.id === id && it.ownerId === ownerId));
  return item;
}

module.exports = { list, getById, create, update, remove };
