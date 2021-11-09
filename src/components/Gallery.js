import React from "react";
import Card from "./Card";

/**
 * Gallery - компонент галереи.
 *
 * @prop onImageCard - пропс с функцией обработки клика на изображение карточки.
 * @prop cards - пропс с массивом всех карточек (после запроса к api).
 * @prop onCardLike - пропс с функцией обработки клика на кнопку лайка карточки.
 * @prop onCardDelete - пропс с функцией обработчки клика на кнопку удаления карточки.
 */
export default function Gallery({
  onImageCard,
  cards,
  onCardLike,
  onCardDelete,
}) {
  return (
    <section className="gallery content__gallery">
      <ul className="gallery-table">
        {cards.map((card) => (
          <Card
            key={card._id}
            name={card.name}
            link={card.link}
            likes={card.likes}
            owner={card.owner}
            _id={card._id}
            onCardClick={onImageCard}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </ul>
    </section>
  );
}
