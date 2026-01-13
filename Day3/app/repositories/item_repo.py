from typing import List, Optional
from bson import ObjectId
from app.db.mongo import get_db
from app.utils.bson import oid_str, to_object_id

ITEMS = "items"

async def create_item(owner_id: str, title: str, description: Optional[str]) -> dict:
    db = get_db()
    doc = {"owner_id": owner_id, "title": title, "description": description}
    res = await db[ITEMS].insert_one(doc)
    return {"id": oid_str(res.inserted_id), **doc}

async def list_items(owner_id: str, skip: int = 0, limit: int = 50) -> List[dict]:
    db = get_db()
    cursor = db[ITEMS].find({"owner_id": owner_id}).skip(skip).limit(limit)
    items = []
    async for d in cursor:
        items.append({
            "id": oid_str(d["_id"]),
            "title": d["title"],
            "description": d.get("description"),
            "owner_id": d["owner_id"],
        })
    return items

async def get_item(owner_id: str, item_id: str) -> Optional[dict]:
    db = get_db()
    d = await db[ITEMS].find_one({"_id": to_object_id(item_id), "owner_id": owner_id})
    if not d:
        return None
    return {
        "id": oid_str(d["_id"]),
        "title": d["title"],
        "description": d.get("description"),
        "owner_id": d["owner_id"],
    }

async def update_item(owner_id: str, item_id: str, patch: dict) -> Optional[dict]:
    db = get_db()
    patch = {k: v for k, v in patch.items() if v is not None}
    if not patch:
        return await get_item(owner_id, item_id)

    await db[ITEMS].update_one(
        {"_id": to_object_id(item_id), "owner_id": owner_id},
        {"$set": patch},
    )
    return await get_item(owner_id, item_id)

async def delete_item(owner_id: str, item_id: str) -> bool:
    db = get_db()
    res = await db[ITEMS].delete_one({"_id": to_object_id(item_id), "owner_id": owner_id})
    return res.deleted_count == 1
