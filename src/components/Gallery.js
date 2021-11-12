import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

/**
 * Gallery - компонент галереи.
 *
 * @prop onImageCard - обработчик клика на изображение карточки.
 * @prop onCardLike - обработчик клика на кнопку лайка карточки.
 * @prop onCardDelete - обработчик клика на кнопку удаления карточки.
 */
export default function Gallery({ onImageCard, onCardLike, onCardDelete }) {
  /**
   * Параметр карточек галереи.
   */
  const cards = useSelector((state) => state.cards);

  return (
    <section className="gallery content__gallery">
      <ul className="gallery-table">
        {cards.map(({ _id, name, link, likes, owner }) => (
          <Card
            key={_id}
            name={name}
            link={link}
            likes={likes}
            owner={owner}
            _id={_id}
            onCardClick={onImageCard}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </ul>
    </section>
  );
}
