const bigPictureOverlay = document.querySelector('.big-picture');
const cancelButton = bigPictureOverlay.querySelector('.big-picture__cancel');
const bigPicture = bigPictureOverlay.querySelector('.big-picture__img').children[0];
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
 * Принимает массив объектов-комментариев, отрисовывает комментарии под фотографией.
 *
 * @param {Array} comments - массив объектов-комментариев
 */
const addComments = function (comments) {
  // Удаляет текущие комментарии в HTML-разметке
  for (const comment of socialComments.querySelectorAll('.social__comment')) {
    comment.remove();
  }

  for (const comment of comments) {
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
};

/**
 * Принимает HTML-элемент (миниатюру фотографии) и объект-фотографию, добавляет обработчик клика на миниатюре,
 * который отрывает модальное окно полноэкранного изображения фотографии, добавляет в HTML-разметку её описание,
 * количество лайков и комментариев.
 *
 * @param {Object} thumbnail - HTML-элемент (изображение-ссылка)
 * @param {Object} photo - объект-фотография
 */
const onThumbnailClick = function (thumbnail, photo) {
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPictureModal();
    bigPicture.src = thumbnail.querySelector('.picture__img').src;
    likesCount.textContent = thumbnail.querySelector('.picture__likes').textContent;
    commentsCount.textContent = thumbnail.querySelector('.picture__comments').textContent;
    photoDescription.textContent = photo.description;
    addComments(photo.comments);
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
    onThumbnailClick(thumbnails[i], photoObjects[i]);
  }
};

export {generateBigPicturesOpen};
