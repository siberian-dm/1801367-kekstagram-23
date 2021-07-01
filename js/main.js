import {generatePhotos} from './mocks/photos.js';
import {renderThumbnails} from './thumbnails.js';
import {generateBigPicturesOpen} from './big-pictures.js';
import './img-upload-form/show-form.js';

const MAX_PHOTO_COUNT = 25;
const thumbnailsContainer = document.querySelector('.pictures');
const photoObjects = generatePhotos(MAX_PHOTO_COUNT);

renderThumbnails(photoObjects);

const thumbnails = thumbnailsContainer.querySelectorAll('.picture');

generateBigPicturesOpen(thumbnails, photoObjects);
