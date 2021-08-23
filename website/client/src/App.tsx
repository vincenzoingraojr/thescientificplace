import { BrowserRouter, Route, Switch } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Authentication} />
          <Route exact path="/home" component={Home} />
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
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