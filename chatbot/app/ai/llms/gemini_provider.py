import asyncio
import uuid
from typing import Sequence

from app.ai.tools.base import BaseTool
from app.ai.tools.schemas import ToolCall
from app.core.settings import settings
from google import genai
from google.genai import types

from .base import BaseLLM
from .schemas import ChatMessage, LLMResponse


class GeminiLLM(BaseLLM):
  def __init__(self, model: str) -> None:
    self.client = genai.Client(api_key=settings.llm_api_key)
    self.model = model

  async def chat(
    self,
    messages: list[ChatMessage],
    tools: Sequence[BaseTool] | None = None,
  ) -> LLMResponse:
    system_instruction = self._build_system(messages)
    contents = self._build_contents(messages)
    config = self._build_config(system_instruction, tools)

    response = await asyncio.to_thread(
      self.client.models.generate_content,
      model=self.model,
      contents=contents,
      config=config,
    )

    return self._parse_response(response)

  def _build_system(self, messages: list[ChatMessage]) -> str | None:
    system_messages = [m.content for m in messages if m.role == "system"]
    if not system_messages:
      return None
    return "\n".join(system_messages)

  def _build_contents(self, messages: list[ChatMessage]) -> list[types.Content]:
    contents = []
    for m in messages:
      if m.role == "system":
        continue

      if m.role == "user":
        contents.append(
          types.Content(role="user", parts=[types.Part.from_text(text=m.content)])
        )

      elif m.role == "assistant":
        if m.tool_calls:
          parts = []
          for tc in m.tool_calls:
            part = types.Part.from_function_call(name=tc.name, args=tc.arguments)
            if tc.raw is not None:
              part.thought_signature = tc.raw
            parts.append(part)
        else:
          parts = [types.Part.from_text(text=m.content)]
        contents.append(types.Content(role="model", parts=parts))

      elif m.role == "tool":
        contents.append(
          types.Content(
            role="user",
            parts=[
              types.Part.from_function_response(
                name=m.tool_name or "",
                response={"result": m.content},
              )
            ],
          )
        )

    return contents

  def _build_tools(self, tools: Sequence[BaseTool] | None) -> list[types.Tool] | None:
    if not tools:
      return None

    function_declarations = []
    for tool in tools:
      properties = {
        param.name: types.Schema(
          type=param.type.upper(),
          description=param.description,
        )
        for param in tool.parameters
      }
      required = [p.name for p in tool.parameters if p.required] or None

      function_declarations.append(
        types.FunctionDeclaration(
          name=tool.name,
          description=tool.description,
          parameters=types.Schema(
            type="OBJECT",
            properties=properties,
            required=required,
          ),
        )
      )

    return [types.Tool(function_declarations=function_declarations)]

  def _build_config(
    self,
    system_instruction: str | None,
    tools: Sequence[BaseTool] | None,
  ) -> types.GenerateContentConfig:
    return types.GenerateContentConfig(
      system_instruction=system_instruction,
      tools=self._build_tools(tools),
    )

  def _parse_response(self, response: types.GenerateContentResponse) -> LLMResponse:
    tool_calls: list[ToolCall] = []
    text_parts: list[str] = []

    candidate = response.candidates[0]
    for part in candidate.content.parts:  # type: ignore
      if part.function_call is not None:
        tool_calls.append(
          ToolCall(
            id=str(uuid.uuid4()),
            name=part.function_call.name,  # type: ignore
            arguments=dict(part.function_call.args or {}),
            raw=getattr(part, "thought_signature", None),
          )
        )
      elif part.text:
        text_parts.append(part.text)

    return LLMResponse(
      content="\n".join(text_parts) if text_parts else None,
      model=self.model,
      tool_calls=tool_calls,
    )
