//дефолтное состояние для authReducer
const authState = {
  isRegistered: false,
  isLoggedIn: false,
  userEmail: "",
};

//reducer для авторизации, управляет состояниями
//при isLoggedIn: true - пользователь залогинен, при false - разлогинен
//при isRegistered: true - пользователь зарегистрирован, при false - незарегистрирован
export const authReducer = (state = authState, action) => {
  switch (action.type) {
    case "login":
      return {
        ...authState,
        isLoggedIn: true,
        userEmail: authState.userEmail + action.payload,
      };
    case "logout":
      return { ...authState, isLoggedIn: false, userEmail: "" };
    case "registered":
      return { ...authState, isRegistered: true };
    case "unregistered":
      return { ...authState, isRegistered: false };
    default:
      return authState;
  }
};
