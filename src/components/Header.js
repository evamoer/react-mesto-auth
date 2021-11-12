import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logoPath from "../images/logo.svg";

/**
 * Header - компонент хэдера.
 *
 * @prop onLogout - обработчик клика на кнопку Выйти.
 */
export default function Header({ onLogout }) {
  /**
   * Хук для определения текущего URL.
   */
  const location = useLocation();

  /**
   * Параметр с текущим URL.
   */
  const currentLocation = location.pathname;

  /**
   * Параметры статуса логина пользователя и его email.
   */
  const { isLoggedIn, userEmail } = useSelector((state) => state.auth);

  return (
    <header className="header page__header">
      <img src={logoPath} alt="Лого Mesto Russia" className="header__logo" />
      <div className="header__navigation">
        {isLoggedIn && currentLocation === "/" && (
          <>
            <p className="header__user-email">{userEmail}</p>
            <Link
              to="sign-up"
              className="header__link header__link_type_logout"
              onClick={onLogout}
            >
              Выйти
            </Link>
          </>
        )}
        {!isLoggedIn && currentLocation === "/sign-up" && (
          <Link to="sign-in" className="header__link">
            Войти
          </Link>
        )}
        {!isLoggedIn && currentLocation === "/sign-in" && (
          <Link to="sign-up" className="header__link">
            Регистрация
          </Link>
        )}
      </div>
    </header>
  );
}
