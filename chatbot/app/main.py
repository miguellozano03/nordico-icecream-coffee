from contextlib import asynccontextmanager

import httpx
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel

from app.ai.agents.memory import AgentMemory
from app.ai.agents.restaurant_agent import RestaurantAgent
from app.ai.llms.factory import get_llm
from app.ai.services.menu import MenuService
from app.ai.tools.menu import GetCategoriesTool, GetProductsTool
from app.ai.tools.registry import ToolRegistry


@asynccontextmanager
async def lifespan(app: FastAPI):
  http_client = httpx.AsyncClient()
  menu_service = MenuService(http_client)
  tools = ToolRegistry([
    GetProductsTool(menu_service), GetCategoriesTool(menu_service)
  ])
  llm = await get_llm()
  memory = AgentMemory()

  app.state.agent = RestaurantAgent(llm, memory, tools)

  yield

  await http_client.aclose()


app = FastAPI(lifespan=lifespan)

class ChatRequest(BaseModel):
  message: str
  conversation_id: str


class ChatResponse(BaseModel):
  content: str


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
  agent: RestaurantAgent = app.state.agent
  try:
    response = await agent.chat(request.message, request.conversation_id)
  except Exception:
    raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Your message couldn't be processed. Try again later")

  return ChatResponse(content=response.content or "")
