import {renderThumbnails} from './thumbnails.js';
import {getData} from './api.js';
import {showAlert} from './utils.js';
import './img-upload-form/show-form.js';

getData(renderThumbnails, showAlert);
