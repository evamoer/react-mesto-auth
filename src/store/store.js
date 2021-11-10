import { createStore, combineReducers } from "redux";
import { popupReducer } from "./popupReducer";
import { authReducer } from "./authReducer";

const rootReducer = combineReducers({
  popup: popupReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer);
