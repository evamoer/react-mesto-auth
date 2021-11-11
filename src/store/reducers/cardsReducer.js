const cardsState = [];
const GET_CARDS = "GET_CARDS";
const ADD_CARD = "ADD_CARD";
const LIKE_CARD = "LIKE_CARD";
const DELETE_CARD = "DELETE_CARD";

export const cardsReducer = (state = cardsState, action) => {
  switch (action.type) {
    case GET_CARDS:
      return [...cardsState, ...action.payload];
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
