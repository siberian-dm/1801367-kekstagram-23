import {isEscapeEvent} from '../utils.js';

const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

/**
 * Удаляет pop-up сообщение и обработчики событий.
 *
 */
const closePopupMessage = function () {
  const popupMessage = document.body.querySelector('.error') || document.body.querySelector('.success');
  popupMessage.remove();
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onPopupMessageEscKeydown);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('click', onDocumentClick);
};

/**
 * Обрабатывает событие по нажатию клавиши Escape во время вывода pop-up сообщения.
 *
 * @param {Event} evt - событие 'keydown'
 */
const onPopupMessageEscKeydown = function (evt) {
  if (isEscapeEvent(evt)) {
    evt.preventDefault();
    closePopupMessage();
  }
};

/**
 * Обрабатывает событие по клику за пределами области pop-up сообщения.
 *
 * @param {Event} evt - событие 'click'
 */
const onDocumentClick = function (evt) {
  const popupMessage = document.body.querySelector('.error') || document.body.querySelector('.success');
  if (evt.target === popupMessage) {
    closePopupMessage();
  }
};

/**
 * Показывает pop-up сообщение об ошибке загрузки файла.
 * Добавляет необходимые обработчики событий.
 *
 */
const showErrorPopupMessage = function () {
  const errorPopupMessage = errorMessageTemplate.cloneNode(true);
  errorPopupMessage.querySelector('.error__button').addEventListener('click', closePopupMessage);
  document.body.appendChild(errorPopupMessage);
  document.addEventListener('keydown', onPopupMessageEscKeydown);
  document.addEventListener('click', onDocumentClick);
};

/**
 * Показывает pop-up сообщение об успешной загрузке файла.
 * Добавляет необходимые обработчики событий.
 *
 */
const showSuccessPopupMessage = function () {
  const successPopupMessage = successMessageTemplate.cloneNode(true);
  successPopupMessage.querySelector('.success__button').addEventListener('click', closePopupMessage);
  document.body.appendChild(successPopupMessage);
  document.addEventListener('keydown', onPopupMessageEscKeydown);
  document.addEventListener('click', onDocumentClick);
};

export {showErrorPopupMessage, showSuccessPopupMessage};
