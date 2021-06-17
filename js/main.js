import {generatePhotos} from './__mocks__/photos.js';
import {generateThumbnails} from './thumbnails.js';

const MAX_PHOTO_COUNT = 25;
const thumbnailsContainer = document.querySelector('.pictures');
const photoObjects = generatePhotos(MAX_PHOTO_COUNT);
const thumbnails = generateThumbnails(photoObjects);

thumbnailsContainer.appendChild(thumbnails);
