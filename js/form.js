import { resetEditor, initEditing } from './imageEditing.js';
const serverAddress = 'https://26.javascript.pages.academy/kekstagram';
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const submitButton = document.querySelector('.img-upload__submit');
const fileInput = document.querySelector('#upload-file');
const imgPreview = document.querySelector('.img-upload__preview img');
const form = document.querySelector('.img-upload__form');

function prepairePreviews() {
  const fr = new FileReader();
  fr.onload = function () {
    imgPreview.src = fr.result;
  };
  fr.readAsDataURL(fileInput.files[0]);
}

function showImgUploadOverlay() {
  prepairePreviews();
  imgUploadOverlay.classList.remove('hidden');
}

function reloadImage() {
  fileInput.value = '';
  fileInput.click();
  unblockSubmitButton();
}

function justRemoveResultOfSending() {
  const resultFormSending = document.querySelector('.result_form_sending');
  resultFormSending.remove();
  fileInput.value = '';
  unblockSubmitButton();
}

function hideImgUploadOverlay() {
  if (isImgUploadOverlayShowed()) {
    imgUploadOverlay.classList.add('hidden');
  }
}

function resetImgUploadOverlay() {
  form.reset(); //сброс формы
  unblockSubmitButton(); //разблокировка кнопки, если она заблокирована
  resetEditor(); //сброс редактирования
}

function closeImgUploadOverlay() {
  if (isImgUploadOverlayShowed()) {
    imgUploadOverlay.classList.add('hidden');
    resetImgUploadOverlay();
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

function showSucces() {
  closeImgUploadOverlay();
  const template = document.querySelector('#success').content;
  const newElement = template.querySelector('.success').cloneNode(true);
  document.body.appendChild(newElement);
  newElement.classList.add('result_form_sending');
  newElement.querySelector('.success__button')
    .addEventListener('click', () => {
      newElement.remove();
    });
}

function showError() {
  hideImgUploadOverlay();
  const template = document.querySelector('#error').content;
  const newElement = template.querySelector('.error').cloneNode(true);
  document.body.appendChild(newElement);
  newElement.classList.add('result_form_sending');
  newElement.querySelector('.error__button')
    .addEventListener('click', () => {
      newElement.remove();
      reloadImage();
    });
}

function startFormSending() {
  fetch(serverAddress, {
    method: 'POST',
    body: new FormData(form)
  }).then((response) => {
    if (response.ok) {
      showSucces();
    } else {
      showError();
    }
    throw new Error(`${response.status}`);
  });
}

function initForm() {

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    blockSubmitButton();
    startFormSending();
  });

  fileInput.addEventListener('change', () => {
    showImgUploadOverlay();
  });

  const closeButton = document.querySelector('.img-upload__cancel');

  closeButton.addEventListener('click', () => {
    closeImgUploadOverlay();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && isImgUploadOverlayShowed()) {
      closeImgUploadOverlay();
    }
    const resultFormSending = document.querySelector('.result_form_sending');
    if (resultFormSending) {
      justRemoveResultOfSending();
    }
  });
  document.addEventListener('click', (e) => {
    const resultFormSending = document.querySelector('.result_form_sending');
    if (resultFormSending) {
      const div = resultFormSending.querySelector('div');
      const withinBoundaries = e.composedPath().includes(div);
      if (!withinBoundaries) {
        justRemoveResultOfSending();
      }
    }
  });
  initEditing();
}

export { initForm };
