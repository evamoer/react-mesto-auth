import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import PopupWithForm from "./PopupWithForm";

/**
 * Интерфейс для DeletePlacePopup.
 * @prop onClose - функция закрытия попапа.
 * @prop onApproveDeletePlace - обработчик подтверждения удаления карточки.
 */
interface DeletePlacePopupProps {
  onClose: () => void;
  onApproveDeletePlace: () => void;
}

/**
 * DeletePlacePopup - компонент попапа с формой удаления карточки в галерею.
 * Включает в себя компонент PopupWithForm.
 *
 * @prop onClose - функция закрытия попапа.
 * @prop onApproveDeletePlace - обработчик подтверждения удаления карточки.
 */
const DeletePlacePopup: React.FunctionComponent<DeletePlacePopupProps> = ({
  onClose,
  onApproveDeletePlace,
}) => {
  /**
   * Параметр состояния попапа: true - открыт, false - закрыт.
   */
  const { deletePlacePopupState } = useSelector(
    (state: RootState) => state.popup
  );

  /**
   * Обработчик сабмита формы.
   */
  const handleFormSubmit = (evt: React.ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onApproveDeletePlace();
  };

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete-card"
      submitButtonText="Да"
      isOpen={deletePlacePopupState}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      isValid={true}
      children={undefined}
    />
  );
};

export default DeletePlacePopup;
