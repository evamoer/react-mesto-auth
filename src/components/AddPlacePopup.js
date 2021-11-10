import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormAndValidation from "../hooks/validationHook";
import { useSelector } from "react-redux";

/**
 * AddPlacePopup - компонент попапа с формой добавления карточки в галерею.
 * Включает в себя компонент PopupWithForm.
 *
 * @prop onClose - пропс с функцией закрытия попапа.
 * @prop onAddPlace - пропс с функцией обработки данных формы при сабмите.
 * @prop submitButtonText - пропс с текстом кнопки сабмита (меняется при выполнении запросы к api).
 */
export default function AddPlacePopup({
  onClose,
  onAddPlace,
  submitButtonText,
}) {
  const { addPlacePopupState } = useSelector((state) => state.popup);

  /**
   * Параметры для валидации формы.
   */
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  /**
   * Хук установки начального состояния формы при открытии попапа.
   */
  useEffect(() => {
    if (addPlacePopupState) {
      resetForm();
      setValues({ name: "", link: "" });
    }
  }, [addPlacePopupState]);

  /**
   * Функция-обработчик сабмита формы.
   */
  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace(values);
  };

  return (
    <PopupWithForm
      title="Новое место"
      name="addCardForm"
      submitButtonText={submitButtonText}
      isOpen={addPlacePopupState}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      isValid={isValid}
    >
      <div className="popup__input-field">
        <input
          type="text"
          className={`popup__input ${
            errors?.name && "popup__input_type_error"
          }`}
          name="name"
          placeholder="Название"
          value={values?.name || ""}
          onChange={handleChange}
          required
          minLength="2"
          maxLength="30"
        />
        {errors?.name && (
          <span className="popup__error" id="cardTitleInputError">
            {errors?.name}
          </span>
        )}
      </div>
      <div className="popup__input-field">
        <input
          type="url"
          className={`popup__input ${
            errors?.link && "popup__input_type_error"
          }`}
          name="link"
          placeholder="Ссылка на картинку"
          value={values?.link || ""}
          onChange={handleChange}
          required
        />
        {errors?.link && (
          <span className="popup__error" id="cardLinkInputError">
            {errors.link}
          </span>
        )}
      </div>
    </PopupWithForm>
  );
}
