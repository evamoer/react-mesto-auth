/**
 * Интерфейс для дефолтного состояния authReducer.
 */
export interface IAuth {
  isRegistered: boolean,
  isLoggedIn: boolean,
  userEmail: string
}

/**
 * Дефолтное состояние для authReducer.
 */
const authState: IAuth = {
  isRegistered: false,
  isLoggedIn: false,
  userEmail: "",
};

/**
 * Перечисление actions для authReducer.
 */
enum authActions {
  LOG_IN = "LOG_IN",
  LOG_OUT = "LOG_OUT",
  REGISTERED = "REGISTERED",
  UNREGISTERED = "UNREGISTERED"
};

/**
 * Редьюсер для авторизации пользователя
 *
 * @param state - дефолтное состояние параметров isRegistered, isLoggedIn, userEmail.
 * @param action - action, отправленный в authReducer.
 */
export const authReducer = (state: { isRegistered: boolean, isLoggedIn: boolean, userEmail: string } = authState, action: { type: string, payload: string }) => {
  switch (action.type) {
    case authActions.LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        userEmail: action.payload,
      };
    case authActions.LOG_OUT:
      return { ...state, isLoggedIn: false, userEmail: "" };
    case authActions.REGISTERED:
      return { ...state, isLoggedIn: false, isRegistered: true };
    case authActions.UNREGISTERED:
      return { ...state, isLoggedIn: false, isRegistered: false };
    default:
      return state;
  }
};

/**
 * Экспорт actions данного редьюсера для dispatch в App.js
 */
export const loginAction = (payload: string) => ({ type: authActions.LOG_IN, payload: payload });
export const logoutAction = () => ({ type: authActions.LOG_OUT });
export const registerAction = () => ({ type: authActions.REGISTERED });
export const unregisterAction = () => ({ type: authActions.UNREGISTERED });
