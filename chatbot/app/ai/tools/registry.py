from .base import BaseTool


class ToolRegistry:

  def __init__(self, tools: list[BaseTool]):
    self._tools = { tool.name: tool for tool in tools }

  def all(self) -> list[BaseTool]:
    return list(self._tools.values())

  def get(self, name: str) -> BaseTool:
    return self._tools[name]

  async def execute(self, name: str, arguments: dict):
    tool = self.get(name)
    try:
      return await tool.execute(**arguments)
    except Exception as e:
      return {"error": str(e)}
