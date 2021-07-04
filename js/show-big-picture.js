import {isEscapeEvent} from './utils.js';

const bigPictureOverlay = document.querySelector('.big-picture');
const cancelButton = bigPictureOverlay.querySelector('.big-picture__cancel');
const bigPicture = bigPictureOverlay.querySelector('.big-picture__img').children[0];
const likesCount = bigPictureOverlay.querySelector('.likes-count');
const socialCommentsCount = bigPictureOverlay.querySelector('.social__comment-count');
const commentsCount = socialCommentsCount.querySelector('.comments-count');
const socialComments = bigPictureOverlay.querySelector('.social__comments');
const photoDescription = bigPictureOverlay.querySelector('.social__caption');
const loadCommentsButton = bigPictureOverlay.querySelector('.comments-loader');

/**
 * Обрабатывает событие по нажатию клавиши Escape в режиме 'Big picture'.
 *
 * @param {Event} evt - событие 'keydown'
 */
const onBigPictureEscKeydown = function (evt) {
  if (isEscapeEvent(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeBigPictureModal();
  }
};

/**
 * Закрывает модальное окно 'Big picture'.
 */
const closeBigPictureModal = function () {
  bigPictureOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeydown);
};

/**
 * Показывает фото в режиме 'Big picture'(отображает модальное окно с большим фото и комментариями).
 */
const showBigPictureModal = function () {
  document.body.classList.add('modal-open');
  bigPictureOverlay.classList.remove('hidden');
  socialCommentsCount.classList.add('hidden');
  loadCommentsButton.classList.add('hidden');
  document.addEventListener('keydown', onBigPictureEscKeydown);
};

cancelButton.addEventListener('click', closeBigPictureModal);

/**
 * Принимает массив объектов-комментариев, отрисовывает комментарии под фото.
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
 * Принимает HTML-элемент (миниатюру фотографии) и свойства объекта-фото, добавляет обработчик клика на миниатюре,
 * который включает режим 'Big picture', добавляет в HTML-разметку данные из свойств объекта-фото.
 *
 * @param {Object} thumbnail - HTML-элемент (изображение-ссылка)
 * @param {string} url - url фото
 * @param {number} likes - количество лайков у фото
 * @param {Array} comments - массив с комментариями
 * @param {string} description - описание фото
 */
const onThumbnailClick = function (thumbnail, url, likes, comments, description) {
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPictureModal();
    bigPicture.src = url;
    likesCount.textContent = likes;
    commentsCount.textContent = comments.length;
    photoDescription.textContent = description;
    addComments(comments);
  });
};

export {onThumbnailClick};
