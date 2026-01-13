from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field
from typing import List

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = Field(default="FastAPI Mongo CRUD", alias="APP_NAME")
    env: str = Field(default="dev", alias="ENV")

    mongodb_uri: str = Field(..., alias="MONGODB_URI")
    mongodb_db: str = Field(default="fastapi_db", alias="MONGODB_DB")

    jwt_secret: str = Field(..., alias="JWT_SECRET")
    jwt_algorithm: str = Field(default="HS256", alias="JWT_ALGORITHM")
    access_token_expire_minutes: int = Field(default=60, alias="ACCESS_TOKEN_EXPIRE_MINUTES")

    cors_origins: str = Field(default="", alias="CORS_ORIGINS")

    def cors_list(self) -> List[str]:
        if not self.cors_origins.strip():
            return []
        return [x.strip() for x in self.cors_origins.split(",") if x.strip()]

settings = Settings()
