const MAX_HASHTAGS = 5;
const MAX_LENGTH_STRING = 140;
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const cancelButton = imgUploadForm.querySelector('.img-upload__cancel');
const hashtagsInput = imgUploadForm.querySelector('.text__hashtags');
const descriptionInput = imgUploadForm.querySelector('.text__description');


imgUploadOverlay.classList.remove('hidden');
document.body.classList.add('modal-open');

imgUploadInput.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

cancelButton.addEventListener('click', () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

hashtagsInput.addEventListener('input', () => {
  const re = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
  const hashtags = hashtagsInput.value.split(' ');
  console.log(hashtags);

  if (hashtags.length > MAX_HASHTAGS) {
    hashtagsInput.setCustomValidity(`Слишком много #хэштегов, должно быть не более ${MAX_HASHTAGS}`);
  } else {
    hashtagsInput.setCustomValidity('');
    hashtags.forEach((hashtag) => {
      if (!re.test(hashtag)) {
        console.log(re.test(hashtag));
        hashtagsInput.setCustomValidity('#хэштег должен начинаться с "#" и содержать только буквы и цифры');
      } else {
        hashtagsInput.setCustomValidity('');
      }
    });
  }

});
