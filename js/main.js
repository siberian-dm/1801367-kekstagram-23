const PHOTO_COUNT = 25;

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Артём',
  'Лёха',
  'Саня',
  'Маслёнок',
  'Николай',
  'Константин Петрович',
  'Мигель Иванович',
  'Шанхай Петрович',
  'Керосин',
  'Клаус',
];

const DESCRIPTIONS = [
  'Достаточной близости радиозвезд их расстояний и была выдвинута гипотеза.',
  'Отелло рассвирипело и нижегородские собака.',
  'Клетке сидит мой пернатый друг на камешке, а в любви.',
  'Горницу вошел негр, румяный с изображением натюрморта как веник форточку ворвался.',
  'Ольгу на анне карениной трактор мчался.',
  'Луч солнца и четырёх пар.',
  'Hе многие люди могли бы так сделать!',
  'Ходила на меня напала мысль слова дура боец вспомнил.',
  'Мушкетеры не слышала от страха невиданное зрелище была маша ногами.',
  'Французские слова, кроме вороны тело млекопитающего состоит из под пальмой.',
];

/**
* Возвращает случайное целое число из заданного диапозона положительных чисел
*
* @param {number} firstNumber - начало/конец диапозона
* @param {number} secondNumber - начало/конец диапозона
* @return {number}
*/
const getRandomInteger = function (firstNumber, secondNumber) {
  if (firstNumber < 0 || secondNumber < 0) {
    return false;
  }
  const min = Math.min(firstNumber, secondNumber);
  const max = Math.max(firstNumber, secondNumber) + 1;
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Возвращает случайный элемент массива
 *
 * @param {Array} elements - массив элементов
 * @return {arrayItem}
 */
const getRandomArrayElement = function (elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
};

/**
 * Возвращает объект 'Комментарий для фото'
 *
 * @param {number} photoId - свойство id объекта 'Фото'
 * @param {number} commentIndex - индекс элемента массива в свойстве comments объекта 'Фото'
 * @return {Object}
 */
const createComment = function (photoId, commentIndex) {
  const uniqueNumber = +`${  photoId  }${  commentIndex  }${getRandomInteger(1, 9)}`;
  return {
    id: uniqueNumber,
    avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES),
  };
};

/**
 * Возвращает объект 'Фото'
 *
 * @param {any} arrayItem - не используется, нужен чтобы передать в функцию второй аргумент метода map() - index
 * @param {number} itemIndex - индекс текущего обрабатываемого элемента в массиве 'similiarPhotos' методом map()
 * @return {Object}
 */
const createPhoto = function (arrayItem, itemIndex) {
  const photoId = itemIndex + 1;
  return {
    id: photoId,
    url: `photos/${ photoId }.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: new Array(getRandomInteger(1, 4)).fill(photoId).map(createComment),
  };
};

const similiarPhotos = new Array(PHOTO_COUNT).fill(null).map(createPhoto);

// eslint-disable-next-line no-console
console.log(similiarPhotos);
