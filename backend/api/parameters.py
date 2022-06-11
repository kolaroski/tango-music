from datetime import datetime
from typing import Optional
import pydantic

from core.tango_data import TangoData
from dateutil.parser import parse


class TangoConfig(pydantic.BaseModel):
    orquestras: Optional[list[str]] = None
    singers: Optional[list[str]] = None
    decades: Optional[list[str]] = None
    styles: Optional[list[str]] = None
    
    def get_orquestras(self, data: TangoData) -> list[str]:
        if self.orquestras is None:
            return data.all_orquestras()

        return self.orquestras
    
    def get_singers(self, data: TangoData) -> list[str]:
        if self.orquestras is None:
            return data.all_singers()

        return self.orquestras
    
    def get_decades_min_max(self, data: TangoData) -> tuple[datetime, datetime]:
        if self.decades is None:
            return data.min_max_date()
        dates: list[datetime] = [parse(x) for x in self.decades]
        sorted_dates = sorted(dates)
        return sorted_dates[0], sorted_dates[-1]
    
    def get_styles(self, data: TangoData) -> list[str]:
        if self.styles is None:
            return data.all_styles()

        return self.styles
    