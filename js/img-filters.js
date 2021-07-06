const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');

imgFilters.classList.remove('img-filters--inactive');

imgFiltersForm.addEventListener('click', (evt) => {
  const buttons = imgFiltersForm.querySelectorAll('button');
  for (const button of buttons) {
    button.classList.remove('img-filters__button--active');
  }
  if (evt.target.type === 'button') {
    evt.target.classList.add('img-filters__button--active');
  }
  switch (evt.target.id) {
    case 'filter-default':
      break;
    case 'filter-random':
      break;
    case 'filter-discussed':
      break;
  }
});
