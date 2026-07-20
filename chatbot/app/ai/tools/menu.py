from typing import Any

from ai.services.menu import BaseMenuService
from ai.tools.base import BaseTool
from ai.tools.schemas import ToolParameter


class GetProductsTool(BaseTool):

  name = "get_products"

  description = (
    "Get restaurant products from the menu."
    "Use when the user asks about products."
    "Filter by category or search term."
  )

  parameters = [
    ToolParameter(name="category_name",type="string",description="Category name."),
    ToolParameter(name="search",type="string",description="Product name to search.")
  ]

  def __init__(self, menu_service: BaseMenuService) -> None:
    self.menu_service = menu_service


  async def execute(self,**kwargs: Any):
    category_name = kwargs.get("category_name")
    search = kwargs.get("search")

    return await self.menu_service.get_products(category_name,search)

class GetCategoriesTool(BaseTool):
  name = "get_categories"

  description = (
      "Get all available product categories from the restaurant menu. "
      "Use this when the user asks what types of products are available."
  )

  def __init__(self, menu_service: BaseMenuService) -> None:
    self.menu_service = menu_service

  async def execute(self, **kwargs: Any):
    return await self.menu_service.get_categories()
