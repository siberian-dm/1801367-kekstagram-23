import {resetImgEffects} from './upload-img-effects.js';
import {sendData} from '../api.js';
import './form-validation.js';
import './upload-img-effects.js';

const ALERT_SHOW_TIME = 5000;

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const cancelButton = uploadOverlay.querySelector('.img-upload__cancel');
const hashtagsInput = uploadOverlay.querySelector('.text__hashtags');
const descriptionInput = uploadOverlay.querySelector('.text__description');

/**
 * Закрыет форму для добавления фотографии.
 * Сбрасывает поля формы, удаляет обработчики событий при закрытии формы.
 *
 */
const onUploadFormClose = function () {
  uploadInput.value = '';
  hashtagsInput.value = '';
  descriptionInput.value = '';
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onUploadFormEscDown);
  cancelButton.removeEventListener('click', onUploadFormClose);
};

/**
 * Обрабатывает событие по нажатию клавиши Escape на документе.
 *
 * @param {Event} evt - событие 'keydown'
 */
const onUploadFormEscDown = function (evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    onUploadFormClose();
  }
};

/**
 * Открывает форму для добавления фотографии.
 * Добавляет обработчики событий при открытии формы.
 *
 */
const onUploadInputChange = function () {
  resetImgEffects();
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadFormEscDown);
  cancelButton.addEventListener('click', onUploadFormClose);
};

uploadInput.addEventListener('change', onUploadInputChange);

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    onUploadFormClose,
    showAlert,
    new FormData(evt.target),
  );
});
