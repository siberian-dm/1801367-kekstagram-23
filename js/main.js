import {setFilter} from './img-filters.js';
import {renderThumbnails} from './thumbnails.js';
import {debounce} from './utils/debounce.js';
import {getData} from './utils/api.js';
import {showAlert} from './utils/utils.js';
import './img-upload-form/show-form.js';
import './img-filters.js';

getData((data) => {
  renderThumbnails(data);
  setFilter(data, debounce(renderThumbnails));
},
showAlert,
);
