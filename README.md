# Kanban Board with GraphQL Backend

Author: José Moisés Villalobos Delgado
Email: joe@codingjoe.com

This project sets up a Kanban Board application with a GraphQL backend using Docker. Follow the instructions below to get started.

## Prerequisites

- Docker
- Docker Compose

## Setup

1. **Build and run the Docker containers:**

    ```sh
    docker-compose up --build
    ```

2. **Seed the database:**

    After the containers are up and running, seed the database with initial data.

    ```sh
    docker exec -it graphql-server-1 python db_seeder.py
    ```

3. **Access the applications:**

    - The React frontend should be available at:

      ```
      http://localhost:3000
      ```

    - The GraphQL server should be available at:

      ```
      http://localhost:5000/graphql
      ```

## GraphQL Queries and Mutations

### Fetch Tasks

```graphql
query getTasks {
  tasks {
    id
    content
    state
  }
}
```

## Update Task State
```graphql
mutation updateTaskState($id: ID!, $state: String!) {
  updateTaskState(id: $id, state: $state) {
    task {
      id
      content
      state
    }
  }
}
```

## Create Task
```graphql
mutation createTask($taskData: TaskInput!) {
  createTask(taskData: $taskData) {
    task {
      id
      content
      state
    }
  }
}
```

## Troubleshooting

If you encounter issues with building or running the Docker containers, try clearing Docker's cache:

```bash
docker compose build --no-cache
```

## License
This project is licensed under the MIT License. See the LICENSE file for details.
