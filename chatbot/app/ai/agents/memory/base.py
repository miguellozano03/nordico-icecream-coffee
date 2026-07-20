from abc import ABC, abstractmethod

from app.ai.llms.base import ChatMessage


class AbstractMemory(ABC):

  @abstractmethod
  def get(self, conversation_id: str) -> list[ChatMessage]:
    pass

  @abstractmethod
  def add(self, conversation_id: str, message: ChatMessage) -> None:
    pass

  @abstractmethod
  def clear(self, conversation_id: str) -> None:
    pass
