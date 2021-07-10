const HASHTAGS_MAX = 5;
const HASHTAG_LENGTH_MIN = 2;
const HASHTAG_LENGTH_MAX = 20;
const COMMENT_LENGTH_MAX = 140;

const uploadOverlay = document.querySelector('.img-upload__overlay');
const hashtagsInput = uploadOverlay.querySelector('.text__hashtags');
const descriptionInput = uploadOverlay.querySelector('.text__description');

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

  if (hashtagsInput.value === '') {
    hashtagsInput.setCustomValidity('');
  }

  hashtagsInput.reportValidity();
});

hashtagsInput.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

descriptionInput.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});
