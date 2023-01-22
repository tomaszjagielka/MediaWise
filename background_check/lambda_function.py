import json
import boto3
import googlesearch
import wikipedia
import requests
from bs4 import BeautifulSoup
import re

tableName = "scrapper"

# create the DynamoDB resource
dynamodb = boto3.resource('dynamodb').Table(tableName)


def search_wiki_in_google(query: str):
    gs = googlesearch.search(f"{query}")
    url = ""
    for i in gs:
        if 'wikipedia.org/wiki/' in i:
            url = i
            break
    return url


def get_page_id(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    script_content = soup.select_one("head > script:nth-of-type(1)").decode_contents()
    page_id = re.search(r".*wgArticleId..([0-9]+).*", script_content).group(1)
    return page_id


def get_page(page_id: int):
    page = wikipedia.page(pageid=page_id)
    return page.summary


def lambda_handler(event, context):
    body = json.loads(event['body'])
    name = body['name'].upper()
    if name:
        response = dynamodb.get_item(
            Key={'name': name}
        )
        if "Item" in response:
            msg = response['Item']
        else:
            url = search_wiki_in_google(name)
            if url:
                page_id = get_page_id(url)
                msg = get_page(page_id)
            else:
                msg = "Error. No wiki page"
    else:
        msg = "Error. Provide a name"
    result = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        "body": str(msg),
        "isBase64Encoded": False,
    }
    return result
