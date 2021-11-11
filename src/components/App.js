import React, { useState, useEffect, useCallback } from "react";
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
} from "../store/reducers/cardsReducer";
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
   * Параметр карточек галереи.
   */
  const cards = useSelector((state) => state.cards);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Функция открытия попапа. Дополнительно устанавливается слушатель на клик по клавише Esc.
   *
   * @param payload - тип попапа
   */

  const openPopup = (popupType) => {
    dispatch(openPopupAction({ payload: popupType }));
    document.addEventListener("keydown", handleEscClick);
  };

  /**
   * Функция закрытия попапа. Дополнительно удаляется слушатель на клик по клавише Esc.
   */
  const closePopup = (evt) => {
    //если клик не по оверлэю, то не закрываем попап
    if (evt && evt.target !== evt.currentTarget) {
      return;
    }
    dispatch(closePopupAction());
    setDeletedCard(null);
    document.removeEventListener("keydown", handleEscClick);
  };

  /**
   * Обработчик нажатия на клавишу Escape.
   */
  const handleEscClick = useCallback((evt) => {
    if (evt.key === "Escape") {
      closePopup();
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
        openPopup("infoTooltip");
      })
      .catch((error) => {
        dispatch(unregisterAction());
        openPopup("infoTooltip");
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
  const approveDeletePlace = () => {
    closePopup();
    if (deletedCard !== null) {
      api
        .deleteCard(deletedCard._id)
        .then(dispatch(deleteCardAction(deletedCard._id)))
        .then(() => closePopup())
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  };

  /**
   * Обработчик нажатия клика по кнопке удаления карточки.
   *
   * @param cardId - id карточки, выбранной для удаления.
   */
  const handleCardDeleteButtonClick = (cardId) => {
    openPopup("deletePlacePopup");
    setDeletedCard({
      ...deletedCard,
      _id: cardId,
    });
  };

  /**
   * Обработчик нажатия на сабмит формы добавления новой карточки.
   *
   * @param inputValuesData - данные новой карточки для добавления в галерею, введенные в форму пользователем..
   */
  const handleAddPlaceSubmit = (inputValuesData) => {
    setIsLoading(true);
    api
      .addCard(inputValuesData)
      .then((newCard) => dispatch(addCardAction(newCard)))
      .then(() => closePopup())
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
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
    setIsLoading(true);
    api
      .updateUserData(inputValuesData)
      .then((data) => dispatch(updateProfileAction(data)))
      .then(() => closePopup())
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  };

  /**
   * Обработчик нажатия на кнопку удаления карточки.
   *
   * @param inputValuesData - новые данные аватара (ссылка на изображение), введенные в форму пользователем.
   */
  const handleUpdateAvatar = (inputValuesData) => {
    setIsLoading(true);
    api
      .updateAvatar(inputValuesData)
      .then((data) => dispatch(updateAvatarAction(data)))
      .then(() => closePopup())
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  };

  /**
   * Обработчик нажатия на изображение карточки.
   * По клику открывается попап с полным изображением.
   *
   * @param card - объект с данными карточки (название name, ссылка link)
   */
  const handleCardClick = (card) => {
    setSelectedCard({
      ...selectedCard,
      name: card.name,
      link: card.link,
    });
    openPopup("imagePopup");
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
          onOpenPopup={openPopup}
          onImageCard={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDeleteButtonClick}
        />
        {isLoggedIn && <Footer />}
      </Switch>
      <EditProfilePopup
        onClose={closePopup}
        onUpdateUser={handleUpdateUser}
        submitButtonText={!isLoading ? "Сохранить" : "Сохранение..."}
      />
      <EditAvatarPopup
        onClose={closePopup}
        onUpdateAvatar={handleUpdateAvatar}
        submitButtonText={!isLoading ? "Сохранить" : "Сохранение..."}
      />
      <AddPlacePopup
        onClose={closePopup}
        onAddPlace={handleAddPlaceSubmit}
        submitButtonText={!isLoading ? "Создать" : "Сохранение..."}
      />
      <DeletePlacePopup
        onClose={closePopup}
        onApproveDeletePlace={approveDeletePlace}
      />
      <ImagePopup card={selectedCard} onClose={closePopup} />
      <InfoTooltip onClose={closePopup} />
    </>
  );
};

export default App;
