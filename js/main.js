import {generateImageDiscryptions} from './data.js';
import {drawPictures} from './pictures.js';
import {initForm} from './form.js';
import {initValidation} from './formValidationRules.js';
import {initBigPictureViewer} from './bigPicture.js';

initBigPictureViewer();
drawPictures(generateImageDiscryptions());
initValidation();
initForm();
