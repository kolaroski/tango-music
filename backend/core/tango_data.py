from datetime import datetime
from typing import Optional

import pandas
from fuzzywuzzy import fuzz

from core.config import Config


class _Columns:
    ORQUESTRA = "Orquestra"
    DATE = "Date"
    TITLE = "Title"
    SINGER = "Singer"
    STYLE = "Style"
    COMPOSER = "Composer"
    AUTHOR = "Author"


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
                isinstance(self.data.index, pandas.DatetimeIndex) is True,
                "The index must be datetime",
            )
        # Sort by the index
        self.data.sort_index(inplace=True)
        all_columns = list(self.data.columns)
        self.data = self.data[all_columns].astype(str)

    def get_pandas_dataframe(self) -> pandas.DataFrame:
        return self.data

    def all_orquestras(self) -> list[str]:
        orquestras = set(self.data[_Columns.ORQUESTRA].values)
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
        singers = set(self.data[_Columns.SINGER].values)
        if " " in singers:
            singers.remove(" ")
        if "nan" in singers:
            singers.remove("nan")
        return sorted(list(singers))

    def all_styles(self) -> list[str]:
        return sorted(list(set(self.data[_Columns.STYLE].values)))

    @staticmethod
    def filter_by_date(
        data: pandas.DataFrame, start_date: datetime.date, end_date: datetime.date
    ) -> pandas.DataFrame:
        return data.loc[start_date:end_date]

    @staticmethod
    def filter_by_orquestra(
        data: pandas.DataFrame, orquestra_name: str
    ) -> pandas.DataFrame:
        orquestras = data[_Columns.ORQUESTRA]
        orquestras_selected = set()
        for val in orquestras:
            if fuzz.ratio(val, orquestra_name) > 0.9:
                orquestras_selected.add(orquestras)
        return data[data[_Columns.ORQUESTRA].isin(orquestras_selected)]

    @staticmethod
    def filter_by_singer(data: pandas.DataFrame, singer: str) -> pandas.DataFrame:
        singers = data[_Columns.SINGER]
        singers_selected = set()
        for val in singers:
            if fuzz.ratio(val, singer) > 0.9:
                singers_selected.add(singers)
        return data[data[_Columns.SINGER].isin(singers_selected)]

    @staticmethod
    def filter_by_style(data: pandas.DataFrame, style: str) -> pandas.DataFrame:
        capitalized_style = style.capitalize()
        return data[data[_Columns.STYLE] == capitalized_style]
