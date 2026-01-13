from fastapi import APIRouter, Depends, HTTPException
from app.api.deps import get_current_user_id
from app.models.item import ItemCreate, ItemUpdate, ItemOut
from app.repositories import item_repo

router = APIRouter(prefix="/items", tags=["items"])

@router.post("", response_model=ItemOut, status_code=201)
async def create_item(payload: ItemCreate, user_id: str = Depends(get_current_user_id)):
    return await item_repo.create_item(user_id, payload.title, payload.description)

@router.get("", response_model=list[ItemOut])
async def list_items(skip: int = 0, limit: int = 50, user_id: str = Depends(get_current_user_id)):
    return await item_repo.list_items(user_id, skip=skip, limit=limit)

@router.get("/{item_id}", response_model=ItemOut)
async def get_item(item_id: str, user_id: str = Depends(get_current_user_id)):
    item = await item_repo.get_item(user_id, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@router.put("/{item_id}", response_model=ItemOut)
async def update_item(item_id: str, payload: ItemUpdate, user_id: str = Depends(get_current_user_id)):
    item = await item_repo.update_item(user_id, item_id, payload.model_dump())
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@router.delete("/{item_id}")
async def delete_item(item_id: str, user_id: str = Depends(get_current_user_id)):
    ok = await item_repo.delete_item(user_id, item_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"deleted": True}
