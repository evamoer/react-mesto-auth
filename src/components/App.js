import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import * as apiAuth from "../utils/apiAuth";

//импорт компонентов
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

const App = () => {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    cohort: "",
    _id: "",
  });
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInputErrors, setIsInputErrors] = useState(null);

  //запрос всех карточек с сервера, обновление стейта с карточками,
  //обработчики лайка и удаления карточки
  useEffect(() => {
    api
      .getCards()
      .then((cardsData) => setCards(cardsData))
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  function handleCardLike(likes, cardId) {
    const isLiked = likes.some((user) => user._id === currentUser._id);
    api
      .changeLikeCardStatus(cardId, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === cardId ? newCard : c)));
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function approveDeletePlace() {
    setIsDeletePlacePopupOpen(false);
    if (deletedCard !== null) {
      api
        .deleteCard(deletedCard._id)
        .then(
          setCards((state) => state.filter((c) => c._id !== deletedCard._id))
        )
        .then(() => closeAllPopups())
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  }

  function handleCardDeleteButtonClick(cardId) {
    setIsDeletePlacePopupOpen(true);
    setEscClickListener();
    setDeletedCard({
      ...deletedCard,
      _id: cardId,
    });
  }

  function handleAddPlaceSubmit(inputValuesData) {
    setIsLoading(true);
    api
      .addCard(inputValuesData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  }

  //запрос данных текущего пользователя,
  //обработчики обновления данных пользователя и его аватара
  useEffect(() => {
    api
      .getUserData()
      .then((user) => setCurrentUser(user))
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  function handleUpdateUser(inputValuesData) {
    setIsLoading(true);
    api
      .updateUserData(inputValuesData)
      .then((data) =>
        setCurrentUser({ ...currentUser, name: data.name, about: data.about })
      )
      .then(() => closeAllPopups())
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(inputValuesData) {
    setIsLoading(true);
    api
      .updateAvatar(inputValuesData)
      .then((data) => setCurrentUser({ ...currentUser, avatar: data.avatar }))
      .then(() => closeAllPopups())
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  }

  //функция для валидации форм попапов
  function enableValidation(inputElement) {
    setIsInputErrors({
      ...isInputErrors,
      [inputElement.name]: inputElement.validationMessage,
    });
  }

  // меняем состояние кнопки сабмита: если инпуты не тронуты - сохраняем предыдущее состояние
  // если тронуты, но не все, то сравниваем с предыдущим состоянием и наличием ошибок
  // если тронуты все, то выявляем ошибки
  function toggleSubmitButtonState(isSubmitButtonDisabled, inputValues) {
    const hasAllInputsData =
      isInputErrors !== null &&
      Object.values(isInputErrors).length === Object.values(inputValues).length;
    const hasErrors =
      isInputErrors !== null &&
      Object.values(isInputErrors).some((value) => value !== "");

    if (isInputErrors === null) {
      return isSubmitButtonDisabled;
    }
    if (hasAllInputsData) {
      return hasErrors;
    }
    return isSubmitButtonDisabled || hasErrors;
  }

  //функции открытия попапов
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEscClickListener();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEscClickListener();
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEscClickListener();
  }

  function handleCardClick(card) {
    setSelectedCard({
      ...selectedCard,
      name: card.name,
      link: card.link,
    });
    setIsImagePopupOpen(true);
    setEscClickListener();
  }

  //функции слушателей закрытия попапов
  function setEscClickListener() {
    document.addEventListener("keydown", handleEscClick);
  }

  function handleEscClick(evt) {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  }

  //функция закрытия попапов
  function closeAllPopups(evt) {
    if (evt && evt.target !== evt.currentTarget) {
      return;
    }
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setDeletedCard(null);
    setIsInputErrors(null);
    document.removeEventListener("keydown", handleEscClick);
  }

  //функция регистрации пользователя
  function handleRegister(password, email) {
    apiAuth
      .register(password, email)
      .then(() => {
        setIsRegistered(true);
        setIsInfoTooltipOpen(true);
      })
      .catch((error) => {
        setIsRegistered(false);
        setIsInfoTooltipOpen(true);
        handleError(error);
      });
  }

  //переход в галерею, если пользователь залогинен
  useEffect(
    (isLoggedIn) => {
      history.push("/");
    },
    [isLoggedIn]
  );

  //проверка при открытии сайта: залогинен ли текущий пользователь
  useEffect(() => {
    checkUserToken();
  }, []);

  //проверка токена в localStorage: если да, то устанавливаем, что пользователь залогинен
  const checkUserToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      apiAuth
        .isTokenValid(token)
        .then((user) => {
          const { userdata } = user;
          const { email } = userdata;
          setUserEmail(email);
          setIsLoggedIn(true);
        })
        .catch(handleError);
    }
  };

  //обработка ошибок при выполнении запросов
  const handleError = (error) => {
    console.log(`Ошибка: ${error}`);
  };

  //функция логина пользователя
  function handleLogin(password, email) {
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
  }

  //функция выхода из аккаунта текущего пользователя
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserEmail("");
    setIsLoggedIn(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        onLogout={handleLogout}
      />
      <Switch>
        <Route exact path="/sign-up">
          <Register onRegister={handleRegister} />
        </Route>
        <Route exact path="/sign-in">
          <Login onLogin={handleLogin} />
        </Route>
        <ProtectedRoute
          path="/"
          isLoggedIn={isLoggedIn}
          component={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onImageCard={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDeleteButtonClick}
        />
        {isLoggedIn && <Footer />}
      </Switch>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        enableValidation={enableValidation}
        isInputErrors={isInputErrors}
        toggleSubmitButtonState={toggleSubmitButtonState}
        submitButtonText={!isLoading ? "Сохранить" : "Сохранение..."}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        enableValidation={enableValidation}
        isInputErrors={isInputErrors}
        toggleSubmitButtonState={toggleSubmitButtonState}
        submitButtonText={!isLoading ? "Сохранить" : "Сохранение..."}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        enableValidation={enableValidation}
        isInputErrors={isInputErrors}
        toggleSubmitButtonState={toggleSubmitButtonState}
        submitButtonText={!isLoading ? "Создать" : "Сохранение..."}
      />
      <DeletePlacePopup
        isOpen={isDeletePlacePopupOpen}
        onClose={closeAllPopups}
        onApproveDeletePlace={approveDeletePlace}
      />
      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isRegistered={isRegistered}
      />
    </CurrentUserContext.Provider>
  );
};

export default App;
