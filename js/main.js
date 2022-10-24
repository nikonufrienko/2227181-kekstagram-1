function randomInt(min, max) {// Результат: целое число из диапазона "[min...max)"
  // при min > max границы меняются местами
  const rangeSize = max - min;
  if (min > max) {
    return Math.floor(Math.random() * -rangeSize) + max;
  }
  return Math.floor(Math.random() * rangeSize) + min;
}

function checkStringLength(str, maxLength) { // Результат: true, если строка проходит по длине, и false — если не проходит
  return str.length <= maxLength;
}

// иначе будет ошибка "... is defined but never used")
randomInt(0, 10);
checkStringLength('abcd', 3);
