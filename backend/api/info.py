from core.tango_data import TangoData
from fastapi import APIRouter

router = APIRouter(prefix="/info")


@router.get("/artist/{artist}")
async def artist_info(artist: str) -> dict[str, str]:
    data = TangoData()
    return data.get_artist_info(artist)
