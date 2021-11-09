//дефолтное состояние для popupReducer
const popupState = {
  editProfilePopupState: false,
  editAvatarPopupState: false,
  addPlacePopupState: false,
  deletePlacePopupState: false,
  imagePopupState: false,
  infoTooltipState: false,
};
const open = "open";
const close = "close";

//reducer для всех попапов, управляет состояниями попапов,
//при true - попап открыт, при false - попап закрыт
export const popupReducer = (state = popupState, action) => {
  switch (action.type) {
    case open:
      return { ...state, [`${action.payload}State`]: true };
    case close:
      return {
        popupState,
      };
    default:
      return state;
  }
};

//экспорт actions для dispatch в App.js
export const openPopupAction = (payload) => ({ type: open, payload: payload });
export const closePopupAction = () => ({ type: close });
