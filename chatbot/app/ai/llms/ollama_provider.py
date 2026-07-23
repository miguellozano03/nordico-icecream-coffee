import logging

from ollama import AsyncClient

from .base import BaseLLM
from .schemas import ChatMessage, LLMResponse

logger = logging.getLogger(__name__)

class OllamaLLM(BaseLLM):

  def __init__(self, model: str) -> None:
    self.client = AsyncClient()
    self.model = model

    logger.info("Using Ollama model: %s", self.model)

  async def initialize(self) -> None:
    await self.verify_connection()

  async def chat(self, messages: list[ChatMessage]) -> LLMResponse:

    ollama_messages = [
      {"role": m.role, "content": m.content} for m in messages
    ]

    logger.info("Sending request to Ollama...")

    response = await self.client.chat(
      model=self.model,
      messages=ollama_messages
    )

    logger.info("Response received from model: %s", response.model)

    if response.message.content is None:
      raise RuntimeError("Ollama returned empty response")
    if response.model is None:
      raise RuntimeError("Ollama did not return a model")

    return LLMResponse(content=response.message.content, model=response.model)

  async def verify_connection(self) -> None:
      models = await self.client.list()

      available = [
          m.model
          for m in models.models
          if m.model is not None
      ]

      if self.model not in available:
          raise RuntimeError(
              f"Model '{self.model}' is not installed.\n"
              f"Available models: {', '.join(available)}"
          )
      logger.info("Loaded model: %s", self.model)
