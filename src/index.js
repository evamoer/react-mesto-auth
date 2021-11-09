import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import { Provider } from "react-redux";

const popupState = {
  editProfilePopupState: false,
  editAvatarPopupState: false,
  addPlacePopupState: false,
  deletePlacePopupState: false,
  imagePopupState: false,
  infoTooltipState: false,
};

const reducer = (state = popupState, action) => {
  switch (action.type) {
    case "open":
      switch (action.preload) {
        case "editProfilePopup":
          return { ...state, editProfilePopupState: true };
        case "editAvatarPopup":
          return { ...state, editAvatarPopupState: true };
        case "addPlacePopup":
          return { ...state, addPlacePopupState: true };
        case "deletePlacePopup":
          return { ...state, deletePlacePopupState: true };
        case "imagePopup":
          return { ...state, imagePopupState: true };
        case "infoTooltip":
          return { ...state, infoTooltipState: true };
      }
    case "close":
      return {
        ...state,
        editProfilePopupState: false,
        editAvatarPopupState: false,
        addPlacePopupState: false,
        deletePlacePopupState: false,
        imagePopupState: false,
        infoTooltipState: false,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
