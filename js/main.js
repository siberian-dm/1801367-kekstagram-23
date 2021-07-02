import {generatePhotos} from './mocks/photos.js';
import {renderThumbnails} from './thumbnails.js';
import './img-upload-form/show-form.js';

const MAX_PHOTO_COUNT = 25;

const photoObjects = generatePhotos(MAX_PHOTO_COUNT);

renderThumbnails(photoObjects);
