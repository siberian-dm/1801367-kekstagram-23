import './form-validation.js';
import './upload-img-effects.js';
import {resetImgEffects} from './upload-img-effects.js';

const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
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
 * Функция для обработки события по нажатию клавиши Escape на документе.
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
