const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const fileInput = document.querySelector('#upload-file');
const form = document.querySelector('#upload-select-image');
const hashtagInput = document.querySelector('.text__hashtags');
// Pristine у меня ни в каком виде не работает (поэтому я и удалил папку с ней)

imgUploadOverlay.classList.remove('hidden');
function hideError() {
  const element = document.querySelector('.error_element');
  if(element) {
    element.remove();
  }
}

function errorIsShowed(inputElement) {
  return inputElement.parentElement.querySelector('.error_element') != null;
}

function showError(inputElement, error) {
  if(errorIsShowed(inputElement)){
    hideError();
  }
  const element = document.createElement('div');
  element.classList.add('error_element');
  element.textContent = error;
  console.log(element);
  console.log(inputElement.parentElement.children);
  inputElement.parentElement.appendChild(element);
  console.log(inputElement.parentElement.children);
}

function setAutoChecking(inputElement, checkFuncion, error){
  inputElement.addEventListener('input', () => {
    if(!checkFuncion(inputElement)) {
      showError(inputElement,error);
    } else {
      if(errorIsShowed(inputElement)){
        hideError();
      }
    }
  });
}

setAutoChecking(hashtagInput,
(it) => {
  const hashtags = it.value.split(' ');

  for(let hashtag of hashtags) {
    if(hashtag.length > 20) {
      return false;
    }
  }
  return true;
},
'Длина одного хэштега не должна превышать 20 символов!'
);

setAutoChecking(hashtagInput,
(it) => {
  const hashtags = it.value.split(' ');
  for(let hashtag of hashtags) {
    if(hashtag != '' && hashtags.filter(x => x==hashtag).length > 1) {
      return false;
    }
  }
  return true;
},
'Хэштеги не могут повторяться!'
);

function closeImgUploadOverlay(){
  imgUploadOverlay.classList.add('hidden');
}

function isImgUploadOverlayShowed() {
  return !imgUploadOverlay.classList.contains('hidden');
}

fileInput.addEventListener('change', () => {
   imgUploadOverlay.classList.remove('hidden');
});

const closeButton = document.querySelector('.img-upload__cancel');

closeButton.onclick = () => {
  closeImgUploadOverlay();
};

document.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape' && isImgUploadOverlayShowed()) {
    closeImgUploadOverlay();
  }
});


