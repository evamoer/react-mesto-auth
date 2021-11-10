//дефолтное состояние для authReducer
const authState = {
  isRegistered: false,
  isLoggedIn: false,
  userEmail: "",
};
const login = "login";
const logout = "logout";
const registered = "registered";
const unregistered = "unregistered";

//reducer для авторизации, управляет состояниями
//при isLoggedIn: true - пользователь залогинен, при false - разлогинен
//при isRegistered: true - пользователь зарегистрирован, при false - незарегистрирован
export const authReducer = (state = authState, action) => {
  switch (action.type) {
    case login:
      return {
        ...state,
        isLoggedIn: true,
        userEmail: action.payload,
      };
    case logout:
      return { ...state, isLoggedIn: false, userEmail: "" };
    case registered:
      return { ...state, isLoggedIn: false, isRegistered: true };
    case unregistered:
      return { ...state, isLoggedIn: false, isRegistered: false };
    default:
      return state;
  }
};

//экспорт actions для dispatch в App.js
export const loginAction = (payload) => ({ type: login, payload: payload });
export const logoutAction = () => ({ type: logout });
export const registerAction = () => ({ type: registered });
export const unregisterAction = () => ({ type: unregistered });
