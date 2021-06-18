const bigPictureOverlay = document.querySelector('.big-picture');
const cancelButton = bigPictureOverlay.querySelector('.big-picture__cancel');
const bigPictureContainer = bigPictureOverlay.querySelector('.big-picture__img');
const likesCount = bigPictureOverlay.querySelector('.likes-count');
const socialCommentsCount = bigPictureOverlay.querySelector('.social__comment-count');
const commentsCount = socialCommentsCount.querySelector('.comments-count');
const socialComments = bigPictureOverlay.querySelector('.social__comments');
const photoDescription = bigPictureOverlay.querySelector('.social__caption');
const loadCommentsButton = bigPictureOverlay.querySelector('.comments-loader');

cancelButton.addEventListener('click', () => {
  bigPictureOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    bigPictureOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

const addCommentsHandler = function (thumbnail, photo) {
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    for (const comment of socialComments.querySelectorAll('.social__comment')) {
      comment.remove();
    }
    const commentsFragment = document.createDocumentFragment();

    for (const comment of photo.comments) {
      const socialComment = document.createElement('li');
      socialComment.classList.add('social__comment');

      const socialPicture = document.createElement('img');
      socialPicture.classList.add('social__picture');
      socialPicture.src = comment.avatar;
      socialPicture.alt = comment.name;

      const socialText = document.createElement('p');
      socialText.classList.add('social__text');
      socialText.textContent = comment.message;

      socialComment.appendChild(socialPicture);
      socialComment.appendChild(socialText);

      commentsFragment.appendChild(socialComment);
    }

    socialComments.appendChild(commentsFragment);
  });
};

const addBigPictureOpenHandler = function (thumbnail, photo) {
  const bigPicture = bigPictureContainer.children[0];
  const thumbnailImg = thumbnail.querySelector('.picture__img');
  const thumbnailLikes = thumbnail.querySelector('.picture__likes');
  const thumbnailComments = thumbnail.querySelector('.picture__comments');

  thumbnail.addEventListener('click', () => {
    bigPictureOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    socialCommentsCount.classList.add('hidden');
    loadCommentsButton.classList.add('hidden');

    bigPicture.src = thumbnailImg.src;
    likesCount.textContent = thumbnailLikes.textContent;
    commentsCount.textContent = thumbnailComments.textContent;
    photoDescription.textContent = photo.description;
  });
};

const generateBigPicturesOpen = function (thumbnails, photoObjects) {
  for (let i = 0; i < thumbnails.length; i++) {
    addCommentsHandler(thumbnails[i], photoObjects[i]);
    addBigPictureOpenHandler(thumbnails[i], photoObjects[i]);
  }
};

export {generateBigPicturesOpen};
