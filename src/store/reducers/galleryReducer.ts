import { ICard } from './cardReducer';

/**
 * Дефолтное состояние для galleryReducer.
 */
const galleryState: ICard[] = [];

/**
 * Перечисление actions для galleryReducer.
 */
enum galleryActions {
  GET_CARDS = "GET_CARDS",
  ADD_CARD = "ADD_CARD",
  LIKE_CARD = "LIKE_CARD",
  DELETE_CARD = "DELETE_CARD"
};

/**
 * Редьюсер для взаимодействия с галереей: загрузка всех карточек, добавление новой карточки,
 * лайк карточки, удаление карточки.
 *
 * @param state - дефолтное состояние параметров galleryState.
 * @param action - action, отправленный в galleryReducer.
 */
export const galleryReducer = (state: Array<any> = galleryState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case galleryActions.GET_CARDS:
      return [...galleryState, ...action.payload];
    case galleryActions.ADD_CARD:
      return [action.payload, ...state];
    case galleryActions.LIKE_CARD:
      return [
        ...state.map((card) =>
          card._id === action.payload.cardId ? action.payload.newCard : card
        ),
      ];
    case galleryActions.DELETE_CARD:
      return [...state.filter((card) => card._id !== action.payload)];
    default:
      return state;
  }
};

/**
 * Экспорт actions данного редьюсера для dispatch в App.js
 */
export const getCardsAction = (payload: Array<any>) => ({
  type: galleryActions.GET_CARDS,
  payload: payload,
});

export const addCardAction = (payload: any) => ({
  type: galleryActions.ADD_CARD,
  payload: payload,
});

export const likeCardAction = (payload: any) => ({
  type: galleryActions.LIKE_CARD,
  payload: payload,
});

export const deleteCardAction = (payload: any) => ({
  type: galleryActions.DELETE_CARD,
  payload: payload,
});
