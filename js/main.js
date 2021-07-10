import {setFilterDefault} from './img-filters.js';
import {setFilterRandom} from './img-filters.js';
import {setFilterDiscussed} from './img-filters.js';
import {renderThumbnails} from './thumbnails.js';
import {getRandomUniqueElements} from './utils.js';
import {debounce} from './utils/debounce.js';
import {getData} from './api.js';
import {showAlert} from './utils.js';
import './img-upload-form/show-form.js';
import './img-filters.js';

getData((photos) => {
  renderThumbnails(photos);
  setFilterDefault(debounce(() => renderThumbnails(photos)));
  setFilterRandom(debounce(() => {
    const randomPhotos = getRandomUniqueElements(photos);
    renderThumbnails(randomPhotos);
  }));
  setFilterDiscussed(debounce(() => {
    const sortedPhotos = photos.slice().sort((a, b) => b.comments.length - a.comments.length);
    renderThumbnails(sortedPhotos);
  }));
},
showAlert,
);
