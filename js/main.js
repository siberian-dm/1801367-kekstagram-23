const getRandomInteger = function (firstNumber, secondNumber) {
  if (firstNumber < 0 || secondNumber < 0) {
    return false;
  }
  const min = Math.min(firstNumber, secondNumber);
  const max = Math.max(firstNumber, secondNumber) + 1;
  return Math.floor(Math.random() * (max - min) + min);
};

const checkString = function (string, maxLength) {
  return string.length <= maxLength;
};

getRandomInteger(100, 85);
checkString('any string', 10);
