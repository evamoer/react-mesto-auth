import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  enableValidation,
  isInputErrors,
  toggleSubmitButtonState,
  submitButtonText,
}) {
  const defaultValue = () => {
    return { avatar: "" };
  };
  const [avatarInputValue, setAvatarInputValue] = useState(defaultValue());
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(null);
  const hasEmptyInputs = Object.values(defaultValue()).some(
    (value) => value === ""
  );

  React.useEffect(() => {
    if (isOpen) {
      setAvatarInputValue(defaultValue());
      setIsSubmitButtonDisabled(hasEmptyInputs);
    }
  }, [isOpen]);

  function handleInputChange(evt) {
    setAvatarInputValue({
      ...avatarInputValue,
      [evt.target.name]: evt.target.value,
    });
    enableValidation(evt.target);
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(avatarInputValue);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="editAvatarForm"
      submitButtonText={submitButtonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      isSubmitButtonDisabled={toggleSubmitButtonState(
        isSubmitButtonDisabled,
        avatarInputValue
      )}
    >
      <div className="popup__input-field">
        <input
          type="url"
          className={`popup__input ${
            isInputErrors?.avatar && "popup__input_type_error"
          }`}
          name="avatar"
          placeholder="Ссылка на новый аватар"
          value={avatarInputValue.avatar}
          onChange={handleInputChange}
          required
        />
        {isInputErrors?.avatar && (
          <span className="popup__error" id="avatarLinkInputError">
            {isInputErrors.avatar}
          </span>
        )}
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
