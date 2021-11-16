import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useFormAndValidation from "../hooks/validationHook";
import PopupWithForm from "./PopupWithForm";
import { RootState } from "../store/store";

/**
 * Интерфейс для AddPlacePopup.
 * @prop onClose - функция закрытия попапа.
 * @prop onAddPlace - обработчик данных формы при сабмите.
 */
interface AddPlacePopupProps {
  onClose: () => void;
  onAddPlace: (values: { name?: string; link?: string }) => void;
}
/**
 * AddPlacePopup - компонент попапа с формой добавления карточки в галерею.
 * Включает в себя компонент PopupWithForm.
 */
const AddPlacePopup: React.FunctionComponent<AddPlacePopupProps> = ({
  onClose,
  onAddPlace,
}) => {
  /**
   * Параметр состояния попапа: true - открыт, false - закрыт.
   */
  const { addPlacePopupState } = useSelector((state: RootState) => state.popup);

  /**
   * Параметр загрузки данных на сервер.
   */
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

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
   * Обработчик сабмита формы.
   */
  const handleFormSubmit = (evt: React.ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onAddPlace(values);
  };

  return (
    <PopupWithForm
      title="Новое место"
      name="addCardForm"
      submitButtonText={!isLoading ? "Создать" : "Сохранение..."}
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
          minLength={2}
          maxLength={30}
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
};

export default AddPlacePopup;
