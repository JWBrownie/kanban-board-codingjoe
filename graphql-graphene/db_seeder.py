import boto3

dynamodb = boto3.resource(
    'dynamodb', 
    region_name='us-east-1', 
    aws_access_key_id='DUMMYIDEXAMPLE', 
    aws_secret_access_key='DUMMYEXAMPLEKEY', 
 
    endpoint_url='http://localhost:8000'
)

def delete_table_if_exists(table_name):
    try:
        table = dynamodb.Table(table_name)
        table.delete()
        table.wait_until_not_exists()
        print(f'Table {table_name} deleted successfully.')
    except dynamodb.meta.client.exceptions.ResourceNotFoundException:
        print(f'Table {table_name} does not exist, skipping deletion.')

def create_tasks_table():
    
    delete_table_if_exists('Tasks')
       
    table = dynamodb.create_table(
        TableName='Tasks',
        KeySchema=[
            {
                'AttributeName': 'id',
                'KeyType': 'HASH'
            }
        ],
        AttributeDefinitions=[
            {
                'AttributeName': 'id',
                'AttributeType': 'S'
            }
        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 10,
            'WriteCapacityUnits': 10
        }
    )
    
    table.wait_until_exists()
    print('Tasks table created sucessfully.')


def create_states_table():
    
    delete_table_if_exists('States')
    
    table = dynamodb.create_table(
        TableName='States',
        KeySchema=[
            {
                'AttributeName': 'state',
                'KeyType': 'HASH'
            }
        ],
        AttributeDefinitions=[
            {
                'AttributeName': 'state',
                'AttributeType': 'S'
            }
        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 10,
            'WriteCapacityUnits': 10
        }
    )
    
    table.wait_until_exists()
    print("States table created successfully.")
    

def seed_database():
    
    table = dynamodb.Table('Tasks')

    tasks = [
        {'id': 'task-1', 'content': 'Design a 3D-printed scaffold for tissue engineering', 'state': 'To do'},
        {'id': 'task-2', 'content': 'Develop a microfluidic device for cell sorting', 'state': 'In progress'},
        {'id': 'task-3', 'content': 'Conduct CRISPR gene editing on bacterial cultures', 'state': 'In progress'},
        {'id': 'task-4', 'content': 'Optimize bioreactor conditions for stem cell growth', 'state': 'Done'},
        {'id': 'task-5', 'content': 'Analyze proteomics data for biomarker discovery', 'state': 'To do'},
        {'id': 'task-6', 'content': 'Analyze DNA sequence with BIOTROMETER', 'state': 'To do'},
    ]

    with table.batch_writer() as batch:
        for task in tasks:
            batch.put_item(Item=task)

    print("Tasks added")

        
if __name__ == '__main__':
    create_tasks_table()
    create_states_table()
    seed_database()
