import React from "react";
import { useSelector } from "react-redux";

/**
 * Card - компонент карточки в галерее.
 *
 * @prop name - пропс с названием карточки.
 * @prop link - пропс с ссылкой на изображение карточки.
 * @prop likes - пропс с массивом пользователей, лайкнувших карточку.
 * @prop owner - пропс с массивом данных пользователя, загрузившего карточку.
 * @prop _id - пропс с id карточки.
 * @prop onCardClick - пропс с функцией обработки клика на изображение карточки.
 * @prop onCardLike - пропс с функцией обработки клика на кнопку лайка карточки.
 * @prop onCardDelete - пропс с функцией обработчки клика на кнопку удаления карточки.
 */
export default function Card({
  name,
  link,
  likes,
  owner,
  _id,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useSelector((state) => state.user);
  const isOwn = owner._id === currentUser._id;
  const isLiked = likes.some((user) => user._id === currentUser._id);

  const handleClick = () => {
    onCardClick({ name: name, link: link });
  };

  const handleLikeClick = () => {
    onCardLike(likes, _id);
  };

  const handleDeleteClick = () => {
    onCardDelete(_id);
  };

  return (
    <li className="gallery-table__item">
      {isOwn && (
        <button
          className={"button card__delete-button"}
          onClick={handleDeleteClick}
        ></button>
      )}
      <article className="card">
        <div className="card__image-container" onClick={handleClick}>
          <img src={link} alt={name} className="card__image" />
        </div>
        <div className="card__info">
          <h2 className="card__title">{name}</h2>
          <div className="card__like-area">
            <button
              className={`button card__like-button ${
                isLiked && "card__like-button_active"
              }`}
              onClick={handleLikeClick}
              type="button"
              aria-label="Поставить лайк"
            ></button>
            <span className="card__like-number">{likes.length}</span>
          </div>
        </div>
      </article>
    </li>
  );
}
