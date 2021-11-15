import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

/**
 * ProtectedRoute - компонент с защищенным роутом.
 * Определяет залогинен ли пользователь, перенаправляя на нужный компонент или адрес.
 *
 * @prop Component - компонент, на который происходит перенаправление при логине пользователя.
 * @prop props - все остальные пропсы этого компонента
 */
export default function ProtectedRoute({ component: Component, ...props }) {
  /**
   * Параметр статуса логина пользователя.
   */
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <Route exact path={props.path}>
      {isLoggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />}
    </Route>
  );
}
