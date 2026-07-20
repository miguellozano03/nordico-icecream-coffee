from dataclasses import dataclass, field

from tools.base import BaseTool


@dataclass(slots=True)
class LLMResponse:
  content: str
  model: str

@dataclass(slots=True)
class ChatMessage:
  role: str
  content: str | None = None
  tool_calls: list
