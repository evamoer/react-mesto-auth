/**
 * Дефолтное состояние для loadingReducer.
 */
const loadingState = {
  isLoading: false,
};
const LOADING = "LOADING";
const LOADED = "LOADED";

/**
 * Редьюсер для статуса загрузки данных на сервер.
 *
 * @param state - дефолтное состояние параметров loadingState.
 * @param action - action, отправленный в loadingReducer.
 */
export const loadingReducer = (state = loadingState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case LOADED:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

/**
 * Экспорт actions данного редьюсера для dispatch в App.js
 */
export const loadingDataAction = () => ({ type: LOADING });
export const loadedDataAction = () => ({ type: LOADED });
