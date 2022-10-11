import uvicorn
from api.info import router as info_router
from api.tango_all import all_router
from api.tango_filter import filter_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(all_router)
app.include_router(filter_router)
app.include_router(info_router)

origins = [
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


if __name__ == "__main__":
    uvicorn.run("run.run_api:app", host="0.0.0.0", port=8000, reload=True)
