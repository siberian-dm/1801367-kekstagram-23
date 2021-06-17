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

export {getRandomInteger, getRandomArrayElement};
