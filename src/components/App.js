import React, { useState, useEffect, useCallback } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import * as api from "../utils/api";
import * as apiAuth from "../utils/apiAuth";
import { useDispatch, useSelector } from "react-redux";

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
  const dispatch = useDispatch();
  const {
    editProfilePopupState,
    editAvatarPopupState,
    addPlacePopupState,
    deletePlacePopupState,
    imagePopupState,
    infoTooltipState,
  } = useSelector((popupState) => popupState);

  const openPopup = (popupType) => {
    dispatch({ type: "open", preload: popupType });
    document.addEventListener("keydown", handleEscClick);
    document.addEventListener("mousedown", handleOverlayClick);
  };
  const closePopup = () => {
    dispatch({ type: "close" });
    setDeletedCard(null);
    document.removeEventListener("keydown", handleEscClick);
    document.removeEventListener("mousedown", handleOverlayClick);
  };
  //функция закрытия попапа по нажатию на Esc
  const handleEscClick = useCallback((evt) => {
    if (evt.key === "Escape") {
      closePopup();
    }
  }, []);

  const handleOverlayClick = useCallback((evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup();
    }
  }, []);

  //переменные для регистрации и авторизации пользователя
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  //переменные для функционала галереи
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

  //функция регистрации пользователя
  const handleRegister = (password, email) => {
    apiAuth
      .register(password, email)
      .then(() => {
        setIsRegistered(true);
        openPopup("infoTooltip");
      })
      .catch((error) => {
        setIsRegistered(false);
        openPopup("infoTooltip");
        handleError(error);
      });
  };

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
          const { data } = user;
          const { email } = data;
          setUserEmail(email);
          setIsLoggedIn(true);
          history.push("/");
        })
        .catch(handleError);
    }
  };

  //обработка ошибок при выполнении запросов
  const handleError = (error) => {
    console.log(error);
  };

  //функция логина пользователя
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

  //функция выхода из аккаунта текущего пользователя
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserEmail("");
    setIsLoggedIn(false);
    history.push("/sign-in");
  };

  //запрос всех карточек с сервера, обновление стейта с карточками,
  //обработчики лайка и удаления карточки
  useEffect(() => {
    api
      .getCards()
      .then((cardsData) => setCards(cardsData))
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  const handleCardLike = (likes, cardId) => {
    const isLiked = likes.some((user) => user._id === currentUser._id);
    api
      .changeLikeCardStatus(cardId, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === cardId ? newCard : c)));
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  const approveDeletePlace = () => {
    closePopup();
    if (deletedCard !== null) {
      api
        .deleteCard(deletedCard._id)
        .then(
          setCards((state) => state.filter((c) => c._id !== deletedCard._id))
        )
        .then(() => closePopup())
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  };

  const handleCardDeleteButtonClick = (cardId) => {
    openPopup("deletePlacePopup");
    setDeletedCard({
      ...deletedCard,
      _id: cardId,
    });
  };

  const handleAddPlaceSubmit = (inputValuesData) => {
    setIsLoading(true);
    api
      .addCard(inputValuesData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => closePopup())
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  };

  //запрос данных текущего пользователя,
  //обработчики обновления данных пользователя и его аватара
  useEffect(() => {
    api
      .getUserData()
      .then((user) => setCurrentUser(user))
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  const handleUpdateUser = (inputValuesData) => {
    setIsLoading(true);
    api
      .updateUserData(inputValuesData)
      .then((data) =>
        setCurrentUser({ ...currentUser, name: data.name, about: data.about })
      )
      .then(() => closePopup())
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  };

  const handleUpdateAvatar = (inputValuesData) => {
    setIsLoading(true);
    api
      .updateAvatar(inputValuesData)
      .then((data) => setCurrentUser({ ...currentUser, avatar: data.avatar }))
      .then(() => closePopup())
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  };

  const handleCardClick = (card) => {
    setSelectedCard({
      ...selectedCard,
      name: card.name,
      link: card.link,
    });
    openPopup("imagePopup");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        onLogout={handleLogout}
      />
      <Switch>
        <Route exact path="/sign-in">
          <Login onLogin={handleLogin} />
        </Route>
        <Route exact path="/sign-up">
          <Register onRegister={handleRegister} />
        </Route>
        <ProtectedRoute
          path="/"
          isLoggedIn={isLoggedIn}
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
        isOpen={editProfilePopupState}
        onClose={closePopup}
        onUpdateUser={handleUpdateUser}
        submitButtonText={!isLoading ? "Сохранить" : "Сохранение..."}
      />
      <EditAvatarPopup
        isOpen={editAvatarPopupState}
        onClose={closePopup}
        onUpdateAvatar={handleUpdateAvatar}
        submitButtonText={!isLoading ? "Сохранить" : "Сохранение..."}
      />
      <AddPlacePopup
        isOpen={addPlacePopupState}
        onClose={closePopup}
        onAddPlace={handleAddPlaceSubmit}
        submitButtonText={!isLoading ? "Создать" : "Сохранение..."}
      />
      <DeletePlacePopup
        isOpen={deletePlacePopupState}
        onClose={closePopup}
        onApproveDeletePlace={approveDeletePlace}
      />
      <ImagePopup
        card={selectedCard}
        isOpen={imagePopupState}
        onClose={closePopup}
      />
      <InfoTooltip
        isOpen={infoTooltipState}
        onClose={closePopup}
        isRegistered={isRegistered}
      />
    </CurrentUserContext.Provider>
  );
};

export default App;
