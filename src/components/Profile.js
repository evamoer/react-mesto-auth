import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Profile({ onOpenPopup }) {
  const { avatar, name, about } = useContext(CurrentUserContext);

  const openEditProfilePopup = () => {
    onOpenPopup({ payload: "editProfilePopup" });
  };

  const openEditAvatarPopup = () => {
    onOpenPopup({ payload: "editAvatarPopup" });
  };

  const openAddPlacePopup = () => {
    onOpenPopup({ payload: "addPlacePopup" });
  };

  return (
    <section className="profile content__profile">
      <div className="profile__avatar-container" onClick={openEditAvatarPopup}>
        <img src={avatar} alt="Аватар профиля" className="profile__avatar" />
      </div>
      <div className="profile__info">
        <h1 className="profile__name">{name}</h1>
        <button
          className="button button_type_edit-profile"
          onClick={openEditProfilePopup}
          type="button"
          aria-label="Редактировать профиль"
        ></button>
        <p className="profile__about">{about}</p>
      </div>
      <button
        className="button button_type_add-place"
        onClick={openAddPlacePopup}
        type="button"
        aria-label="Добавить место"
      ></button>
    </section>
  );
}
