from dataclasses import dataclass


@dataclass(slots=True)
class ToolCall:
    id: str
    name: str
    arguments: dict
