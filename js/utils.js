function randomInt(min, max) {// Результат: целое число из диапазона [min...max)
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

//просто shuffle взятый со stackoverflow
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce(callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

function addEscapeAction(event) {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      event();
    }
  });
}

export { randomInt, checkStringLength, debounce, shuffle, addEscapeAction };
