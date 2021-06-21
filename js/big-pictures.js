const bigPictureOverlay = document.querySelector('.big-picture');
const cancelButton = bigPictureOverlay.querySelector('.big-picture__cancel');
const bigPictureContainer = bigPictureOverlay.querySelector('.big-picture__img');
const likesCount = bigPictureOverlay.querySelector('.likes-count');
const socialCommentsCount = bigPictureOverlay.querySelector('.social__comment-count');
const commentsCount = socialCommentsCount.querySelector('.comments-count');
const socialComments = bigPictureOverlay.querySelector('.social__comments');
const photoDescription = bigPictureOverlay.querySelector('.social__caption');
const loadCommentsButton = bigPictureOverlay.querySelector('.comments-loader');

const onPopupEscKeydown = function (evt) {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    // eslint-disable-next-line no-use-before-define
    closeBigPictureModal();
  }
};

const closeBigPictureModal = function () {
  bigPictureOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const openBigPictureModal = function () {
  document.body.classList.add('modal-open');
  bigPictureOverlay.classList.remove('hidden');
  socialCommentsCount.classList.add('hidden');
  loadCommentsButton.classList.add('hidden');
  document.addEventListener('keydown', onPopupEscKeydown);
};

cancelButton.addEventListener('click', closeBigPictureModal);

/**
 * Принимает HTML-элемент (миниатюру фотографии) и объект-фотографию, добавляет обработчик клика на миниатюре,
 * который отрисовывает комментарии, из объекта-фотографии, в HTML-разметке модального окна полноэкранного
 * изображения.
 *
 * @param {Object} thumbnail - HTML-элемент (миниатюру фотографии)
 * @param {Object} photo - объект-фотография
 */
const addCommentsHandler = function (thumbnail, photo) {
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    // Удаляет текущие комментарии в HTML-разметке
    for (const comment of socialComments.querySelectorAll('.social__comment')) {
      comment.remove();
    }
    for (const comment of photo.comments) {
      const socialComment = `
        <li class="social__comment">
        <img
            class="social__picture"
            src="${comment.avatar}"
            alt="${comment.name}"
            width="35" height="35">
        <p class="social__text">${comment.message}</p>
        </li>
      `;
      socialComments.insertAdjacentHTML('beforeend', socialComment);
    }
  });
};

/**
 * Принимает HTML-элемент (миниатюру фотографии) и объект-фотографию, добавляет обработчик клика на миниатюре,
 * который отрывает модальное окно полноэкранного изображения фотографии, добавляет в HTML-разметку её описание,
 * количество лайков и комментариев.
 *
 * @param {Object} thumbnail - HTML-элемент (миниатюру фотографии)
 * @param {Object} photo - объект-фотография
 */
const addBigPictureOpenHandler = function (thumbnail, photo) {
  const bigPicture = bigPictureContainer.children[0];
  const thumbnailImg = thumbnail.querySelector('.picture__img');
  const thumbnailLikes = thumbnail.querySelector('.picture__likes');
  const thumbnailComments = thumbnail.querySelector('.picture__comments');

  thumbnail.addEventListener('click', () => {
    openBigPictureModal();
    bigPicture.src = thumbnailImg.src;
    likesCount.textContent = thumbnailLikes.textContent;
    commentsCount.textContent = thumbnailComments.textContent;
    photoDescription.textContent = photo.description;
  });
};

/**
 * Принимает колекцию HTML-элементов (миниатюры фотографий) и массив объектов-фотографий, добавляет обработчики
 * событий для каждой миниатюры в коллекции, используя свойства соответствующего объекта-фотографии.
 *
 * @param {NodeList} thumbnails - колекция HTML-элементов
 * @param {Array} photoObjects - массив объектов-фотографий
 */
const generateBigPicturesOpen = function (thumbnails, photoObjects) {
  for (let i = 0; i < thumbnails.length; i++) {
    addCommentsHandler(thumbnails[i], photoObjects[i]);
    addBigPictureOpenHandler(thumbnails[i], photoObjects[i]);
  }
};

export {generateBigPicturesOpen};
