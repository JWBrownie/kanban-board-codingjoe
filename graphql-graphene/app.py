import graphene
from starlette.applications import Starlette
from starlette_graphene3 import GraphQLApp, make_graphiql_handler
from starlette.middleware.cors import CORSMiddleware
from schema import schema

app = Starlette()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)


app.mount("/", GraphQLApp(schema, on_get=make_graphiql_handler()))

