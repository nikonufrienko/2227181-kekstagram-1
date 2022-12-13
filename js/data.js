import { randomInt } from './utils.js';

const serverAddress = 'https://26.javascript.pages.academy/kekstagram/data';

const commentsVariants = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const names = ['Артём', 'Николай', 'Сергей', 'Валерий', 'Константин', 'Светлана', 'Виктория'];

function generateComments() {
  const commentsNumber = randomInt(1, 10);//от 1 до 10 не включая
  const comments = [];
  const idList = [];
  for (let i = 0; i < commentsNumber; i++) {
    let id;
    do {
      id = randomInt(0, 1000);
    } while (idList.indexOf(id) !== -1);
    idList.push(id);
    const imageNumber = randomInt(0, 6) + 1;
    const comment = {
      id: id,
      avatar: `img/avatar-${imageNumber}.svg`,
      message: commentsVariants[randomInt(0, commentsVariants.length)],
      name: names[randomInt(0, names.length)]
    };
    comments.push(comment);
  }
  return comments;
}


function generateImageDiscryptions() {
  const imageDescriptions = [];
  for (let i = 1; i <= 25; i++) {
    const result = {
      id: i,
      url: `photos/${i}.jpg`,
      description: 'Описание отсутсвует',
      likes: randomInt(15, 201),
      comments: generateComments()
    };
    imageDescriptions.push(result);
  }
  return imageDescriptions;
}

function showErrorLoading() {
  const footer = document.querySelector('footer');
  const div = document.createElement('div');
  div.classList.add('error_image_loading');
  const newElement = document.createElement('p');
  newElement.textContent = 'Ошибка загрузки изображений!';
  newElement.classList.add('error__title');
  div.appendChild(newElement);
  div.style.paddingTop = '200px';
  newElement.style.lineHeight='40px';
  newElement.style.textAlign='center';
  document.body.insertBefore(div,footer);
}

function hideErrorLoading() {
  const errorElement = document.querySelector('.error_image_loading');
  if(errorElement) {
    errorElement.remove();
  }
}

function setRecieverImagesFromServer(resultGetter) { //resultGetter
  fetch(serverAddress).then( (response) =>{
    if(response.ok){
      hideErrorLoading();
      return response.json();
    }
    throw new Error(`${response.status} — ${response.statusText}`);
  }).then((data) => resultGetter(data))
    .catch(() => showErrorLoading());
}

export { generateImageDiscryptions, setRecieverImagesFromServer };
