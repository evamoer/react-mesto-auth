import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePlacePopup({ isOpen, onClose, onApproveDeletePlace }) {
  function handleFormSubmit(evt) {
    evt.preventDefault();
    onApproveDeletePlace();
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete-card"
      submitButtonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
    />
  );
}

export default DeletePlacePopup;
