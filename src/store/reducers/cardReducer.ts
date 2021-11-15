import { IUser, userState } from './userReducer';

/**
 * Интерфейс для дефолтного состояния cardReducer..
 */
export interface ICard {
  _id: string,
  name: string,
  link: string,
  createdAt: string,
  likes: IUser[],
  owner: IUser,
}

/**
 * Дефолтное состояние для cardReducer.
 */
const cardState: ICard = {
  _id: '',
  name: '',
  link: '',
  createdAt: '',
  likes: [],
  owner: userState,
};

/**
 * Перечисление actions для cardReducer.
 */
enum cardActions {
  OPENED_CARD = "OPENED_CARD",
  DELETED_CARD = "DELETED_CARD"
}

/**
 * Редьюсер для получения данных карточки для открытие полного изображения или удаление карточки.
 *
 * @param state - дефолтное состояние параметров cardState.
 * @param action - action, отправленный в cardReducer.
 */
export const cardReducer = (
  state: { _id: string, name: string, link: string } = cardState,
  action: {
    type: string, payload: { _id: string, name: string, link: string }
  }
) => {
  switch (action.type) {
    case cardActions.OPENED_CARD:
      return { ...cardState, ...action.payload };
    case cardActions.DELETED_CARD:
      return { ...cardState, _id: action.payload };
    default:
      return state;
  }
};

/**
 * Экспорт actions данного редьюсера для dispatch в App.js
 */
export const openedCardAction = (payload: { name: string, link: string }) => ({
  type: cardActions.OPENED_CARD,
  payload: payload,
});
export const deletedCardAction = (payload: string) => ({
  type: cardActions.DELETED_CARD,
  payload: payload,
});
