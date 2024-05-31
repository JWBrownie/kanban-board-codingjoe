import { gql } from '@apollo/client';

export const GET_TASKS = gql`
query GetTasks {
   tasks {
      id
      content
      state
   }
}
`;

export const UPDATE_TASK_STATE = gql`
    mutation updateTaskState($id: ID!, $state: String!) {
        updateTaskState(id: $id, state: $state) {
            task {
               id
               state
            }
        }
    }
`;