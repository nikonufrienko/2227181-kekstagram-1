const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const likes = bigPicture.querySelector('.likes-count');
const commentsCurrentCount = bigPicture.querySelector('.comments-current-count'); 
let bigPictureIsShowed = false;

function initBigPictureViewer() {
  const closeButton = bigPicture.querySelector('.big-picture__cancel');
  document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape' && bigPictureIsShowed) {
      closeBigPicture();
    }
  });
  closeButton.onclick = () => {
    closeBigPicture();
  };
}

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

function showCommentsLoader() {
  if(commentsLoader.classList.contains('hidden')) {
    commentsLoader.classList.remove('hidden')
  }
}

function hideCommentsLoader() {
  if(!commentsLoader.classList.contains('hidden')) {
    commentsLoader.classList.add('hidden')
  }
}

function loadMoreComments(nextCommentInd, comments) {
  console.log("до этого было вывеедно:" + nextCommentInd);
  let commentCounter = 0;
  for(let i = 0; i < 5; i++) {
    if(i+nextCommentInd <  comments.length) {
      socialComments.appendChild(createComment(comments[i]));
      commentCounter++;
    }
  }
  commentsCurrentCount.textContent = nextCommentInd+commentCounter;
  console.log((nextCommentInd+commentCounter) + 'из' + comments.length)
  if((nextCommentInd+commentCounter) == comments.length) {
    console.log(comments.length + 'из' + (nextCommentInd+commentCounter))
    hideCommentsLoader();
    }
  return nextCommentInd+commentCounter;
}

function showBigPicture(imageData) {
  showCommentsLoader();
  bigPictureIsShowed = true;
  bigPicture.classList.remove('hidden');
  likes.textContent = imageData.likes;
  commentsCount.textContent = imageData.comments.length;
  socialComments.textContent = '';
  let nextCommentInd = loadMoreComments(0, imageData.comments);;
  commentsLoader.addEventListener('click', (evt) => {
    evt.preventDefault();
    nextCommentInd = loadMoreComments(nextCommentInd, imageData.comments);
  });
  socialCaption.textContent = imageData.description;
  bigPictureImage.src = imageData.url;
  bigPictureImage.alt = imageData.description;
  document.querySelector('body').classList.add('modal-open');
}

export {showBigPicture,initBigPictureViewer};
