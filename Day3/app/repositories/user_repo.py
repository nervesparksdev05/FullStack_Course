from typing import Optional
from bson import ObjectId
from app.db.mongo import get_db
from app.core.security import hash_password, verify_password
from app.utils.bson import oid_str

USERS = "users"

async def ensure_indexes():
    db = get_db()
    await db[USERS].create_index("email", unique=True)

async def create_user(email: str, password: str) -> dict:
    db = get_db()
    doc = {"email": email.lower(), "password_hash": hash_password(password)}
    res = await db[USERS].insert_one(doc)
    return {"id": oid_str(res.inserted_id), "email": doc["email"]}

async def find_by_email(email: str) -> Optional[dict]:
    db = get_db()
    doc = await db[USERS].find_one({"email": email.lower()})
    return doc

async def verify_user(email: str, password: str) -> Optional[str]:
    doc = await find_by_email(email)
    if not doc:
        return None
    if not verify_password(password, doc["password_hash"]):
        return None
    return oid_str(doc["_id"])
