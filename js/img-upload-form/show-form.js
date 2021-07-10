import {resetImgEffects} from './upload-img-effects.js';
import {showErrorPopupMessage, showSuccessPopupMessage} from './show-popup-message.js';
import {sendData} from '../utils/api.js';
import {isEscapeEvent} from '../utils/utils.js';
import './form-validation.js';
import './upload-img-effects.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const cancelButton = uploadOverlay.querySelector('.img-upload__cancel');
const hashtagsInput = uploadOverlay.querySelector('.text__hashtags');
const descriptionInput = uploadOverlay.querySelector('.text__description');

/**
 * Закрывает форму для добавления фотографии.
 * Сбрасывает поля формы, удаляет обработчики событий при закрытии формы.
 *
 */
const uploadFormClose = function () {
  uploadInput.value = '';
  hashtagsInput.value = '';
  descriptionInput.value = '';
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onUploadFormEscDown);
  cancelButton.removeEventListener('click', uploadFormClose);
};

/**
 * Обрабатывает событие по нажатию клавиши Escape при отображении формы.
 *
 * @param {Event} evt - событие 'keydown'
 */
const onUploadFormEscDown = function (evt) {
  if (isEscapeEvent(evt)) {
    evt.preventDefault();
    uploadFormClose();
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
  cancelButton.addEventListener('click', uploadFormClose);
};

uploadInput.addEventListener('change', onUploadInputChange);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    () => {
      uploadFormClose();
      showSuccessPopupMessage();
    },
    () => {
      uploadFormClose();
      showErrorPopupMessage();
    },
    new FormData(evt.target),
  );
});
