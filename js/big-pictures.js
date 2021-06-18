
const bigPictureOverlay = document.querySelector('.big-picture');
const photo = bigPictureOverlay.querySelector('.big-picture__img');
const likesCount = bigPictureOverlay.querySelector('.likes-count');
const socialCommentsCount = bigPictureOverlay.querySelector('.social__comment-count');
const commentsCount = socialCommentsCount.querySelector('.comments-count');
const socialComments = bigPictureOverlay.querySelector('.social__comments');
const photoDescription = bigPictureOverlay.querySelector('.social__caption');
const loadCommentsButton = bigPictureOverlay.querySelector('.comments-loader');


const addBigPictureOpenHandler = function (thumbnail) {
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
  });
};

const generateBigPicturesOpen = function (thumbnails) {
  for (let i = 0; i < thumbnails.length; i++) {
    addBigPictureOpenHandler(thumbnails[i]);
  }
};

export {generateBigPicturesOpen};
