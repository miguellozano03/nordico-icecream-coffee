from abc import ABC, abstractmethod
from typing import Any

from .schemas import ToolParameter


class BaseTool(ABC):
  name: str
  description: str
  parameters: list[ToolParameter] = []

  @abstractmethod
  async def execute(self, **kwargs: Any) -> Any:
    pass
