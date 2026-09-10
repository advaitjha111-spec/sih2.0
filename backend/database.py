import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "sqlite:///../bhumiraksha.db"
    )
    SECRET_KEY: str = os.getenv("SECRET_KEY", "default-secret-key")

    model_config = SettingsConfigDict(env_file="../.env", extra="ignore")

settings = Settings()

# Supabase default URL uses `postgres://` which SQLAlchemy 1.4+ deprecates in favor of `postgresql://`
db_url = settings.DATABASE_URL
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

connect_args = {}
if db_url.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(db_url, connect_args=connect_args, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
