export const BASE_URL = "https://mesto.nomoreparties.co/v1/cohort-27";
export const headers = {
  authorization: "8db06075-d4ea-471e-8c36-db2b91e349e8",
  "Content-Type": "application/json",
};

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.statusText}`);
};

//GET запрос на текущие карточки с сервера
export const getCards = () => {
  return fetch(`${BASE_URL}/cards`, {
    headers: headers,
  }).then(checkResponse);
};

//GET запрос на данные пользователя
export const getUserData = () => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: headers,
  }).then(checkResponse);
};

//PATCH запрос на обновление данных пользователя
export const updateUserData = (inputValuesData) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({
      name: inputValuesData.name,
      about: inputValuesData.about,
    }),
  }).then(checkResponse);
};

//POST запрос на добавление новой карточки
export const addCard = (cardData) => {
  return fetch(`${BASE_URL}/cards`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  }).then(checkResponse);
};

//DELETE запрос на удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${BASE_URL}/cards/${cardId}`, {
    method: "DELETE",
    headers: headers,
  }).then(checkResponse);
};

//PUT и DELETE запрос на добавление/удаление лайка карточке
export const changeLikeCardStatus = (cardId, likeStatus) => {
  return fetch(`${BASE_URL}/cards/likes/${cardId}`, {
    method: likeStatus ? "DELETE" : "PUT",
    headers: headers,
  }).then(checkResponse);
};

//PATCH запрос на обновление аватара пользователя
export const updateAvatar = ({ avatar }) => {
  return fetch(`${BASE_URL}/users/me/avatar`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(checkResponse);
};
