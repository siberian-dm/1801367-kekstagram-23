import {renderThumbnails} from './thumbnails.js';
import {getData} from './api.js';
import {showAlert} from './utils.js';
import './img-upload-form/show-form.js';
import './img-filters.js';

getData(renderThumbnails, showAlert);
