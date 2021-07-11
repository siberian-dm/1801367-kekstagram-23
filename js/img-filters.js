const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');
const buttons = imgFiltersForm.querySelectorAll('button');
const defaultFilterButton = imgFiltersForm.querySelector('#filter-default');
const randomFilterButton = imgFiltersForm.querySelector('#filter-random');
const discussedFilterButton = imgFiltersForm.querySelector('#filter-discussed');

/**
 * Добавляет класс кнопке, по которой был произведен клик, удаляет этот класс с других кнопок.
 *
 * @param {Event} evt - событие 'click'
 */
const toggleButtonClass = function (evt) {
  for (const button of buttons) {
    button.classList.remove('img-filters__button--active');
  }
  evt.target.classList.add('img-filters__button--active');
};

/**
 * Устанавливает фильтр 'По умолчанию' — фотографии в изначальном порядке с сервера.
 *
 * @param {Function} callback - функция отрисовки миниатюр
 */
const setFilterDefault = function (callback) {
  defaultFilterButton.addEventListener('click', (evt) => {
    toggleButtonClass(evt);
    callback();
  });
};

/**
 * Устанавливает фильтр 'Случайные' — заданное количество случайных, не повторяющихся фотографий.
 *
 * @param {Function} callback - функция отрисовки миниатюр
 */
const setFilterRandom = function (callback) {
  randomFilterButton.addEventListener('click', (evt) => {
    toggleButtonClass(evt);
    callback();
  });
};

/**
 * Устанавливает фильтр 'Обсуждаемые' — фотографии, отсортированные в порядке убывания количества комментариев.
 *
 * @param {Function} callback - функция отрисовки миниатюр
 */
const setFilterDiscussed = function (callback) {
  discussedFilterButton.addEventListener('click', (evt) => {
    toggleButtonClass(evt);
    callback();
  });
};

export {setFilterDefault, setFilterRandom, setFilterDiscussed};
