/**
 * Дефолтное состояние для popupReducer.
 */
const popupState = {
  editProfilePopupState: false,
  editAvatarPopupState: false,
  addPlacePopupState: false,
  deletePlacePopupState: false,
  imagePopupState: false,
  infoTooltipState: false,
};
const OPEN = "OPEN";
const CLOSE = "CLOSE";

/**
 * Функция-редьюсер для состояний попапов.
 *
 * @param state - дефолтное состояние всех попапов (true - попап открыт, false - попап закрыт).
 * @param action - action, отправленный в popupReducer.
 */
export const popupReducer = (state = popupState, action) => {
  switch (action.type) {
    case OPEN:
      return { ...state, [`${action.payload}State`]: true };
    case CLOSE:
      return {
        popupState,
      };
    default:
      return state;
  }
};

/**
 * Экспорт actions данного редьюсера для dispatch в App.js
 */
export const openPopupAction = ({ payload }) => ({
  type: OPEN,
  payload: payload,
});
export const closePopupAction = () => ({ type: CLOSE });
