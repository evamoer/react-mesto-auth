import React from "react";
import { useSelector } from "react-redux";
/**
 * ImagePopup - компонент попапа с полным изображением карточки.
 *
 * @prop onClose - функция закрытия попапа.
 */
export default function ImagePopup({ onClose }) {
  /**
   * Параметр состояния попапа: true - открыт, false - закрыт.
   */
  const { imagePopupState } = useSelector((state) => state.popup);

  /**
   * Параметр состояния карточки.
   */
  const card = useSelector((state) => state.card);

  return (
    <div
      className={`popup popup_type_full-image ${
        card.name && card.link && imagePopupState && "popup_opened"
      }`}
      onMouseDown={onClose}
    >
      <figure className="popup__container popup__container_type_full-image">
        <button
          className="button popup__button_type_close"
          onClick={onClose}
          type="button"
          aria-label="Закрыть всплывающее окно"
        ></button>
        <img src={card.link} alt={card.name} className="popup__full-image" />
        <figcaption className="popup__full-image-caption">
          {card.name}
        </figcaption>
      </figure>
    </div>
  );
}
