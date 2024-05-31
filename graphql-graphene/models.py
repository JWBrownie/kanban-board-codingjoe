import boto3
from boto3.dynamodb.conditions import Attr

dynamodb = boto3.resource(
    'dynamodb', 
    region_name='us-east-1', 
    aws_access_key_id='DUMMYIDEXAMPLE', 
    aws_secret_access_key='DUMMYEXAMPLEKEY', 
    endpoint_url='http://localhost:8000'
)

def get_tasks():
    table = dynamodb.Table('Tasks')
    response = table.scan()
    return [{'id': item['id'], 'content': item.get('content', 'undefined'), 'state': item.get('state', 'undefined')} for item in response['Items']]

def get_tasks_by_state(state):
    table = dynamodb.Table('Tasks')
    response = table.scan(FilterExpression=Attr('state').eq(state))
    return [{'id': item['id'], 'content': item.get('content', 'undefined'), 'state': item.get('state', 'undefined')} for item in response['Items']]

def add_task(id, content, state):
    table = dynamodb.Table('Tasks')
    task = { 'id': id, 'content': content, 'state': state }
    table.put_item(Item=task)
    return task

def update_task_state(id, state):
    table = dynamodb.Table('Tasks')
    try:
        response = table.update_item(
            Key={'id': id },
            UpdateExpression='SET #s = :val1',
            ExpressionAttributeValues={':val1': state},
            ExpressionAttributeNames={ '#s': 'state'},
            ReturnValues='ALL_NEW'
        )
        print("Update succeeded:", response.get('Attributes'))
        return response.get('Attributes', None)
    except Exception as e:
        print("Update failed:", e)
        return None

