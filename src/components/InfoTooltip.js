import React from "react";
import { useSelector } from "react-redux";

/**
 * InfoTooltip - компонент попапа с формой добавления карточки в галерею.
 *
 * @prop onClose - пропс с функцией закрытия попапа.
 */
export default function InfoTooltip({ onClose }) {
  const { infoTooltipState } = useSelector((state) => state.popup);
  const { isRegistered } = useSelector((state) => state.auth);
  const popupClassName = `popup ${infoTooltipState && "popup_opened"}`;

  const title = isRegistered
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте ещё раз.";

  const signClassName = `popup__info-sign ${
    isRegistered
      ? "popup__info-sign_type_success"
      : "popup__info-sign_type_fail"
  }`;

  return (
    <div className={popupClassName} onMouseDown={onClose}>
      <div className="popup__container">
        <button
          className="button popup__button_type_close"
          onClick={onClose}
          type="button"
          aria-label="Закрыть всплывающее окно"
        ></button>
        <div className={signClassName}></div>
        <h2 className="popup__title popup__info-title">{title}</h2>
      </div>
    </div>
  );
}
