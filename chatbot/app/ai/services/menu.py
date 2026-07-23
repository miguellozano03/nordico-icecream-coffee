import httpx
from app.core.settings import settings

from .base import BaseMenuService


class MenuService(BaseMenuService):

  def __init__(self, client: httpx.AsyncClient) -> None:
    self.client = client

  async def get_categories(self) -> list[dict]:
    """
    Get all products categories from the restaurant menu.
    Use this when the user asks what types of products are available.
    """
    response = await self.client.get(settings.categories_endpoint)
    response.raise_for_status()

    data = response.json()

    return data


  async def get_products(self, category_name: str | None = None, search: str | None = None):
    """
    Get restaurants products.
    User category_name to filter by a product by category.
    Use search to find a specific product.
    """

    params = {}

    if category_name:
      params["category"] = category_name
    if search:
      params["search"] = search

    response = await self.client.get(settings.menu_endpoint, params=params)
    response.raise_for_status()

    data = response.json()

    return data["data"]
