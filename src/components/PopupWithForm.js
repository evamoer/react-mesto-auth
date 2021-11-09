/**
 * PopupWithForm - компонент попапа с формой.
 *
 * @prop title - пропс с названием формы, отображающейся в попапе.
 * @prop name - пропс с именем формы.
 * @prop submitButtonText - пропс с текстом кнопки сабмита (меняется при выполнении запросы к api).
 * @prop isOpen - пропс состояния попапа: открыт/закрыт.
 * @prop onClose - пропс с функцией закрытия попапа.
 * @prop onSubmit - пропс с функцией обработки сабмита формы.
 * @prop children - пропс с дочерними элементами формы (инпуты).
 * @prop isValid - пропс с состоянием валидности формы.
 */
export default function PopupWithForm({
  title,
  name,
  submitButtonText,
  isOpen,
  onClose,
  onSubmit,
  children,
  isValid,
}) {
  const popupClassName = `popup ${isOpen && "popup_opened"}`;
  return (
    <div className={popupClassName} onMouseDown={onClose}>
      <div className="popup__container">
        <button
          className="button popup__button_type_close"
          onClick={onClose}
          type="button"
          aria-label="Закрыть всплывающее окно"
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          action="/"
          method="POST"
          onSubmit={onSubmit}
          name={name}
        >
          {children}
          <button
            className={`button popup__button_type_submit ${
              !isValid && "popup__button_type_submit_disabled"
            }`}
            type="submit"
            aria-label="Сохранить изменения"
          >
            {submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}
