import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import NotFound from "./Components/NotFound/NotFound";
import Destination from "./Components/Destination/Destination";
import LogIn from "./Components/LogIn/LogIn";
import Contact from "./Components/Contact/Contact";
import Blog from "./Components/Blog/Blog";
import { createContext, useState } from "react";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

export const userInfoContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <userInfoContext.Provider
      value={[loggedInUser, setLoggedInUser]}
      className="app"
    >
      <Router>
        <Header />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <PrivateRoute path="/destination/:vehicleId">
            <Destination />
          </PrivateRoute>
          <PrivateRoute path="/destination">
            <Destination />
          </PrivateRoute>

          <Route path="/blog">
            <Blog />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </userInfoContext.Provider>
  );
}

export default App;
