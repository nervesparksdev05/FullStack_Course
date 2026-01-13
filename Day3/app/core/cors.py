from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.core.config import settings

def setup_cors(app: FastAPI) -> None:
    origins = settings.cors_list()
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins or ["*"],  # set explicit origins in prod
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
