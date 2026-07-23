import functools

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8')

    llm_provider: str
    llm_model: str
    llm_api_key: str

    menu_endpoint: str
    categories_endpoint: str

@functools.lru_cache
def get_settings() -> Settings:
  return Settings(_env_file=".env") # type: ignore

settings = get_settings()
