from core.tango_data import TangoData
from fastapi import APIRouter

from api.parameters import TangoConfig

filter_router = APIRouter(prefix="/filter")


@filter_router.get("/config")
async def filter_by_config(config: TangoConfig) -> dict[str, list[str]]:
    data = TangoData()
    orquestras = config.get_orquestras(data)
    singers = config.get_singers(data)
    styles = config.get_styles(data)
    min_date, max_date = config.get_decades_min_max(data)
    return orquestras
