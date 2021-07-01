const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const thumbnailsContainer = document.querySelector('.pictures');

/**
 * Возвращает DocumentFragment в котором сгененрированы эскизы фотографий по заданному шаблону
 *
 * @param {Array} photos - массив объектов-фотографий
 * @return {DocumentFragment}
 */
const renderThumbnails = function (photos) {
  const thumbnailsFragment = document.createDocumentFragment();

  photos.forEach(({url, likes, comments}) => {
    const newThumbnail = thumbnailTemplate.cloneNode(true);
    newThumbnail.querySelector('.picture__img').src = url;
    newThumbnail.querySelector('.picture__comments').textContent = comments.length;
    newThumbnail.querySelector('.picture__likes').textContent = likes;

    thumbnailsFragment.appendChild(newThumbnail);
  });

  thumbnailsContainer.appendChild(thumbnailsFragment);
};

export {renderThumbnails};
