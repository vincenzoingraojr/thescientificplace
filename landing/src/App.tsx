import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from "./pages/404";
import Home from "./pages/Home";
import Response from "./pages/Response";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/response" component={Response} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
