import { ApolloProvider } from '@apollo/client';
import './App.css';
import KanbanBoard from './components/KanbanBoard/kanban-board.component';
import client from './graphql/apollo-client';

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <KanbanBoard />
      </ApolloProvider>
    </div>
  );
}

export default App;
