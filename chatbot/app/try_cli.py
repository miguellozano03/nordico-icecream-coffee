import asyncio

import httpx
from ai.agents.memory import AgentMemory
from ai.agents.restaurant_agent import RestaurantAgent
from ai.llms.factory import get_llm
from ai.services.menu import MenuService
from ai.tools.menu import GetCategoriesTool, GetProductsTool
from ai.tools.registry import ToolRegistry


async def main() -> None:
  memory = AgentMemory()
  llm = await get_llm()

  async with httpx.AsyncClient() as client:
    menu_service = MenuService(client)
    tools = ToolRegistry([
      GetProductsTool(menu_service),
      GetCategoriesTool(menu_service),
    ])

    agent = RestaurantAgent(llm, memory, tools)

    print("🍽️ Restaurant Assistant")
    print("Type 'exit' or 'quit' to end the conversation.\n")

    while True:
      message = input("You: ").strip()
      if message.lower() in {"exit", "quit"}:
        print("Goodbye! 👋")
        break
      if not message:
        continue

      response = await agent.chat(message, "DEV_ID")
      print(f"\nAssistant: {response.content}\n")


if __name__ == "__main__":
  asyncio.run(main())
