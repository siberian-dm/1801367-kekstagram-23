const PHOTO_COUNT = 25;

const FAKE_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const FAKE_NAMES = [
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

const FAKE_DESCRIPTIONS = [
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

// const checkString = function (string, maxLength) {
//   return string.length <= maxLength;
// };

const getRandomInteger = function (firstNumber, secondNumber) {
  if (firstNumber < 0 || secondNumber < 0) {
    return false;
  }
  const min = Math.min(firstNumber, secondNumber);
  const max = Math.max(firstNumber, secondNumber) + 1;
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomArrayElement = function (elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
};

const usedNumber = [];

const getUniqueNumber = function (min, max) {
  let uniqueNumber;
  do {
    uniqueNumber = getRandomInteger(min, max);
  } while (usedNumber.includes(uniqueNumber));

  usedNumber.push(uniqueNumber);

  return uniqueNumber;
};

const usedUrl = [];

const getUniqueUrl = function (max) {
  let uniqueUrl;
  do {
    uniqueUrl = `photos/${ getRandomInteger(1, max) }.jpg`;
  } while (usedUrl.includes(uniqueUrl));

  usedUrl.push(uniqueUrl);

  return uniqueUrl;
};

const createComment = function () {
  return {
    id: getUniqueNumber(PHOTO_COUNT + 1, 1000),
    avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
    message: getRandomArrayElement(FAKE_COMMENTS),
    name: getRandomArrayElement(FAKE_NAMES),

  };
};

const createPhoto = function () {
  return {
    id: getUniqueNumber(1, PHOTO_COUNT),
    url: getUniqueUrl(PHOTO_COUNT),
    description: getRandomArrayElement(FAKE_DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: new Array(getRandomInteger(1, 4)).fill(null).map(createComment),
  };
};

const similiarPhotos = new Array(PHOTO_COUNT).fill(null).map(createPhoto);

// eslint-disable-next-line no-console
console.log(similiarPhotos);
