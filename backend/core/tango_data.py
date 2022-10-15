import json
from datetime import datetime
from typing import Optional

import numpy
import pandas
from api.parameters import ArtistInfo
from fuzzywuzzy import fuzz

from core.config import Columns, Config


class TangoData:
    def __init__(self, data: Optional[pandas.DataFrame] = None) -> None:
        # If Data is None jsuit load it from the default path
        if data is None:
            self.data = pandas.read_csv(
                Config.PATH,
                date_parser=lambda date: datetime.strptime(date, "%Y-%m-%d").date(),
                index_col=0,
            )
        else:
            self.data = data
            assert (
                isinstance(self.data.index, pandas.DatetimeIndex) is True
            ), "The index must be datetime"
        # Sort by the index
        self.data.sort_index(inplace=True)
        all_columns = list(self.data.columns)
        self.data = self.data[all_columns].astype(str)
        self.data[Columns.DATE] = [
            x.date() for x in pandas.to_datetime(self.data.index)
        ]
        with open(Config.OVERVIEW_PATH, "rt") as rf:
            self.info: dict[str, str] = json.load(rf)

    def get_pandas_dataframe(self) -> pandas.DataFrame:
        return self.data

    def all_orquestras(self) -> list[str]:
        orquestras = set(self.data[Columns.ORCHESTRA].values)
        if " " in orquestras:
            orquestras.remove(" ")
        if "nan" in orquestras:
            orquestras.remove("nan")
        return sorted(list(orquestras))

    def min_max_date(self) -> tuple[datetime, datetime]:
        min_date = self.data.index[0].to_pydatetime()
        max_date = self.data.index[-1].to_pydatetime()
        return min_date, max_date

    def all_singers(self) -> list[str]:
        singers = set(self.data[Columns.SINGER].values)
        if " " in singers:
            singers.remove(" ")
        if "nan" in singers:
            singers.remove("nan")
        return sorted(list(singers))

    def all_styles(self) -> list[str]:
        return sorted(list(set(self.data[Columns.STYLE].values)))

    def filter_by_date(
        self, start_date: datetime.date, end_date: datetime.date
    ) -> pandas.DataFrame:
        return self.data.loc[start_date:end_date]

    def filter_by_search(self, search_term: str, search_column: str):
        sorted_search_term: str = " ".join(sorted(search_term.split(" ")))
        search_data = self.data[search_column].values
        data_selected = set()
        for val in search_data:
            sorted_val = " ".join(sorted(val.split(" ")))
            if (
                fuzz.ratio(sorted_val.lower(), sorted_search_term.lower()) > 70
                or sorted_search_term.lower() in sorted_val.lower()
            ):
                data_selected.add(val)
        return list(data_selected)

    def filter_by_orquestra(self, orquestra_name: str) -> pandas.DataFrame:
        return self.filter_by_search(orquestra_name, Columns.ORCHESTRA)

    def filter_by_singer(self, singer: str) -> pandas.DataFrame:
        return self.filter_by_search(singer, Columns.SINGER)

    def filter_by_title(self, title: str) -> pandas.DataFrame:
        return self.filter_by_search(title, Columns.TITLE)

    def _filter_rows_by_idx(self, filter_column: str, filter_values: list[str]):
        return numpy.where(self.data[filter_column].isin(filter_values))

    def filter_by_config(
        self, filter_columns: str, filter_values: dict[str, list[str]]
    ):
        idxs = set()
        for column in filter_columns:
            column_values = filter_values[column]
            column_rows_idxs = self._filter_rows_by_idx(
                column, filter_values=column_values
            )[0]
            idxs.update(column_rows_idxs)

        return self.data.iloc[sorted(list(idxs)), :]

    def get_artist_info(self, artist: str) -> ArtistInfo:
        data_selected = []
        for val in self.info.keys():
            fuzz_ratio = fuzz.ratio(val.lower(), artist.lower())
            if fuzz_ratio > 80:
                data_selected.append((val, fuzz_ratio))

        if len(data_selected) > 0:
            data_selected = sorted(data_selected, key=lambda x: x[1])
            return ArtistInfo(**self.info[data_selected[-1][0]])
        else:
            return {}

    def filter_by_style(self, style: str) -> pandas.DataFrame:
        capitalized_style = style.capitalize()
        return self.data[self.data[Columns.STYLE] == capitalized_style]
