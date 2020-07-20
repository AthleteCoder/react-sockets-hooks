import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );

  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default PrivateRoute;
