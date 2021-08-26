import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { setAccessToken } from "./accessToken";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/", {
      method: "POST",
      credentials: "include"
    }).then(async x => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }
  
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