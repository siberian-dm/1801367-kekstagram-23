import {getRandomUniqueElements} from './utils/utils.js';

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');
const buttons = imgFiltersForm.querySelectorAll('button');

/**
 * Добавляет класс кнопке, по которой был произведен клик, удаляет этот класс с других кнопок.
 *
 * @param {Event} evt - событие 'click'
 */
const toggleButtonClass = (evt) => {
  for (const button of buttons) {
    button.classList.remove('img-filters__button--active');
  }
  evt.target.classList.add('img-filters__button--active');
};


/**
 * Принимает массив объектов - фотографий и функцию отрисовки миниатюр, переключает фильтр
 * миниатюр на главной странице по клику на кнопках фильтра.
 *
 * @param {Array} photos - массив объектов - фотографий
 * @param {Function} callback - функция отрисовки миниатюр
 */
const setFilter = (photos, callback) => {
  imgFiltersForm.addEventListener('click', (evt) => {
    toggleButtonClass(evt);
    const randomPhotos = getRandomUniqueElements(photos);
    const sortedPhotos = photos.slice().sort((a, b) => b.comments.length - a.comments.length);
    let photosToRender;
    if (evt.target.id === 'filter-default') {
      photosToRender = photos;
    }
    else if (evt.target.id === 'filter-random') {
      photosToRender = randomPhotos;
    }
    else if (evt.target.id === 'filter-discussed') {
      photosToRender = sortedPhotos;
    }
    callback(photosToRender);
  });
};

export {setFilter};
