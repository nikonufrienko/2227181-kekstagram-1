import {randomInt} from './utils.js';

function generateComments() {
  const commentsNumber = randomInt(1, 10);//от 1 до 10 не включая
  const commentsVariants = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.','В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  const names = ['Артём', 'Николай', 'Сергей', 'Валерий', 'Константин', 'Светлана', 'Виктория'];
  const comments = [];
  const idList = [];
  for(let i = 0; i < commentsNumber; i++) {
    let id;
    do {
      id = randomInt(0, 1000);
    } while(idList.indexOf(id) !== -1);
    idList.push(id);
    const imageNumber = randomInt(0,6)+1;
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


function generateImageDiscryption() {
  const imageDescriptions = [];
  for(let i = 1; i <= 25; i++) {
    const result = {
      id: i,
      url: `photos/${i}.jpg`,
      description: 'Описание отсутсвует',
      likes: randomInt(15,201),
      comments: [generateComments()]
    };
    imageDescriptions.push(result);
  }
  return imageDescriptions;
}

export {generateImageDiscryption};
