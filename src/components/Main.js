import React from "react";
import Profile from "./Profile";
import Gallery from "./Gallery";

/**
 * Main - основной компонент App. Содержит в себе компоненты Profile и Gallery.
 *
 * @prop onOpenPopup - пропс с функция-обработки данных, вводимых пользователем в форму, при логине.
 * @prop onImageCard - пропс с функцией обработки клика на изображение карточки.
 * @prop cards - пропс с массивом всех карточек (после запроса к api).
 * @prop onCardLike - пропс с функцией обработки клика на кнопку лайка карточки.
 * @prop onCardDelete - пропс с функцией обработчки клика на кнопку удаления карточки.
 */
export default function Main({
  onOpenPopup,
  onImageCard,
  cards,
  onCardLike,
  onCardDelete,
}) {
  return (
    <main className="content section page__content">
      <Profile onOpenPopup={onOpenPopup} />
      <Gallery
        onImageCard={onImageCard}
        cards={cards}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
      />
    </main>
  );
}
