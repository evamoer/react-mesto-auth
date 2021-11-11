/**
 * Дефолтное состояние для authReducer.
 */
const authState = {
  isRegistered: false,
  isLoggedIn: false,
  userEmail: "",
};
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const REGISTERED = "registered";
const UNREGISTERED = "unregistered";

/**
 * Редьюсер для авторизации пользователя
 *
 * @param state - дефолтное состояние параметров isRegistered, isLoggedIn, userEmail.
 * @param action - action, отправленный в authReducer.
 */
export const authReducer = (state = authState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        userEmail: action.payload,
      };
    case LOG_OUT:
      return { ...state, isLoggedIn: false, userEmail: "" };
    case REGISTERED:
      return { ...state, isLoggedIn: false, isRegistered: true };
    case UNREGISTERED:
      return { ...state, isLoggedIn: false, isRegistered: false };
    default:
      return state;
  }
};

/**
 * Экспорт actions данного редьюсера для dispatch в App.js
 */
export const loginAction = (payload) => ({ type: LOG_IN, payload: payload });
export const logoutAction = () => ({ type: LOG_OUT });
export const registerAction = () => ({ type: REGISTERED });
export const unregisterAction = () => ({ type: UNREGISTERED });
