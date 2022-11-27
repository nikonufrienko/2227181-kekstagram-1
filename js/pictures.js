import {generateImageDiscryptions} from './data.js';
import {showBigPicture} from './bigPicture.js';

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
    picture.onclick = () => {
      showBigPicture(pictureData);
    };
    picturesContainer.appendChild(picture);
  }
}

drawPictures(generateImageDiscryptions());

export {drawPictures};
