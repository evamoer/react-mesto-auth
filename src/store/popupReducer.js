//дефолтное состояние для popupReducer
const popupState = {
  editProfilePopupState: false,
  editAvatarPopupState: false,
  addPlacePopupState: false,
  deletePlacePopupState: false,
  imagePopupState: false,
  infoTooltipState: false,
};

//reducer для всех попапов, управляет состояниями попапов,
//при true - попап открыт, при false - попап закрыт
export const popupReducer = (state = popupState, action) => {
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
