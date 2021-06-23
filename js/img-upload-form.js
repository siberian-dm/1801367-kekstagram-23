const HASHTAGS_MAX = 5;
const COMMENT_LENGTH_MAX = 140;
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const cancelButton = imgUploadForm.querySelector('.img-upload__cancel');
const hashtagsInput = imgUploadForm.querySelector('.text__hashtags');
const descriptionInput = imgUploadForm.querySelector('.text__description');


imgUploadInput.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

cancelButton.addEventListener('click', () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

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
      const hashtag = hashtags[i];
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

descriptionInput.addEventListener('input', () => {
  if (descriptionInput.value.length > COMMENT_LENGTH_MAX) {
    descriptionInput.setCustomValidity(`Длина комментария не может составлять больше ${COMMENT_LENGTH_MAX} символов;`);
  }
  else {
    descriptionInput.setCustomValidity('');
  }
  descriptionInput.reportValidity();
});
