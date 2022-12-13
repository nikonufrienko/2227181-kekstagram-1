import {setRecieverImagesFromServer} from './data.js';
import {initLoadedPictures} from './pictures.js';
import {initForm} from './form.js';
import {initValidation} from './formValidationRules.js';
import {initBigPictureViewer} from './bigPicture.js';

initBigPictureViewer();
initValidation();
initForm();
// Генерация случайных картинок
// drawPictures(generateImageDiscryptions());

setRecieverImagesFromServer(initLoadedPictures);
