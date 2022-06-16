from core.tango_data import TangoData
from fastapi import APIRouter

all_router = APIRouter(prefix="/all")


@all_router.get("/orquestras")
async def all_orquestras():
    data = TangoData()
    orquestras = data.all_orquestras()
    return orquestras


@all_router.get("/singers")
async def all_singers():
    data = TangoData()
    singers = data.all_singers()
    return singers
