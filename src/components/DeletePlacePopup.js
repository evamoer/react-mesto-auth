import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useSelector } from "react-redux";

/**
 * DeletePlacePopup - компонент попапа с формой удаления карточки в галерею.
 * Включает в себя компонент PopupWithForm.
 *
 * @prop onClose - пропс с функцией закрытия попапа.
 * @prop onApproveDeletePlace - пропс с функцией обработки подтверждения удаления карточки.
 */
export default function DeletePlacePopup({ onClose, onApproveDeletePlace }) {
  const { deletePlacePopupState } = useSelector((state) => state.popup);
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
