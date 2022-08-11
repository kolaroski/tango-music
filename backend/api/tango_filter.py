import time
from typing import Union

from core.config import Columns
from core.tango_data import TangoData
from fastapi import APIRouter

filter_router = APIRouter(prefix="/filter")


@filter_router.get("/search/{text}")
async def filter_by_search(
    text: str,
) -> dict[str, Union[list[str], list[dict[str, str]]]]:
    data = TangoData()
    orchestras = data.filter_by_orquestra(text)
    singers = data.filter_by_singer(text)
    titles = data.filter_by_title(text)
    result = {
        Columns.ORCHESTRA: orchestras,
        Columns.SINGER: singers,
        Columns.TITLE: titles,
    }
    additional_track_data = data.filter_by_config(
        [Columns.ORCHESTRA, Columns.SINGER, Columns.TITLE], result
    )
    result[Columns.TITLE] = additional_track_data.to_dict("records")
    return result
