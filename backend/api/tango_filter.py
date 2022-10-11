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


@filter_router.get("/{orchestra_id}/singers")
async def fetch_singers_from_orchestra(orchestra_id: str) -> list[str]:
    data = TangoData()
    orchestras = data.filter_by_orquestra(orchestra_id)
    orchestras_data = data.filter_by_config(
        filter_columns=[Columns.ORCHESTRA],
        filter_values={Columns.ORCHESTRA: orchestras},
    )
    return sorted(list(set(orchestras_data["Singer"].values)))


@filter_router.get("/{singer_id}/orchestras")
async def fetch_orchestras_from_singers(singer_id: str) -> list[str]:
    data = TangoData()
    singers = data.filter_by_singer(singer_id)
    singers_data = data.filter_by_config(
        filter_columns=[Columns.SINGER],
        filter_values={Columns.SINGER: singers},
    )
    return sorted(list(set(singers_data["Orchestra"].values)))
