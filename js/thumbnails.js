const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

/**
 * Возвращает DocumentFragment в котором сгененрированы эскизы фотографий по заданному шаблону
 *
 * @param {Array} photos - массив объектов-фотографий
 * @return {DocumentFragment}
 */
const generateThumbnails = function (photos) {
  const thumbnailsFragment = document.createDocumentFragment();

  photos.forEach(({url, likes, comments}) => {
    const newThumbnail = thumbnailTemplate.cloneNode(true);
    newThumbnail.querySelector('.picture__img').src = url;
    newThumbnail.querySelector('.picture__comments').textContent = comments.length;
    newThumbnail.querySelector('.picture__likes').textContent = likes;

    thumbnailsFragment.appendChild(newThumbnail);
  });

  return thumbnailsFragment;
};

export {generateThumbnails};
