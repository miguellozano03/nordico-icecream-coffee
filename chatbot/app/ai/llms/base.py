from abc import ABC, abstractmethod
from typing import Sequence

from app.ai.tools.base import BaseTool

from .schemas import ChatMessage, LLMResponse


class BaseLLM(ABC):

  @abstractmethod
  async def chat(self, messages: list[ChatMessage], tools: Sequence[BaseTool] | None = None) -> LLMResponse:
    pass
