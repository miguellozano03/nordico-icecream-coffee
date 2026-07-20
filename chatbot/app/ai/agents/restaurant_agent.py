import json

from app.ai.llms.base import BaseLLM
from app.ai.llms.schemas import ChatMessage, LLMResponse
from app.ai.prompts.load_prompts import RESTAURANT_SYSTEM
from app.ai.tools.registry import ToolRegistry

from .memory import AbstractMemory

MAX_TOOL_ITERATIONS = 3


class RestaurantAgent:
  def __init__(self, llm: BaseLLM, memory: AbstractMemory, tools: ToolRegistry) -> None:
    self.llm = llm
    self._memory = memory
    self.tools = tools

  async def chat(self, message: str, conversation_id: str) -> LLMResponse:
    conversation = self._memory.get(conversation_id)
    user_message = ChatMessage(role="user", content=message)

    messages = [
      ChatMessage(role="system", content=RESTAURANT_SYSTEM),
      *conversation,
      user_message,
    ]

    response = await self._run_with_tools(messages)

    self._memory.add(conversation_id, user_message)
    self._memory.add(conversation_id, ChatMessage(role="assistant", content=response.content or ""))

    return response

  async def _run_with_tools(self, messages: list[ChatMessage]) -> LLMResponse:
    for _ in range(MAX_TOOL_ITERATIONS):
      response = await self.llm.chat(messages, self.tools.all())

      if not response.tool_calls:
        return response

      messages.append(
        ChatMessage(
          role="assistant",
          content=response.content or "",
          tool_calls=response.tool_calls,
        )
      )

      for call in response.tool_calls:
        result = await self.tools.execute(call.name, call.arguments)
        messages.append(
          ChatMessage(
            role="tool",
            content=json.dumps(result, default=str),
            tool_call_id=call.id,
            tool_name=call.name,
          )
        )

    return await self.llm.chat(messages, tools=None)
