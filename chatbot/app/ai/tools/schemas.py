from dataclasses import dataclass
from typing import Any


@dataclass
class ToolParameter:
  name: str
  type: str
  description: str
  required: bool = False


@dataclass
class ToolCall:
  id: str
  name: str
  arguments: dict[str, Any]
  raw: Any = None  # dato opaco específico del provider (ej: thought_signature de Gemini)
