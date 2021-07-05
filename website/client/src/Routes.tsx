import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Authentication } from "./pages/Authentication";
import { Home } from "./pages/Home";

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Authentication} />
          <Route exact path="/home" component={Home} />
        </Switch>
    </BrowserRouter>
  );
};