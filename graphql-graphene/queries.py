import graphene
from models import get_tasks, get_tasks_by_state

class Task(graphene.ObjectType):
    id = graphene.ID()
    content = graphene.String()
    state = graphene.String()


class Query(graphene.ObjectType):
    tasks = graphene.List(Task)
    tasks_by_state = graphene.List(Task, state=graphene.String(required=True))

    def resolve_tasks(self, info):
        return get_tasks()
    
    def resolve_tasks_by_state(self, info, state):
        return get_tasks_by_state(state)
    
