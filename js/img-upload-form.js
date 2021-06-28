import '../nouislider/nouislider.js';

const HASHTAGS_MAX = 5;
const HASHTAG_LENGTH_MIN = 2;
const HASHTAG_LENGTH_MAX = 20;
const COMMENT_LENGTH_MAX = 140;
const SCALE_DEFAULT = 100;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = uploadOverlay.querySelector('.img-upload__cancel');
const hashtagsInput = uploadOverlay.querySelector('.text__hashtags');
const descriptionInput = uploadOverlay.querySelector('.text__description');
const scaleSmallerButton = uploadOverlay.querySelector('.scale__control--smaller');
const scaleBiggerButton = uploadOverlay.querySelector('.scale__control--bigger');
const scaleInput = uploadOverlay.querySelector('.scale__control--value');
const imgUploadPreviewContainer = uploadOverlay.querySelector('.img-upload__preview');
const imgUploadPreview = imgUploadPreviewContainer.children[0];
const effectLevelSlider = uploadOverlay.querySelector('.effect-level__slider');
const effectLevel = uploadOverlay.querySelector('.effect-level__value');
const effectList = uploadOverlay.querySelector('.effects__list');


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
const onUploadInbutChange = function () {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  scaleInput.value = `${SCALE_DEFAULT}%`;
  imgUploadPreview.style.transform = `scale(${SCALE_DEFAULT / 100})`;
  document.addEventListener('keydown', onUploadFormEscDown);
  cancelButton.addEventListener('click', onUploadFormClose);
};

uploadInput.addEventListener('change', onUploadInbutChange);

descriptionInput.addEventListener('input', () => {
  if (descriptionInput.value.length > COMMENT_LENGTH_MAX) {
    descriptionInput.setCustomValidity(`Длина комментария не может составлять больше ${COMMENT_LENGTH_MAX} символов;`);
  }
  else {
    descriptionInput.setCustomValidity('');
  }

  descriptionInput.reportValidity();
});

/**
 * Прверяет хэш-тег на соответствиие заданному формату
 *
 * @param {string} hashtag
 * @return {boolean}
 */
const testHashtag = function (hashtag) {
  const re = /^#[A-Za-zА-Яа-я0-9]*$/;
  let result = false;

  if (!(re.test(hashtag))) {
    hashtagsInput.setCustomValidity(`
      Хэш-тег ${hashtag} не соответствует формату:
      - хэш-тег должен начинаться с символа # (решётка) и состоять только из букв и цифр, пробелы и спецсимволы не допускаются (#, @, $ и т. п.).
    `);
  }
  else if (hashtag.length < HASHTAG_LENGTH_MIN) {
    hashtagsInput.setCustomValidity(`Минимальное количество символов - ${HASHTAG_LENGTH_MIN}.`);
  }
  else if (hashtag.length > HASHTAG_LENGTH_MAX) {
    hashtagsInput.setCustomValidity(`Максимальное количество символов - ${HASHTAG_LENGTH_MAX}. Текущее количество - ${hashtag.length}.`);
  }
  else {
    hashtagsInput.setCustomValidity('');
    result = true;
  }

  return result;
};

hashtagsInput.addEventListener('input', () => {
  const hashtags = hashtagsInput.value.trim().split(/ +/);

  if (hashtags.length > HASHTAGS_MAX) {
    hashtagsInput.setCustomValidity(`Максимальное количество хэш-тегов - ${HASHTAGS_MAX}.`);
  }
  else {
    hashtagsInput.setCustomValidity('');
    const uniqueHashtags = [];
    for (let i = 0; i < hashtags.length; i++) {
      const hashtag = hashtags[i].toLowerCase();
      if (uniqueHashtags.includes(hashtag)) {
        hashtagsInput.setCustomValidity(`Хэш-тег ${hashtag} уже есть в списке, используйте другое значение.`);
        break;
      }
      else if (!testHashtag(hashtag)) {
        break;
      }
      else {
        uniqueHashtags.push(hashtag);
      }
    }
  }

  hashtagsInput.reportValidity();
});

hashtagsInput.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

descriptionInput.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

const onScaleButtonClick = function (evt) {
  const currentScale = parseFloat(scaleInput.value);

  if (evt.target.classList.contains('scale__control--smaller')) {
    scaleInput.value = ((currentScale - SCALE_STEP) <= SCALE_MIN) ? `${SCALE_MIN}%` : `${currentScale - SCALE_STEP}%`;
  }
  else {
    scaleInput.value = ((currentScale + SCALE_STEP) >= SCALE_MAX) ? `${SCALE_MAX}%` : `${currentScale + SCALE_STEP}%`;
  }

  scaleInput.dispatchEvent(new Event('change'));
};

scaleSmallerButton.addEventListener('click', onScaleButtonClick);

scaleBiggerButton.addEventListener('click', onScaleButtonClick);

scaleInput.addEventListener('change', () => {
  imgUploadPreview.style.transform = `scale(${parseFloat(scaleInput.value) / 100})`;
});

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

effectLevelSlider.style.display = 'none';

effectLevelSlider.noUiSlider.on('update', (values, handle) => {
  effectLevel.value = values[handle];
});

const onEffectListChange = function (evt) {
  imgUploadPreview.classList = '';
  switch (evt.target.id) {
    case 'effect-none':
      effectLevelSlider.style.display = 'none';
      break;
    default:
      effectLevelSlider.style.display = 'block';
  }
  switch (evt.target.id) {
    case 'effect-chrome':
      imgUploadPreview.classList.add('effects__preview--chrome');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      break;
    case 'effect-sepia':
      imgUploadPreview.classList.add('effects__preview--sepia');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      break;
    case 'effect-marvin':
      imgUploadPreview.classList.add('effects__preview--marvin');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      break;
    case 'effect-phobos':
      imgUploadPreview.classList.add('effects__preview--phobos');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
    case 'effect-heat':
      imgUploadPreview.classList.add('effects__preview--heat');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
  }
};

effectList.addEventListener('change', onEffectListChange);
