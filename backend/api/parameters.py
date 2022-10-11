from pydantic import BaseModel


class ArtistInfo(BaseModel):
    real_name: str
    nickname: str
    category: str
    dates: str
    place_of_birth: str
    biography_link: str
