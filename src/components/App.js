import React, { useEffect, useCallback } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import * as api from "../utils/api";
import * as apiAuth from "../utils/apiAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  openPopupAction,
  closePopupAction,
} from "../store/reducers/popupReducer";
import {
  loginAction,
  logoutAction,
  registerAction,
  unregisterAction,
} from "../store/reducers/authReducer";
import {
  getUserAction,
  updateProfileAction,
  updateAvatarAction,
} from "../store/reducers/userReducer";
import {
  getCardsAction,
  addCardAction,
  likeCardAction,
  deleteCardAction,
} from "../store/reducers/galleryReducer";
import {
  openedCardAction,
  deletedCardAction,
} from "../store/reducers/cardReducer";
import {
  loadingDataAction,
  loadedDataAction,
} from "../store/reducers/loadingReducer";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

/**
 * App - главный компонент приложения.
 * Включает в себя все компоненты и логику работу приложения.
 */

const App = () => {
  /**
   * Хук для подключения dispatch.
   */
  const dispatch = useDispatch();

  /**
   * Хук для определения history.
   */
  const history = useHistory();

  /**
   * Параметр статуса логина пользователя
   */
  const { isLoggedIn } = useSelector((state) => state.auth);

  /**
   * Параметр с текущим пользователем.
   */
  const currentUser = useSelector((state) => state.user);

  /**
   * Параметр карточки: opened - для полного изображения карточки, deleted - для удаляемой карточки.
   */
  const card = useSelector((state) => state.card);

  /**
   * Функция открытия попапа. Дополнительно устанавливается слушатель на клик по клавише Esc.
   *
   * @param popupType - тип попапа
   */

  const onOpenPopup = (popupType) => {
    dispatch(openPopupAction({ payload: popupType }));
    document.addEventListener("keydown", handleEscClick);
  };

  /**
   * Функция закрытия попапа. Дополнительно удаляется слушатель на клик по клавише Esc.
   */
  const onClosePopup = (evt) => {
    //если клик не по оверлэю, то не закрываем попап
    if (evt && evt.target !== evt.currentTarget) {
      return;
    }
    dispatch(closePopupAction());
    document.removeEventListener("keydown", handleEscClick);
  };

  /**
   * Обработчик нажатия на клавишу Escape.
   */
  const handleEscClick = useCallback((evt) => {
    if (evt.key === "Escape") {
      onClosePopup();
    }
  }, []);

  /**
   * Обработчик регистрации пользователя: отправляет запрос на api с параметрами password, email.
   *
   * @param password - пароль, вводимый пользователем
   * @param email - email, вводимый пользователя
   */
  const handleRegister = (password, email) => {
    apiAuth
      .register(password, email)
      .then(() => {
        dispatch(registerAction());
        onOpenPopup("infoTooltip");
      })
      .catch((error) => {
        dispatch(unregisterAction());
        onOpenPopup("infoTooltip");
        handleError(error);
      });
  };

  /**
   * Хук для проверки наличия токена пользователя в LocalStorage при открытии сайта.
   */
  useEffect(() => {
    checkUserToken();
  }, []);

  /**
   * Проверка токена в localStorage. При его наличии, устанавливаем, что пользователь залогинен,
   * и перенаправляем на "/".
   */
  const checkUserToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      apiAuth
        .isTokenValid(token)
        .then((user) => {
          const { data } = user;
          const { email } = data;
          dispatch(loginAction(email));
          history.push("/");
        })
        .catch(handleError);
    }
  };

  /**
   * Обработчик ошибок, возникающих при запросах.
   */
  const handleError = (error) => {
    console.log(error);
  };

  /**
   * Обработчик логина пользователя: отправляет запрос на api с параметрами password, email.
   *
   * @param password - пароль, вводимый пользователем
   * @param email - email, вводимый пользователя
   */
  const handleLogin = (password, email) => {
    apiAuth
      .authorize(password, email)
      .then((data) => {
        if (data) {
          const { token } = data;
          localStorage.setItem("token", token);
          checkUserToken();
        }
      })
      .catch(handleError);
  };

  /**
   * Обработчик разлогинивания пользователя из аккаунта: удаление token из LocalStorage.
   */
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutAction());
    history.push("/sign-in");
  };

  /**
   * Хук с запросом на api всех карточек с сервера, обновления стета с карточками.
   */
  useEffect(() => {
    api
      .getCards()
      .then((cardsData) => dispatch(getCardsAction(cardsData)))
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  /**
   * Обработчик нажатия на кнопку лайка карточки.
   *
   * @param likes - массив с пользователями, лайкнувшими карточку.
   * @param cardId - id карточки, выбранной для установки лайка.
   */
  const handleCardLike = (likes, cardId) => {
    const isLiked = likes.some((user) => user._id === currentUser._id);
    api
      .changeLikeCardStatus(cardId, isLiked)
      .then((newCard) => {
        dispatch(likeCardAction({ cardId: cardId, newCard: newCard }));
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  /**
   * Функция подтверждения удаления карточки.
   */
  const onApproveDeletePlace = () => {
    onClosePopup();
    if (card._id) {
      api
        .deleteCard(card._id)
        .then(dispatch(deleteCardAction(card._id)))
        .then(() => onClosePopup())
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  };

  /**
   * Обработчик нажатия клика по кнопке удаления карточки.
   *
   * @param cardId - id карточки, выбранной для удаления.
   */
  const handleCardDeleteButtonClick = (cardId) => {
    onOpenPopup("deletePlacePopup");
    dispatch(deletedCardAction(cardId));
  };

  /**
   * Обработчик нажатия на сабмит формы добавления новой карточки.
   *
   * @param inputValuesData - данные новой карточки для добавления в галерею, введенные в форму пользователем..
   */
  const handleAddPlaceSubmit = (inputValuesData) => {
    dispatch(loadingDataAction());
    api
      .addCard(inputValuesData)
      .then((newCard) => dispatch(addCardAction(newCard)))
      .then(() => onClosePopup())
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => dispatch(loadedDataAction()));
  };

  /**
   * Хук с запросом на api данных текущего пользователя.
   */
  useEffect(() => {
    api
      .getUserData()
      .then((user) => dispatch(getUserAction(user)))
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  /**
   * Обработчик нажатия на кнопку удаления карточки.
   *
   * @param inputValuesData - новые данные профиля, введенные в форму пользователем.
   */
  const handleUpdateUser = (inputValuesData) => {
    dispatch(loadingDataAction());
    api
      .updateUserData(inputValuesData)
      .then((data) => dispatch(updateProfileAction(data)))
      .then(() => onClosePopup())
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => dispatch(loadedDataAction()));
  };

  /**
   * Обработчик нажатия на кнопку удаления карточки.
   *
   * @param inputValuesData - новые данные аватара (ссылка на изображение), введенные в форму пользователем.
   */
  const handleUpdateAvatar = (inputValuesData) => {
    dispatch(loadingDataAction());
    api
      .updateAvatar(inputValuesData)
      .then((data) => dispatch(updateAvatarAction(data)))
      .then(() => onClosePopup())
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => dispatch(loadedDataAction()));
  };

  /**
   * Обработчик нажатия на изображение карточки.
   * По клику открывается попап с полным изображением.
   *
   * @param card - объект с данными карточки (название name, ссылка link)
   */
  const handleCardClick = (card) => {
    dispatch(openedCardAction(card));
    onOpenPopup("imagePopup");
  };

  return (
    <>
      <Header onLogout={handleLogout} />
      <Switch>
        <Route exact path="/sign-in">
          <Login onLogin={handleLogin} />
        </Route>
        <Route exact path="/sign-up">
          <Register onRegister={handleRegister} />
        </Route>
        <ProtectedRoute
          path="/"
          component={Main}
          onOpenPopup={onOpenPopup}
          onImageCard={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDeleteButtonClick}
        />
        {isLoggedIn && <Footer />}
      </Switch>
      <EditProfilePopup
        onClose={onClosePopup}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        onClose={onClosePopup}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup onClose={onClosePopup} onAddPlace={handleAddPlaceSubmit} />
      <DeletePlacePopup
        onClose={onClosePopup}
        onApproveDeletePlace={onApproveDeletePlace}
      />
      <ImagePopup onClose={onClosePopup} />
      <InfoTooltip onClose={onClosePopup} />
    </>
  );
};

export default App;
