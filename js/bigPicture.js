const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
let bigPictureIsShowed = false;

document.addEventListener('keydown', (evt) => {
  // на .big-picture не удается повесить этот обработчик
  if(evt.key === 'Escape' && bigPictureIsShowed) {
    closeBigPicture();
  }
});

closeButton.onclick = () => {
  closeBigPicture();
};

function closeBigPicture() {
  bigPictureIsShowed = false;
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
}

function createComment(comment) {
  const li = document.createElement('li');
  li.classList.add('social__comment');
  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  img.width = 35;
  img.height = 35;
  const p = document.createElement('p');
  li.appendChild(img);
  p.classList.add('social__text');
  p.textContent = comment.message;
  li.appendChild(p);
  return li;
}

function showBigPicture(imageData) {
  bigPictureIsShowed = true;
  bigPicture.classList.remove('hidden');
  const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  const socialCaption = bigPicture.querySelector('.social__caption');
  const socialComments = bigPicture.querySelector('.social__comments');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  const likes = bigPicture.querySelector('.likes-count');
  likes.textContent = imageData.likes;
  commentsCount.textContent = imageData.comments.length;
  socialComments.textContent = '';
  for(const comment of imageData.comments) {
    socialComments.appendChild(createComment(comment));
  }
  socialCaption.textContent = imageData.description;
  bigPictureImage.src = imageData.url;
  bigPictureImage.alt = imageData.description;
  document.querySelector('body').classList.add('modal-open');
  //прячем блоки
  commentsLoader.classList.add('hidden');
  socialComments.classList.add('hidden');
}

export {showBigPicture};
