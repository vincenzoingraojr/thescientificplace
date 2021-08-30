import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { setAccessToken } from "./accessToken";
import IsAuthenticated from "./components/routes/IsAuthenticated";
import IsNotAuthenticated from "./components/routes/IsNotAuthenticated";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import { Icon } from '@fluentui/react/lib/Icon';
import Profile from "./pages/Profile";

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/", {
      method: "POST",
      credentials: "include"
    }).then(async x => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      if (accessToken) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="preloader-container">
        <div className="preloader">
          <Icon iconName="FullCircleMask" />
        </div>
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Switch>
          <IsNotAuthenticated exact path="/" isAuth={isAuth} component={Authentication} />
          <IsAuthenticated exact path="/home" isAuth={isAuth} component={Home} />
          <Route exact path="/:username" render={(props) => <Profile {...props} />} />
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