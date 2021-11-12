import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useFormAndValidation from "../hooks/validationHook";
import PopupWithForm from "./PopupWithForm";

/**
 * EditProfilePopup - компонент попапа с формой добавления карточки в галерею.
 * Включает в себя компонент PopupWithForm.
 *
 * @prop onClose - функция закрытия попапа.
 * @prop onUpdateUser - обработчик данных формы при сабмите.
 */
export default function EditProfilePopup({ onClose, onUpdateUser }) {
  /**
   * Параметр состояния попапа: true - открыт, false - закрыт.
   */
  const { editProfilePopupState } = useSelector((state) => state.popup);

  /**
   * Параметры для валидации формы.
   */
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  /**
   * Параметры текущего пользователя.
   */
  const { name, about } = useSelector((state) => state.user);

  /**
   * Параметр загрузки данных на сервер.
   */
  const isLoading = useSelector((state) => state.loading.isLoading);
  /**
   * Хук установки начального состояния формы при открытии попапа.
   */
  useEffect(() => {
    if (editProfilePopupState) {
      setValues({ name, description: about });
    }
  }, [editProfilePopupState]);

  /**
   * Обработчик сабмита формы.
   */
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
      submitButtonText={!isLoading ? "Сохранить" : "Сохранение..."}
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
