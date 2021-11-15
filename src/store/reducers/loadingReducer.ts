/**
 * Дефолтное состояние для loadingReducer.
 */
const loadingState: { isLoading: boolean } = {
  isLoading: false,
};

/**
 * Перечисление actions для loadingReducer.
 */
enum loadingActions {
  LOADING = "LOADING",
  LOADED = "LOADED"
}

/**
 * Редьюсер для статуса загрузки данных на сервер.
 *
 * @param state - дефолтное состояние параметров loadingState.
 * @param action - action, отправленный в loadingReducer.
 */
export const loadingReducer = (
  state: { isLoading: boolean } = loadingState,
  action: { type: string, payload: { isLoading: boolean } },
) => {
  switch (action.type) {
    case loadingActions.LOADING:
      return { ...state, isLoading: true };
    case loadingActions.LOADED:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

/**
 * Экспорт actions данного редьюсера для dispatch в App.js
 */
export const loadingDataAction = () => ({ type: loadingActions.LOADING });
export const loadedDataAction = () => ({ type: loadingActions.LOADED });
