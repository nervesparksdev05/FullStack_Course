from pydantic import BaseModel, Field
from typing import Optional

class ItemCreate(BaseModel):
    title: str = Field(min_length=2, max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)

class ItemUpdate(BaseModel):
    title: Optional[str] = Field(default=None, min_length=2, max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)

class ItemOut(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    owner_id: str
