import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { userInfoContext } from "../../App";

const PrivateRoute = ({ children, ...rest }) => {
  const [loggedInUser, setLoggedInUser] = useContext(userInfoContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedInUser.name || loggedInUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
