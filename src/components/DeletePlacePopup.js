import React from "react";
import PopupWithForm from "./PopupWithForm";

/**
 * DeletePlacePopup - компонент попапа с формой удаления карточки в галерею.
 * Включает в себя компонент PopupWithForm.
 *
 * @prop isOpen - пропс состояния попапа: открыт/закрыт.
 * @prop onClose - пропс с функцией закрытия попапа.
 * @prop onApproveDeletePlace - пропс с функцией обработки подтверждения удаления карточки.
 */
export default function DeletePlacePopup({
  isOpen,
  onClose,
  onApproveDeletePlace,
}) {
  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    onApproveDeletePlace();
  };

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete-card"
      submitButtonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      isValid={true}
    />
  );
}
