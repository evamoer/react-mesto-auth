/**
 * Дефолтное состояние для cardReducer.
 */
const cardState = {};
const OPENED_CARD = "SELECTED_CARD";
const DELETED_CARD = "DELETED_CARD";

/**
 * Редьюсер для получения данных карточки для открытие полного изображения или удаление карточки.
 *
 * @param state - дефолтное состояние параметров cardState.
 * @param action - action, отправленный в cardReducer.
 */
export const cardReducer = (state = cardState, action) => {
  switch (action.type) {
    case OPENED_CARD:
      return { ...cardState, ...action.payload };
    case DELETED_CARD:
      return { ...cardState, _id: action.payload };
    default:
      return state;
  }
};

/**
 * Экспорт actions данного редьюсера для dispatch в App.js
 */
export const openedCardAction = (payload) => ({
  type: OPENED_CARD,
  payload: payload,
});
export const deletedCardAction = (payload) => ({
  type: DELETED_CARD,
  payload: payload,
});
