const ALERT_SHOW_TIME = 5000;
const RANDOM_ELEMENTS_AMOUNT = 10;

/**
 * Выводит сообщение об ошибке в верхней части экрана.
 * По истечении заданного времени закрывается.
 *
 * @param {string} message - строка, содержащая ошибку
 */
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#ff4e4e';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

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
 * Принимает массив элементов, возвращает массив случайных уникальных элементов из исходного массива.
 *
 * @param {Array} elements - массив элементов
 * @return {Array}
 */
const getRandomUniqueElements = function (elements) {
  const uniqueElements = [];
  if (RANDOM_ELEMENTS_AMOUNT > elements.length) {
    throw new Error('Количество случайных элементов не может больше исходного массива элементов!');
  }

  let randomIndex;
  while (uniqueElements.length < RANDOM_ELEMENTS_AMOUNT) {
    randomIndex = getRandomInteger(0, elements.length -1);

    if (!uniqueElements.includes(elements[randomIndex])) {
      uniqueElements.push(elements[randomIndex]);
    }
  }

  return uniqueElements;
};

/**
 * Возвращает результат проверки - нажата ли клавиша Escape.
 *
 * @param {Event} evt - событие 'keydown'
 * @return {boolean}
 */
const isEscapeEvent = function (evt) {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

export {showAlert, getRandomUniqueElements, isEscapeEvent};
