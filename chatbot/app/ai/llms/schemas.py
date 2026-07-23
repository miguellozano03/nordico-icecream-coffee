from dataclasses import dataclass, field

from app.ai.tools.schemas import ToolCall


@dataclass
class LLMResponse:
  content: str | None
  model: str
  tool_calls: list[ToolCall] = field(default_factory=list)


@dataclass
class ChatMessage:
  role: str
  content: str
  tool_calls: list[ToolCall] = field(default_factory=list)
  tool_call_id: str | None = None  # solo para role="tool"
  tool_name: str | None = None  # solo para role="tool"
