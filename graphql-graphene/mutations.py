import graphene
from models import add_task, update_task_state
from queries import Task

class TaskInput(graphene.InputObjectType):
    id = graphene.ID()
    content = graphene.String()
    state = graphene.String()

class CreateTask(graphene.Mutation):
    class Arguments:
        task_data = TaskInput(required=True)
    
    task = graphene.Field(Task)

    def mutate(self, info, task_data):
        task = add_task(task_data.id, task_data.content, task_data.state)
        return CreateTask(task=task)

class UpdateTaskState(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        state = graphene.String(required=True)    
    
    task = graphene.Field(Task)
    
    def mutate(self, info, id, state):
        task = update_task_state(id, state)
        return UpdateTaskState(task=task)

class Mutation(graphene.ObjectType):
    create_task = CreateTask.Field()
    update_task_state = UpdateTaskState.Field()