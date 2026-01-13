from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm

from app.models.user import UserCreate, UserOut, Token
from app.repositories import user_repo
from app.core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])  # ✅ must exist

@router.post("/register", response_model=UserOut, status_code=201)
async def register(payload: UserCreate):
    try:
        created = await user_repo.create_user(payload.email, payload.password)
        return created
    except Exception:
        raise HTTPException(status_code=400, detail="Email already exists")

@router.post("/token", response_model=Token)
async def login(form: OAuth2PasswordRequestForm = Depends()):
    user_id = await user_repo.verify_user(form.username, form.password)
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )
    token = create_access_token(subject=user_id)
    return Token(access_token=token)
