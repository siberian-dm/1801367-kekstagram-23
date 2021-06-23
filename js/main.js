import {generatePhotos} from './__mocks__/photos.js';
import {generateThumbnails} from './thumbnails.js';
import {generateBigPicturesOpen} from './big-pictures.js';
import './img-upload-form.js';

const MAX_PHOTO_COUNT = 25;
const thumbnailsContainer = document.querySelector('.pictures');
const photoObjects = generatePhotos(MAX_PHOTO_COUNT);
const thumbnailsFragment = generateThumbnails(photoObjects);

thumbnailsContainer.appendChild(thumbnailsFragment);

const thumbnails = thumbnailsContainer.querySelectorAll('.picture');

generateBigPicturesOpen(thumbnails, photoObjects);
