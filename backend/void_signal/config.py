"""Application configuration."""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """VOID//SIGNAL application settings."""

    APP_NAME: str = "VOID//SIGNAL"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    APP_ENV: str = "production"
    DATABASE_URL: str = "sqlite+aiosqlite:///./void_signal.db"
    REDIS_URL: str = "redis://localhost:6379/0"
    CORS_ORIGINS: list[str] = ["*"]
    BIAS_THRESHOLD: float = 0.7
    BIAS_MAX_ARTICLES_PER_FEED: int = 10
    INGEST_INTERVAL: int = 300

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
