from dataclasses import dataclass, field


@dataclass(slots=True)
class ToolCall:
    id: str
    name: str
    arguments: dict
