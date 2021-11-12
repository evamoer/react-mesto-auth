import React from "react";
import { useSelector } from "react-redux";
import useFormAndValidation from "../hooks/validationHook";
import PopupWithForm from "./PopupWithForm";

/**
 * EditAvatarPopup - компонент попапа с формой изменения аватара пользователя.
 * Включает в себя компонент PopupWithForm.
 *
 * @prop onClose - функция закрытия попапа.
 * @prop onUpdateAvatar - обработчик данных формы при сабмите.
 */
export default function EditAvatarPopup({ onClose, onUpdateAvatar }) {
  /**
   * Параметр состояния попапа: true - открыт, false - закрыт.
   */
  const { editAvatarPopupState } = useSelector((state) => state.popup);

  /**
   * Параметры для валидации формы.
   */
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  /**
   * Параметр загрузки данных на сервер.
   */
  const isLoading = useSelector((state) => state.loading.isLoading);

  /**
   * Хук установки начального состояния формы при открытии попапа.
   */
  React.useEffect(() => {
    if (editAvatarPopupState) {
      resetForm();
      setValues({ avatar: "" });
    }
  }, [editAvatarPopupState]);

  /**
   * Обработчик сабмита формы.
   */
  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar(values);
  };

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="editAvatarForm"
      submitButtonText={!isLoading ? "Сохранить" : "Сохранение..."}
      isOpen={editAvatarPopupState}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      isValid={isValid}
    >
      <div className="popup__input-field">
        <input
          type="url"
          className={`popup__input ${
            errors?.avatar && "popup__input_type_error"
          }`}
          name="avatar"
          placeholder="Ссылка на новый аватар"
          value={values?.avatar || ""}
          onChange={handleChange}
          required
        />
        {errors?.avatar && (
          <span className="popup__error" id="avatarLinkInputError">
            {errors.avatar}
          </span>
        )}
      </div>
    </PopupWithForm>
  );
}
