import React, { useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useFormAndValidation from "../hooks/validationHook";
import PopupWithForm from "./PopupWithForm";
import { useSelector } from "react-redux";

/**
 * EditProfilePopup - компонент попапа с формой добавления карточки в галерею.
 * Включает в себя компонент PopupWithForm.
 *
 * @prop onClose - пропс с функцией закрытия попапа.
 * @prop onUpdateUser - пропс с функцией обработки данных формы при сабмите.
 * @prop submitButtonText - пропс с текстом кнопки сабмита (он меняется при выполнении запроса к api).
 */
export default function EditProfilePopup({
  onClose,
  onUpdateUser,
  submitButtonText,
}) {
  const { editProfilePopupState } = useSelector((state) => state.popup);
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();
  const { name, about } = useContext(CurrentUserContext);

  useEffect(() => {
    if (editProfilePopupState) {
      setValues({ name, description: about });
    }
  }, [editProfilePopupState]);

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.description,
    });
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="editProfileForm"
      submitButtonText={submitButtonText}
      isOpen={editProfilePopupState}
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
          placeholder="Имя пользователя"
          value={values?.name || ""}
          onChange={handleChange}
          required
          minLength="2"
          maxLength="40"
        />
        {errors?.name && (
          <span className="popup__error" id="nameInputError">
            {errors.name}
          </span>
        )}
      </div>
      <div className="popup__input-field">
        <input
          type="text"
          className={`popup__input ${
            errors?.description && "popup__input_type_error"
          }`}
          name="description"
          placeholder="О себе"
          value={values?.description || ""}
          onChange={handleChange}
          required
          minLength="2"
          maxLength="200"
        />
        {errors?.description && (
          <span className="popup__error" id="aboutInputError">
            {errors.description}
          </span>
        )}
      </div>
    </PopupWithForm>
  );
}
