import {COMMENTS, NAMES, DESCRIPTIONS} from './vars.js';
import {getRandomInteger, getRandomArrayElement} from '../utils.js';


/**
 * Возвращает объект 'Комментарий для фото'
 *
 * @param {number} photoId - свойство id объекта 'Фото'
 * @param {number} commentIndex - индекс элемента массива в свойстве comments объекта 'Фото'
 * @return {Object}
 */
const createComment = function (photoId, commentIndex) {
  const uniqueId = +`${photoId}${commentIndex}`;
  return {
    id: uniqueId,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES),
  };
};

/**
 * Возвращает объект 'Фото'
 *
 * @param {number} photoId - уникальный идентификатор объекта (индекс элемента в цикле)
 * @return {Object}
 */
const createPhoto = function (photoId) {
  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: new Array(getRandomInteger(1, 5)).fill(photoId).map(createComment),
  };
};

/**
 * Возвращает массив объектов 'Фото'
 *
 * @param {number} numberPhotos - заданное количество объектов
 * @return {Array}
 */
const generatePhotos = function (numberPhotos) {
  const photos = [];
  for (let i = 1; i <= numberPhotos; i++) {
    photos.push(createPhoto(i));
  }
  return photos;
};

export {generatePhotos};
