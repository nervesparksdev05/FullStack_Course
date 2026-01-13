from fastapi import FastAPI
from app.core.config import settings
from app.core.cors import setup_cors
from app.db.mongo import connect_to_mongo, close_mongo_connection
from app.api.routes import all_routers
from app.repositories.user_repo import ensure_indexes

app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

setup_cors(app)

for r in all_routers:
    app.include_router(r)

@app.on_event("startup")
async def startup():
    await connect_to_mongo()
    await ensure_indexes()

@app.on_event("shutdown")
async def shutdown():
    await close_mongo_connection()

@app.get("/health")
async def health():
    return {"status": "ok"}
