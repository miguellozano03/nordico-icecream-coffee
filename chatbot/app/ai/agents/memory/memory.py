from app.ai.llms.schemas import ChatMessage

from .base import AbstractMemory

type Conversations = dict[str, list[ChatMessage]]

class AgentMemory(AbstractMemory):

  def __init__(self) -> None:
    self._conversations: Conversations = {}

  def get(self, conversation_id: str) -> list[ChatMessage]:
    if conversation_id not in self._conversations:
      self._conversations[conversation_id] = []

    return self._conversations[conversation_id]

  def add(self, conversation_id: str, message: ChatMessage) -> None:
    self._conversations[conversation_id].append(message)

  def clear(self, conversation_id: str) -> None:
   self._conversations[conversation_id] = []
