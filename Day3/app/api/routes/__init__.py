from .auth import router as auth_router
from .items import router as items_router

all_routers = [auth_router, items_router]
