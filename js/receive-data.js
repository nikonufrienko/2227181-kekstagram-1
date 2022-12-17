const SERVER_ADDRESS = 'https://26.javascript.pages.academy/kekstagram/data';

function showErrorLoading() {
  const footerElement = document.querySelector('footer');
  const divElement = document.createElement('div');
  divElement.classList.add('error_image_loading');
  const newElement = document.createElement('p');
  newElement.textContent = 'Ошибка загрузки изображений!';
  newElement.classList.add('error__title');
  divElement.appendChild(newElement);
  divElement.style.paddingTop = '200px';
  newElement.style.lineHeight='40px';
  newElement.style.textAlign='center';
  document.body.insertBefore(divElement,footerElement);
}

function hideErrorLoading() {
  const errorElement = document.querySelector('.error_image_loading');
  if(errorElement) {
    errorElement.remove();
  }
}

function setRecieverImagesFromServer(resultGetter) { //resultGetter
  //если изображения не загружаются, то и callback не вызывается
  fetch(SERVER_ADDRESS).then( (response) =>{
    if(response.ok){
      hideErrorLoading();
      return response.json();
    }
    throw new Error(`${response.status} — ${response.statusText}`);
  }).then((data) => resultGetter(data))
    .catch(() => showErrorLoading());
}

export { setRecieverImagesFromServer };
