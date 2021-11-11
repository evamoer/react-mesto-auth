import React from "react";
import { useSelector } from "react-redux";

/**
 * Profile - компонент профиля.
 *
 * @prop onOpenPopup - обработчик клика на кнопки открытия попапов.
 */
export default function Profile({ onOpenPopup }) {
  /**
   * Параметры текущего пользователя.
   */
  const { avatar, name, about } = useSelector((state) => state.user);

  /**
   * Обработчик клика на кнопку открытия попапа редактирования профиля.
   */
  const openEditProfilePopup = () => {
    onOpenPopup("editProfilePopup");
  };

  /**
   * Обработчик клика на кнопку открытия попапа изменения аватара.
   */
  const openEditAvatarPopup = () => {
    onOpenPopup("editAvatarPopup");
  };

  /**
   * Обработчик клика на кнопку открытия попапа добавления карточки.
   */
  const openAddPlacePopup = () => {
    onOpenPopup("addPlacePopup");
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
