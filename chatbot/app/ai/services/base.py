from abc import ABC, abstractmethod


class BaseMenuService(ABC):

  @abstractmethod
  async def get_categories(self) -> list[dict]:
    pass

  @abstractmethod
  async def get_products(self, category_name: str | None = None, search: str | None = None):
    pass
