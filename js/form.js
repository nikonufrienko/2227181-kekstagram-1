const imgUploadOverlay = document.querySelector('.img-upload__overlay');

function closeImgUploadOverlay(){
  imgUploadOverlay.classList.add('hidden');
}

function isImgUploadOverlayShowed() {
  return !imgUploadOverlay.classList.contains('hidden');
}

function initForm() {
  const fileInput = document.querySelector('#upload-file');

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
