import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  enableValidation,
  isInputErrors,
  toggleSubmitButtonState,
  submitButtonText,
}) {
  const defaultValue = () => {
    return { name: "", link: "" };
  };

  const [addPlaceInputValues, setAddPlaceInputValues] = useState(
    defaultValue()
  );
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(null);
  const hasEmptyInputs = () => {
    return Object.values(defaultValue()).some((value) => value === "");
  };

  useEffect(() => {
    if (isOpen) {
      setAddPlaceInputValues(defaultValue());
      setIsSubmitButtonDisabled(hasEmptyInputs());
    }
  }, [isOpen]);

  function handleInputChange(evt) {
    setAddPlaceInputValues({
      ...addPlaceInputValues,
      [evt.target.name]: evt.target.value,
    });
    enableValidation(evt.target);
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();
    onAddPlace(addPlaceInputValues);
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="addCardForm"
      submitButtonText={submitButtonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      isSubmitButtonDisabled={toggleSubmitButtonState(
        isSubmitButtonDisabled,
        addPlaceInputValues
      )}
    >
      <div className="popup__input-field">
        <input
          type="text"
          className={`popup__input ${
            isInputErrors?.name && "popup__input_type_error"
          }`}
          name="name"
          placeholder="Название"
          value={addPlaceInputValues.name}
          onChange={handleInputChange}
          required
          minLength="2"
          maxLength="30"
        />
        {isInputErrors?.name && (
          <span className="popup__error" id="cardTitleInputError">
            {isInputErrors.name}
          </span>
        )}
      </div>
      <div className="popup__input-field">
        <input
          type="url"
          className={`popup__input ${
            isInputErrors?.link && "popup__input_type_error"
          }`}
          name="link"
          placeholder="Ссылка на картинку"
          value={addPlaceInputValues.link}
          onChange={handleInputChange}
          required
        />
        {isInputErrors?.link && (
          <span className="popup__error" id="cardLinkInputError">
            {isInputErrors.link}
          </span>
        )}
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
