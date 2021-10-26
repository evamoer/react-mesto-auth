import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  enableValidation,
  isInputErrors,
  toggleSubmitButtonState,
  submitButtonText,
}) {
  const { name, about } = useContext(CurrentUserContext);
  const defaultValue = () => {
    return { name: name, description: about };
  };
  const [editProfileInputValues, setEditProfileInputValues] = useState(
    defaultValue()
  );
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(null);
  const hasEmptyInputs = () => {
    return Object.values(defaultValue()).some((value) => value === "");
  };
  useEffect(() => {
    if (isOpen) {
      setEditProfileInputValues(defaultValue());
      setIsSubmitButtonDisabled(hasEmptyInputs());
    }
  }, [isOpen]);

  function handleInputChange(evt) {
    setEditProfileInputValues({
      ...editProfileInputValues,
      [evt.target.name]: evt.target.value,
    });
    enableValidation(evt.target);
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: editProfileInputValues.name,
      about: editProfileInputValues.description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="editProfileForm"
      submitButtonText={submitButtonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      isSubmitButtonDisabled={toggleSubmitButtonState(
        isSubmitButtonDisabled,
        editProfileInputValues
      )}
    >
      <div className="popup__input-field">
        <input
          type="text"
          className={`popup__input ${
            isInputErrors?.name && "popup__input_type_error"
          }`}
          name="name"
          placeholder="Имя пользователя"
          value={editProfileInputValues.name}
          onChange={handleInputChange}
          required
          minLength="2"
          maxLength="40"
        />
        {isInputErrors?.name && (
          <span className="popup__error" id="nameInputError">
            {isInputErrors.name}
          </span>
        )}
      </div>
      <div className="popup__input-field">
        <input
          type="text"
          className={`popup__input ${
            isInputErrors?.description && "popup__input_type_error"
          }`}
          name="description"
          placeholder="О себе"
          value={editProfileInputValues.description}
          onChange={handleInputChange}
          required
          minLength="2"
          maxLength="200"
        />
        {isInputErrors?.description && (
          <span className="popup__error" id="aboutInputError">
            {isInputErrors.description}
          </span>
        )}
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
