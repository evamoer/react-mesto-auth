import React from "react";
import { useSelector } from "react-redux";
import PopupWithForm from "./PopupWithForm";

/**
 * DeletePlacePopup - компонент попапа с формой удаления карточки в галерею.
 * Включает в себя компонент PopupWithForm.
 *
 * @prop onClose - функция закрытия попапа.
 * @prop onApproveDeletePlace - обработчик подтверждения удаления карточки.
 */
export default function DeletePlacePopup({ onClose, onApproveDeletePlace }) {
  /**
   * Параметр состояния попапа: true - открыт, false - закрыт.
   */
  const { deletePlacePopupState } = useSelector((state) => state.popup);

  /**
   * Обработчик сабмита формы.
   */
  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    onApproveDeletePlace();
  };

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete-card"
      submitButtonText="Да"
      isOpen={deletePlacePopupState}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      isValid={true}
    />
  );
}
