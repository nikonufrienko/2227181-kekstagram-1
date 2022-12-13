import {showBigPicture} from './bigPicture.js';
import {debounce, shuffle} from './utils.js';

let loadedPictures = {};

function generatePicture(pictureData){
  const template = document.querySelector('#picture').content;
  const newElement = template.querySelector('.picture').cloneNode(true);
  const image = newElement.querySelector('.picture__img');
  const comments = newElement.querySelector('.picture__comments');
  const likes = newElement.querySelector('.picture__likes');
  likes.textContent = pictureData.likes;
  image.src = pictureData.url;
  image.alt = pictureData.description;
  comments.textContent = pictureData.comments.length;
  return newElement;
}

function drawPictures(picturesData) {
  const picturesContainer = document.querySelector('.pictures');
  for(const pictureData of picturesData) {
    const picture = generatePicture(pictureData);
    picture.addEventListener('click', () => {
      showBigPicture(pictureData);
    });
    picturesContainer.appendChild(picture);
  }
}

function removePictures() {
  const picturesContainer = document.querySelector('.pictures');
  picturesContainer.querySelectorAll('.picture').forEach((it) => it.remove());
}

function applyFilter(filter) {
  removePictures();
  if(filter === 'filter-default') {
    drawPictures(loadedPictures);
  } else if(filter === 'filter-random') {
    drawPictures(shuffle(loadedPictures.slice(10)));
  } else if(filter === 'filter-discussed') {
    const loadedPicturesCopied = loadedPictures.slice();
    loadedPicturesCopied.sort((a,b) => b.comments.length - a.comments.length);
    drawPictures(loadedPicturesCopied);
  }
}


function showFilters() {
  const filters = document.querySelector('.img-filters');
  if(filters.classList.contains('img-filters--inactive')) {
    filters.classList.remove('img-filters--inactive');
  }
  const filtersButtons = filters.querySelectorAll('.img-filters__button');
  filtersButtons.forEach( (it) =>{
    const changePosition = debounce(() => {
      applyFilter(it.id);
      filtersButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
      it.classList.add('img-filters__button--active');
    });
    it.addEventListener('click', () => {
      changePosition();
    });
  });
}

function initLoadedPictures(picturesData) {
  loadedPictures = picturesData;
  drawPictures(picturesData);
  showFilters();
}
export {initLoadedPictures};
