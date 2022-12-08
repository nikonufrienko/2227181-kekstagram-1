const sliderElement = document.querySelector('.effect-level__slider');
const imgPreview = document.querySelector('.img-upload__preview img');
const scalePlusButton = document.querySelector('.scale__control--bigger');
const scaleMinusButton = document.querySelector('.scale__control--smaller');
const scaleControlValue = document.querySelector('.scale__control--value');
const radioButtons = document.querySelectorAll('.effects__radio');
const form = document.querySelector('.img-upload__form');

let currentFilter = 'none';
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderOptions = {
  'chrome': {
    range: {
      min: 0,
      max: 1,
    },
    start: 0.5,
    step: 0.1,
    connect: 'lower'
  },
  'sepia': {
    range: {
      min: 0,
      max: 1,
    },
    start: 0.5,
    step: 0.1,
    connect: 'lower'
  },
  'marvin': {
    range: {
      min: 0,
      max: 100,
    },
    start: 80,
    step: 1,
    connect: 'lower'
  },
  'phobos': {
    range: {
      min: 0,
      max: 3,
    },
    start: 1.5,
    step: 0.3,
    connect: 'lower'
  },
  'heat': {
    range: {
      min: 0,
      max: 3,
    },
    start: 1.5,
    step: 0.3,
    connect: 'lower'
  }
};


const filterSetters = {
  'none': () => { imgPreview.style.filter = ''; },
  'chrome': (value) => { imgPreview.style.filter = `grayscale(${value})`; },
  'sepia': (value) => { imgPreview.style.filter = `sepia(${value})`; },
  'marvin': (value) => { imgPreview.style.filter = `invert(${value}%)`; },
  'phobos': (value) => { imgPreview.style.filter = `blur(${value}px)`; },
  'heat': (value) => { imgPreview.style.filter = `brightness(${value})`; }
};

function showSliderElement() {
  if (sliderElement.parentElement.classList.contains('hidden')) {
    sliderElement.parentElement.classList.remove('hidden');
  }
}
function hideSliderElement() {
  if (!sliderElement.parentElement.classList.contains('hidden')) {
    sliderElement.parentElement.classList.add('hidden');
  }
}

function updateSlider(filter) {
  currentFilter = filter;
  if (filter !== 'none') {
    showSliderElement();
    sliderElement.noUiSlider.updateOptions(sliderOptions[filter]);
    sliderElement.noUiSlider.set(sliderOptions[filter].start);
  } else {
    sliderElement.noUiSlider.set(0);
    hideSliderElement();
  }
}


function addToScale(value) {
  const oldValue = scaleControlValue.value.slice(0, scaleControlValue.value.length - 1);
  let newValue = value + Number(oldValue);
  if (newValue > 100) {
    newValue = 100;
  } else if (newValue < 25) {
    newValue = 25;
  }
  imgPreview.style.transform = `scale(${((newValue) / 100)})`;
  scaleControlValue.value = `${newValue}%`;
}

function updateEffectValue(value) {
  effectLevelValue.value = Number(value);
  filterSetters[currentFilter](value);
}

function reset() {
  //INITIAL SCALING
  addToScale(0);
  currentFilter = 'none';
  updateSlider(currentFilter);
}


function initEditing() {
  form.addEventListener('reset', reset);
  noUiSlider.create(sliderElement, sliderOptions['chrome']);

  sliderElement.noUiSlider.on('update', () => updateEffectValue(sliderElement.noUiSlider.get()));

  hideSliderElement();
  radioButtons.forEach((it) => {
    it.addEventListener('click', () => {
      updateSlider(it.value);
    }
    );
  });

  scalePlusButton.onclick = () => {
    addToScale(25);
  };

  scaleMinusButton.onclick = () => {
    addToScale(-25);
  };

  reset();
}

export { initEditing };
