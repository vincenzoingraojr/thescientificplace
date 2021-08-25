import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Authentication} />
          <Route exact path="/home" component={Home} />
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

function NoMatch() {
  return (
    <div>
      404. This page does not exist.
    </div>
  );
}

export default App;