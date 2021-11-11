/**
 * Дефолтное состояние для galleryReducer.
 */
const galleryState = [];
const GET_CARDS = "GET_CARDS";
const ADD_CARD = "ADD_CARD";
const LIKE_CARD = "LIKE_CARD";
const DELETE_CARD = "DELETE_CARD";

/**
 * Редьюсер для взаимодействия с галереей: загрузка всех карточек, добавление новой карточки,
 * лайк карточки, удаление карточки.
 *
 * @param state - дефолтное состояние параметров galleryState.
 * @param action - action, отправленный в galleryReducer.
 */
export const galleryReducer = (state = galleryState, action) => {
  switch (action.type) {
    case GET_CARDS:
      return [...galleryState, ...action.payload];
    case ADD_CARD:
      return [action.payload, ...state];
    case LIKE_CARD:
      return [
        ...state.map((card) =>
          card._id === action.payload.cardId ? action.payload.newCard : card
        ),
      ];

    case DELETE_CARD:
      return [...state.filter((card) => card._id !== action.payload)];
    default:
      return state;
  }
};

/**
 * Экспорт actions данного редьюсера для dispatch в App.js
 */
export const getCardsAction = (payload) => ({
  type: GET_CARDS,
  payload: payload,
});

export const addCardAction = (payload) => ({
  type: ADD_CARD,
  payload: payload,
});

export const likeCardAction = (payload) => ({
  type: LIKE_CARD,
  payload: payload,
});

export const deleteCardAction = (payload) => ({
  type: DELETE_CARD,
  payload: payload,
});
