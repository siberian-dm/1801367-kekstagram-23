const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');
const buttons = imgFiltersForm.querySelectorAll('button');
const defaultFilterButton = imgFiltersForm.querySelector('#filter-default');
const randomFilterButton = imgFiltersForm.querySelector('#filter-random');
const discussedFilterButton = imgFiltersForm.querySelector('#filter-discussed');

const toggleButtonClass = function (evt) {
  for (const button of buttons) {
    button.classList.remove('img-filters__button--active');
  }
  evt.target.classList.add('img-filters__button--active');
};

const setFilterDefault = function (callback) {
  defaultFilterButton.addEventListener('click', (evt) => {
    toggleButtonClass(evt);
    callback();
  });
};

const setFilterRandom = function (callback) {
  randomFilterButton.addEventListener('click', (evt) => {
    toggleButtonClass(evt);
    callback();
  });
};

const setFilterDiscussed = function (callback) {
  discussedFilterButton.addEventListener('click', (evt) => {
    toggleButtonClass(evt);
    callback();
  });
};

export {setFilterDefault, setFilterRandom, setFilterDiscussed};
