const SCALE_STEP = 25;

const sliderElement = document.querySelector('.effect-level__slider');
const imgPreviewElement = document.querySelector('.img-upload__preview img');
const scalePlusButtonElement = document.querySelector('.scale__control--bigger');
const scaleMinusButtonElement = document.querySelector('.scale__control--smaller');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const radioButtonsElement = document.querySelectorAll('.effects__radio');
const effectLevelValueElement = document.querySelector('.effect-level__value');

let currentFilter = 'none';

const FilterNames = {
  none : 'none',
  chrome : 'chrome',
  sepia : 'sepia',
  marvin : 'marvin',
  phobos : 'phobos',
  heat : 'heat'
};

const sliderOptions = {
  [FilterNames.none]: {
    range: {
      min: 0,
      max: 0,
    },
    start: 0,
    step: 0,
    connect: 'lower'
  },
  [FilterNames.chrome]: {
    range: {
      min: 0,
      max: 1,
    },
    start: 0.5,
    step: 0.1,
    connect: 'lower'
  },
  [FilterNames.sepia]: {
    range: {
      min: 0,
      max: 1,
    },
    start: 0.5,
    step: 0.1,
    connect: 'lower'
  },
  [FilterNames.marvin]: {
    range: {
      min: 0,
      max: 100,
    },
    start: 80,
    step: 1,
    connect: 'lower'
  },
  [FilterNames.phobos]: {
    range: {
      min: 0,
      max: 3,
    },
    start: 1.5,
    step: 0.3,
    connect: 'lower'
  },
  [FilterNames.heat]: {
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
  [FilterNames.none]: () => { imgPreviewElement.style.filter = ''; },
  [FilterNames.chrome]: (value) => { imgPreviewElement.style.filter = `grayscale(${value})`; },
  [FilterNames.sepia]: (value) => { imgPreviewElement.style.filter = `sepia(${value})`; },
  [FilterNames.marvin]: (value) => { imgPreviewElement.style.filter = `invert(${value}%)`; },
  [FilterNames.phobos]: (value) => { imgPreviewElement.style.filter = `blur(${value}px)`; },
  [FilterNames.heat]: (value) => { imgPreviewElement.style.filter = `brightness(${value})`; }
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
  const oldValue = scaleControlValueElement.value.slice(0, scaleControlValueElement.value.length - 1);
  let newValue = value + Number(oldValue);
  if (newValue > 100) {
    newValue = 100;
  } else if (newValue < 25) {
    newValue = 25;
  }
  imgPreviewElement.style.transform = `scale(${((newValue) / 100)})`;
  scaleControlValueElement.value = `${newValue}%`;
}

function updateEffectValue(value) {
  effectLevelValueElement.value = Number(value);
  filterSetters[currentFilter](value);
}

function resetEditor() {
  //INITIAL SCALING
  addToScale(0);
  currentFilter = 'none';
  updateSlider(currentFilter);
}


function initEditing() {
  noUiSlider.create(sliderElement, sliderOptions[FilterNames.none]);
  sliderElement.noUiSlider.on('update', () => updateEffectValue(sliderElement.noUiSlider.get()));

  hideSliderElement();
  radioButtonsElement.forEach((it) => {
    it.addEventListener('click', () => {
      updateSlider(it.value);
    });
  });

  scalePlusButtonElement.addEventListener('click', () => {
    addToScale(SCALE_STEP);
  });

  scaleMinusButtonElement.addEventListener('click', () => {
    addToScale(-SCALE_STEP);
  });
  resetEditor();
}

export { initEditing, resetEditor};
