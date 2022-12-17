import { resetEditor, initEditing } from './image-editing.js';
import {addEscapeAction} from './utils.js';
const SERVER_ADDRESS = 'https://26.javascript.pages.academy/kekstagram';

const hashtagInputElement = document.querySelector('.text__hashtags');
const descriptionElement = document.querySelector('.text__description');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const submitButtonElement = document.querySelector('.img-upload__submit');
const fileInputElement = document.querySelector('#upload-file');
const imgPreviewElement = document.querySelector('.img-upload__preview img');
const formElement = document.querySelector('.img-upload__form');

/*Задание 12.12 было ранее реализовано при выполнении задания 9.9*/

function prepairePreviews() {
  const fr = new FileReader();
  fr.onload = function () {
    imgPreviewElement.src = fr.result;
  };
  fr.readAsDataURL(fileInputElement.files[0]);
}

function showImgUploadOverlay() {
  prepairePreviews();
  imgUploadOverlayElement.classList.remove('hidden');
}

function reloadImage() {
  fileInputElement.value = '';
  fileInputElement.click();
  unblockSubmitButton();
}

function justRemoveResultOfSending() {
  const resultFormSendingElement = document.querySelector('.result_form_sending');
  resultFormSendingElement.remove();
  fileInputElement.value = '';
  unblockSubmitButton();
}

function hideImgUploadOverlay() {
  if (isImgUploadOverlayShowed()) {
    imgUploadOverlayElement.classList.add('hidden');
  }
}

function resetImgUploadOverlay() {
  formElement.reset(); //сброс формы
  unblockSubmitButton(); //разблокировка кнопки, если она заблокирована
  resetEditor(); //сброс редактирования
}

function closeImgUploadOverlay() {
  if (isImgUploadOverlayShowed()) {
    imgUploadOverlayElement.classList.add('hidden');
    resetImgUploadOverlay();
  }
}

function isImgUploadOverlayShowed() {
  return !imgUploadOverlayElement.classList.contains('hidden');
}

function blockSubmitButton() {
  if (!submitButtonElement.hasAttribute('disabled')) {
    submitButtonElement.toggleAttribute('disabled');
  }
}

function unblockSubmitButton() {
  if (submitButtonElement.hasAttribute('disabled')) {
    submitButtonElement.toggleAttribute('disabled');
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
  fetch(SERVER_ADDRESS, {
    method: 'POST',
    body: new FormData(formElement)
  }).then((response) => {
    if (response.ok) {
      showSucces();
    } else {
      throw new Error(`${response.status}`);
    }
  }).catch(() => showError());
}

function initForm() {

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    blockSubmitButton();
    startFormSending();
  });

  fileInputElement.addEventListener('change', () => {
    showImgUploadOverlay();
  });

  const closeButtonElement = document.querySelector('.img-upload__cancel');

  closeButtonElement.addEventListener('click', () => {
    closeImgUploadOverlay();
  });

  addEscapeAction(() => {
    if (hashtagInputElement !== document.activeElement && descriptionElement !== document.activeElement) {
      closeImgUploadOverlay();
    }
    const resultFormSendingElement = document.querySelector('.result_form_sending');
    if (resultFormSendingElement) {
      justRemoveResultOfSending();
    }
  });
  document.addEventListener('click', (e) => {
    const resultFormSendingElement = document.querySelector('.result_form_sending');
    if (resultFormSendingElement) {
      const div = resultFormSendingElement.querySelector('div');
      const withinBoundaries = e.composedPath().includes(div);
      if (!withinBoundaries) {
        justRemoveResultOfSending();
      }
    }
  });
  initEditing();
}

export { initForm };
