import {setRecieverImagesFromServer} from './receive-data.js';
import {initLoadedPictures} from './pictures.js';
import {initForm} from './form.js';
import {initValidation} from './form-validation-rules.js';
import {initBigPictureViewer} from './big-picture.js';

initBigPictureViewer();
initValidation();
initForm();

setRecieverImagesFromServer(initLoadedPictures);
