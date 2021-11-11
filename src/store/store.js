import { createStore, combineReducers } from "redux";
import { popupReducer } from "./reducers/popupReducer";
import { authReducer } from "./reducers/authReducer";
import { userReducer } from "./reducers/userReducer";
import { cardsReducer } from "./reducers/cardsReducer";

/**
 * Корневой редьюсер, выключающий в себя все редьюсеры приложения.
 */
const rootReducer = combineReducers({
  popup: popupReducer,
  auth: authReducer,
  user: userReducer,
  cards: cardsReducer,
});

/**
 * Store данного приложения.
 */
export const store = createStore(rootReducer);
