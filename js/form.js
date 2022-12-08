const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const submitButton = document.querySelector('.img-upload__submit');
const fileInput = document.querySelector('#upload-file');
const imgPreview = document.querySelector('.img-upload__preview img');
const form = document.querySelector('.img-upload__form');
function prepairePreviews(){
  const fr = new FileReader();
  fr.onload = function () {
    imgPreview.src = fr.result;
  };
  fr.readAsDataURL(fileInput.files[0]);
}

function showImgUploadOverlay(){
  prepairePreviews();
  imgUploadOverlay.classList.remove('hidden');
}

function closeImgUploadOverlay() {
  if(isImgUploadOverlayShowed()) {
    imgUploadOverlay.classList.add('hidden');
    form.reset();
  }
}

function isImgUploadOverlayShowed() {
  return !imgUploadOverlay.classList.contains('hidden');
}

function blockSubmitButton() {
  if (!submitButton.hasAttribute('disabled')) {
    submitButton.toggleAttribute('disabled');
  }
}

function unblockSubmitButton() {
  if (submitButton.hasAttribute('disabled')) {
    submitButton.toggleAttribute('disabled');
  }
}

function initForm() {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    blockSubmitButton();
    /*...*/
    unblockSubmitButton();
    form.reset();
    closeImgUploadOverlay();
  });

  fileInput.addEventListener('change', () => {
    showImgUploadOverlay();
  });

  const closeButton = document.querySelector('.img-upload__cancel');

  closeButton.onclick = () => {
    closeImgUploadOverlay();
  };

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && isImgUploadOverlayShowed()) {
      closeImgUploadOverlay();
    }
  });
}

export { initForm };
