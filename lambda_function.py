from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from fastapi import FastAPI
from mangum import Mangum
import json
import os


class Document(BaseModel):
    text: str
    count: int




app = FastAPI()
lambda_handler = Mangum(app)


@app.get("/")
async def welcome():
    return {"Message": "Welcome"}

@app.post("/add_document")
async def add_document(document: Document):
    json_text = jsonable_encoder(document)
    return {"Message": f"Succesfully added new document! -  {json_text}"}