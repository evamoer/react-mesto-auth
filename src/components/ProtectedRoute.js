import React from "react";
import { Route, Redirect } from "react-router-dom";

/**
 * ProtectedRoute - компонент с защищенным роутом.
 * Определяет залогинен ли пользователь, перенаправляя на нужный компонент или адрес.
 *
 * @prop Component - пропс с компонентом, на который происходит перенаправление при логине пользователя.
 * @prop props - все остальные пропсы этого компонента
 */
export default function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Route exact path={props.path}>
      {props.isLoggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />}
    </Route>
  );
}
