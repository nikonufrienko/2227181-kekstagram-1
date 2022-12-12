const sliderElement = document.querySelector('.effect-level__slider');
const imgPreview = document.querySelector('.img-upload__preview img');
const scalePlusButton = document.querySelector('.scale__control--bigger');
const scaleMinusButton = document.querySelector('.scale__control--smaller');
const scaleControlValue = document.querySelector('.scale__control--value');
const radioButtons = document.querySelectorAll('.effects__radio');
const effectLevelValue = document.querySelector('.effect-level__value');
const SCALE_STEP = 25;

let currentFilter = 'none';

const filterNames = {
  none : 'none',
  chrome : 'chrome',
  sepia : 'sepia',
  marvin : 'marvin',
  phobos : 'phobos',
  heat : 'heat'
};

const sliderOptions = {
  [filterNames.none]: {
    range: {
      min: 0,
      max: 0,
    },
    start: 0,
    step: 0,
    connect: 'lower'
  },
  [filterNames.chrome]: {
    range: {
      min: 0,
      max: 1,
    },
    start: 0.5,
    step: 0.1,
    connect: 'lower'
  },
  [filterNames.sepia]: {
    range: {
      min: 0,
      max: 1,
    },
    start: 0.5,
    step: 0.1,
    connect: 'lower'
  },
  [filterNames.marvin]: {
    range: {
      min: 0,
      max: 100,
    },
    start: 80,
    step: 1,
    connect: 'lower'
  },
  [filterNames.phobos]: {
    range: {
      min: 0,
      max: 3,
    },
    start: 1.5,
    step: 0.3,
    connect: 'lower'
  },
  [filterNames.heat]: {
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
  [filterNames.none]: () => { imgPreview.style.filter = ''; },
  [filterNames.chrome]: (value) => { imgPreview.style.filter = `grayscale(${value})`; },
  [filterNames.sepia]: (value) => { imgPreview.style.filter = `sepia(${value})`; },
  [filterNames.marvin]: (value) => { imgPreview.style.filter = `invert(${value}%)`; },
  [filterNames.phobos]: (value) => { imgPreview.style.filter = `blur(${value}px)`; },
  [filterNames.heat]: (value) => { imgPreview.style.filter = `brightness(${value})`; }
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
  if (filter === 'none') {
    sliderElement.noUiSlider.set(0);
    hideSliderElement();
  } else {
    showSliderElement();
    sliderElement.noUiSlider.updateOptions(sliderOptions[filter]);
    sliderElement.noUiSlider.set(sliderOptions[filter].start);
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

function resetEditor() {
  //INITIAL SCALING
  addToScale(0);
  currentFilter = 'none';
  updateSlider(currentFilter);
}


function initEditing() {
  noUiSlider.create(sliderElement, sliderOptions[filterNames.none]);

  sliderElement.noUiSlider.on('update', () => updateEffectValue(sliderElement.noUiSlider.get()));

  hideSliderElement();
  radioButtons.forEach((it) => {
    it.addEventListener('click', () => {
      updateSlider(it.value);
    });
  });

  scalePlusButton.addEventListener('click', () => {
    addToScale(SCALE_STEP);
  });

  scaleMinusButton.addEventListener('click', () => {
    addToScale(-SCALE_STEP);
  });
  resetEditor();
}

export { initEditing, resetEditor};
