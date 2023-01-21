import json
import boto3

# from check import check_author

tableName = "scrapper"

# create the DynamoDB resource
dynamodb = boto3.resource('dynamodb').Table(tableName)


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
            # scrap_response = check_author(name)
            msg = "MOCK"
    else:
        msg = "Error. Provide a name"
    result = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": str(msg),
        "isBase64Encoded": False
    }
    return result
