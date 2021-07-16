import {imgUploadPreview, resetImgEffects} from './upload-img-effects.js';
import {showErrorPopupMessage, showSuccessPopupMessage} from './show-popup-message.js';
import {sendData} from '../utils/api.js';
import {isEscapeEvent} from '../utils/utils.js';
import './form-validation.js';
import './upload-img-effects.js';

const DEFAULT_SCALE = 100;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const cancelButton = uploadOverlay.querySelector('.img-upload__cancel');
const scaleInput = uploadOverlay.querySelector('.scale__control--value');

/**
 * Закрывает форму для добавления фотографии.
 * Сбрасывает поля формы, удаляет обработчики событий при закрытии формы.
 *
 */
const onCancelButtonClick = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onUploadFormEscDown);
  cancelButton.removeEventListener('click', onCancelButtonClick);
  uploadForm.reset();
};

/**
 * Обрабатывает событие по нажатию клавиши Escape при отображении формы.
 *
 * @param {Event} evt - событие 'keydown'
 */
const onUploadFormEscDown = (evt) => {
  if (isEscapeEvent(evt)) {
    evt.preventDefault();
    onCancelButtonClick();
  }
};

/**
 * Открывает форму для добавления фотографии.
 * Добавляет обработчики событий при открытии формы.
 *
 */
const onUploadInputChange = () => {
  resetImgEffects();
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imgUploadPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }

  scaleInput.value = `${DEFAULT_SCALE}%`;
  imgUploadPreview.style.transform = `scale(${DEFAULT_SCALE / 100})`;

  document.addEventListener('keydown', onUploadFormEscDown);
  cancelButton.addEventListener('click', onCancelButtonClick);
};

uploadInput.addEventListener('change', onUploadInputChange);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    () => {
      onCancelButtonClick();
      showSuccessPopupMessage();
    },
    () => {
      onCancelButtonClick();
      showErrorPopupMessage();
    },
    new FormData(evt.target),
  );
});
