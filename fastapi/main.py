from fastapi import FastAPI
from typing import List  # ネストされたBodyを定義するために必要
from starlette.middleware.cors import CORSMiddleware  # CORSを回避するために必要
# from db import session  # DBと接続するためのセッション
# from model import UserTable, User  # 今回使うモデルをインポート
from router.router import router

app = FastAPI()

origins = [
    "http://localhost:3000",
]

# CORSを回避するために設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------APIの実装------------

@app.get("/")
def read_root():
    return {"Hello": "World!!!!"}

# routing setting
app.include_router(router)