import asyncio

import httpx
from ai.services.menu import MenuService


async def main() -> None:
  async with httpx.AsyncClient() as client:
    service = MenuService(client)

    categories = await service.get_categories()
    print("Categories:", categories)

    products = await service.get_products()
    print("Products:", products)


if __name__ == "__main__":
  asyncio.run(main())
