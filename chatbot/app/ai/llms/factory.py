from app.core.settings import settings

from .base import BaseLLM
from .gemini_provider import GeminiLLM
from .ollama_provider import OllamaLLM


async def get_llm() -> BaseLLM:
  provider = settings.llm_provider

  if provider == "ollama":
    llm = OllamaLLM(settings.llm_model)
    await llm.initialize()
    return llm

  if provider == "gemini":
    llm = GeminiLLM(settings.llm_model)
    return llm

  raise ValueError("LLM not supported")
