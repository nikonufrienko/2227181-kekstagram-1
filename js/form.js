const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const submitButton = document.querySelector('.img-upload__submit');

function closeImgUploadOverlay(){
  imgUploadOverlay.classList.add('hidden');
}

function isImgUploadOverlayShowed() {
  return !imgUploadOverlay.classList.contains('hidden');
}

function blockSubmitButton() {
  if(!submitButton.hasAttribute('disabled')) {
    submitButton.toggleAttribute('disabled');
  }
}

function unblockSubmitButton() {
  if(submitButton.hasAttribute('disabled')) {
    submitButton.toggleAttribute('disabled');
  }
}

function initForm() {
  const fileInput = document.querySelector('#upload-file');
  const form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    blockSubmitButton();
    //...
    unblockSubmitButton();
    form.reset();
    closeImgUploadOverlay();
  });
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
}

export {initForm};
