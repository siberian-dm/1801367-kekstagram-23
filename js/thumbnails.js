import {onThumbnailClick} from './show-big-picture.js';

const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const thumbnailsContainer = document.querySelector('.pictures');

/**
 * Отрисовывает миниатюры фотографий в HTML-разметке
 *
 * @param {Array} photos - массив объектов-фотографий
 */
const renderThumbnails = function (photos) {
  const thumbnailsFragment = document.createDocumentFragment();

  photos.forEach(({url, likes, comments, description}) => {
    const newThumbnail = thumbnailTemplate.cloneNode(true);
    newThumbnail.querySelector('.picture__img').src = url;
    newThumbnail.querySelector('.picture__comments').textContent = comments.length;
    newThumbnail.querySelector('.picture__likes').textContent = likes;
    onThumbnailClick(newThumbnail, url, likes, comments, description);
    thumbnailsFragment.appendChild(newThumbnail);
  });

  thumbnailsContainer.appendChild(thumbnailsFragment);
};

export {renderThumbnails};
