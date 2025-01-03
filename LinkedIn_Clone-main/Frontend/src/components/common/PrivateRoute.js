import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "./auth";

export default function({ component: COMPONENT, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        getToken() ? (
          <COMPONENT {...Object.assign(props, rest)} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
