from core.tango_data import TangoData
from fastapi import APIRouter

from api.parameters import ArtistInfo

router = APIRouter(prefix="/info")


@router.get("/artist/{artist}")
async def artist_info(artist: str) -> ArtistInfo:
    data = TangoData()
    return data.get_artist_info(artist)
