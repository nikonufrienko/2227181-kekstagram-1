import {showBigPicture} from './big-picture.js';
import {shuffle, debounce} from './utils.js';

let loadedPictures = {};

function generatePicture(pictureData){
  const template = document.querySelector('#picture').content;
  const newElement = template.querySelector('.picture').cloneNode(true);
  const imageElement = newElement.querySelector('.picture__img');
  const commentsElement = newElement.querySelector('.picture__comments');
  const likesElement = newElement.querySelector('.picture__likes');
  likesElement.textContent = pictureData.likes;
  imageElement.src = pictureData.url;
  imageElement.alt = pictureData.description;
  commentsElement.textContent = pictureData.comments.length;
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
  const picturesContainerElement = document.querySelector('.pictures');
  picturesContainerElement.querySelectorAll('.picture').forEach((it) => it.remove());
}

const FilterNames = {
  default : 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed'
};


function applyFilter(filter) {
  removePictures();
  switch(filter) {
    case FilterNames.default:
      drawPictures(loadedPictures);
      break;
    case FilterNames.random:
      drawPictures(shuffle(loadedPictures.slice(10)));
      break;
    case FilterNames.discussed: {
      const loadedPicturesCopied = loadedPictures.slice();
      loadedPicturesCopied.sort((a,b) => b.comments.length - a.comments.length);
      drawPictures(loadedPicturesCopied);
    }
      break;
  }
}

function showFilters() {
  const filtersElement = document.querySelector('.img-filters');
  if(filtersElement.classList.contains('img-filters--inactive')) {
    filtersElement.classList.remove('img-filters--inactive');
  }
  const filtersButtons = filtersElement.querySelectorAll('.img-filters__button');

  const changePosition = debounce((it) => {
    applyFilter(it.id);
    filtersButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
    it.classList.add('img-filters__button--active');
  });

  filtersButtons.forEach( (it) =>{
    it.addEventListener('click', () => {
      changePosition(it);
    });
  });
}

function initLoadedPictures(picturesData) {
  loadedPictures = picturesData;
  drawPictures(picturesData);
  showFilters();
}
export {initLoadedPictures};
