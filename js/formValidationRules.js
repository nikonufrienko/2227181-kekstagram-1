import { AutoChecker } from './validator.js';
const hashtagInput = document.querySelector('.text__hashtags');
const submitButton = document.querySelector('#upload-submit');
const description = document.querySelector('.text__description');

const hashtagsValidationMsg = {
  wrongMinLen: 'Хэштеги не могут быть пустыми!',
  wrongValue: 'Хэштеги могут содержать только буквы и цифры + символы нижнего подчеркивания.',
  wrongMaxLen: 'Длина одного хэштега не должна превышать 20 символов!',
  wrongFirstSymbol: 'Хэштег должен начинаться с "#"!',
  repeatingError: 'Хэштеги не могут повторяться!',
};

const descriptionValidationMsg = {
  wrongMaxLen: 'Длина комментария не может составлять больше 140 символов!'
};

const validationConditions = {
  repeatingError: (it, hashtags) => !(it.length > 1 && it[0] === '#' && hashtags.filter((x) => x === it).length > 1),
  wrongMaxLen: (it) => !(it.length > 20),
  wrongMinLen: (it) => !(it.length === 1 && it[0] === '#'),
  wrongFirstSymbol: (it) => !(it[0] !== '#' && it.length >= 1),
  wrongValue: (it) => !(it.length > 1 && it[0] === '#' && !new RegExp('^#[A-zА-я0-9_]*$').test(it)),
};

function initValidation() {
  const hashtagAutoChecker = new AutoChecker(hashtagInput, submitButton);
  for (const key in hashtagsValidationMsg) {
    hashtagAutoChecker.setAutoChecking((it) => {
      const hashtags = it.value.split(' ');
      return hashtags.every((hashtag) => validationConditions[key](hashtag, hashtags));
    },
    hashtagsValidationMsg[key]
    );
  }
  const descriptionAutoChecker = new AutoChecker(description, submitButton);

  descriptionAutoChecker.setAutoChecking((it) => it.value.length <= 140, descriptionValidationMsg.wrongMaxLen);
}

export { initValidation };

