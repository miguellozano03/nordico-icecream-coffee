from pathlib import Path

BASE_DIR =Path(__file__).parent

RESTAURANT_CONTEXT = Path(BASE_DIR / "restaurant_context.txt").read_text(encoding="utf-8")
RESTAURANT_SYSTEM = Path(BASE_DIR / "restaurant_system.txt").read_text(encoding="utf-8")
