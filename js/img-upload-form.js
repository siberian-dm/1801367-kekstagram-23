const HASHTAGS_MAX = 5;
const COMMENT_LENGTH_MAX = 140;
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = imgUploadOverlay.querySelector('.img-upload__cancel');
const hashtagsInput = imgUploadOverlay.querySelector('.text__hashtags');
const descriptionInput = imgUploadOverlay.querySelector('.text__description');

/**
 * Закрыет форму для добавления фотографии.
 * Сбрасывает поля формы, удаляет обработчики событий при закрытии формы.
 *
 */
const closeUploadForm = function () {
  imgUploadInput.value = '';
  hashtagsInput.value = '';
  descriptionInput.value = '';
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onUploadFormEscDown);
  cancelButton.removeEventListener('click', closeUploadForm);
};

/**
 * Функция для обработки события по нажатию клавиши Escape на документе.
 *
 * @param {Event} evt - событие 'keydown'
 */
const onUploadFormEscDown = function (evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closeUploadForm();
  }
};

/**
 * Открывает форму для добавления фотографии.
 * Добавляет обработчики событий при открытии формы.
 *
 */
const openUploadForm = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadFormEscDown);
  cancelButton.addEventListener('click', closeUploadForm);
};

imgUploadInput.addEventListener('change', openUploadForm);

hashtagsInput.addEventListener('focus', () => {
  document.removeEventListener('keydown', onUploadFormEscDown);
});

hashtagsInput.addEventListener('blur', () => {
  document.addEventListener('keydown', onUploadFormEscDown);
});

descriptionInput.addEventListener('focus', () => {
  document.removeEventListener('keydown', onUploadFormEscDown);
});

descriptionInput.addEventListener('blur', () => {
  document.addEventListener('keydown', onUploadFormEscDown);
});

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
  else if (hashtag.length < 2) {
    hashtagsInput.setCustomValidity('Минимальная длина хэш-тега - 2 символа.');
  }
  else if (hashtag.length > 20) {
    hashtagsInput.setCustomValidity('Максимальная длина хэш-тега - 20 символов.');
  }
  else {
    hashtagsInput.setCustomValidity('');
    result = true;
  }

  return result;
};

hashtagsInput.addEventListener('input', () => {
  const hashtags = hashtagsInput.value.trim().split(/ +/);

  if (hashtags.length > 5) {
    hashtagsInput.setCustomValidity(`Можно указать только ${HASHTAGS_MAX} хэш-тегов.`);
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
