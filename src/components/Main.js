import React from "react";
import Profile from "./Profile";
import Gallery from "./Gallery";

/**
 * Main - основной компонент App. Содержит в себе компоненты Profile и Gallery.
 *
 * @prop onOpenPopup - обработчик данных, вводимых пользователем в форму, при логине.
 * @prop onImageCard - обработчик клика на изображение карточки.
 * @prop onCardLike - обработчик клика на кнопку лайка карточки.
 * @prop onCardDelete - обработчик клика на кнопку удаления карточки.
 */
export default function Main({
  onOpenPopup,
  onImageCard,
  onCardLike,
  onCardDelete,
}) {
  return (
    <main className="content section page__content">
      <Profile onOpenPopup={onOpenPopup} />
      <Gallery
        onImageCard={onImageCard}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
      />
    </main>
  );
}
