import {addEscapeAction} from './utils.js';
const COMMENTS_LOAD_STEP = 5;
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img img');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCurrentCountElement = bigPictureElement.querySelector('.comments-current-count');
const commentTextFieldElement = document.querySelector('.social__footer-text');
let bigPictureIsShowed = false;

function initBigPictureViewer() {
  const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
  addEscapeAction(() => {
    if (bigPictureIsShowed && commentTextFieldElement !== document.activeElement) {
      closeBigPicture();
    }
  });
  closeButtonElement.addEventListener('click', () => {
    closeBigPicture();
  });
}

function closeBigPicture() {
  bigPictureIsShowed = false;
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentTextFieldElement.value = '';
}

function createComment(comment) {
  const liElement = document.createElement('li');
  liElement.classList.add('social__comment');
  const imgElement = document.createElement('img');
  imgElement.classList.add('social__picture');
  imgElement.src = comment.avatar;
  imgElement.alt = comment.name;
  imgElement.width = 35;
  imgElement.height = 35;
  const pElement = document.createElement('p');
  liElement.appendChild(imgElement);
  pElement.classList.add('social__text');
  pElement.textContent = comment.message;
  liElement.appendChild(pElement);
  return liElement;
}

function showCommentsLoader() {
  if (commentsLoaderElement.classList.contains('hidden')) {
    commentsLoaderElement.classList.remove('hidden');
  }
}

function hideCommentsLoader() {
  if (!commentsLoaderElement.classList.contains('hidden')) {
    commentsLoaderElement.classList.add('hidden');
  }
}

function loadMoreComments(nextCommentInd, comments) {
  let commentCounter = 0;
  for (let i = 0; i < COMMENTS_LOAD_STEP; i++) {
    if (i + nextCommentInd < comments.length) {
      socialCommentsElement.appendChild(createComment(comments[i]));
      commentCounter++;
    }
  }
  commentsCurrentCountElement.textContent = nextCommentInd + commentCounter;
  if ((nextCommentInd + commentCounter) === comments.length) {
    hideCommentsLoader();
  }
  return nextCommentInd + commentCounter;
}

function showBigPicture(imageData) {
  showCommentsLoader();
  bigPictureIsShowed = true;
  bigPictureElement.classList.remove('hidden');
  likesCountElement.textContent = imageData.likes;
  commentsCountElement.textContent = imageData.comments.length;
  socialCommentsElement.textContent = '';
  let nextCommentInd = loadMoreComments(0, imageData.comments);
  commentsLoaderElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    nextCommentInd = loadMoreComments(nextCommentInd, imageData.comments);
  });
  socialCaptionElement.textContent = imageData.description;
  bigPictureImageElement.src = imageData.url;
  bigPictureImageElement.alt = imageData.description;
  document.querySelector('body').classList.add('modal-open');
}

export { showBigPicture, initBigPictureViewer };
