import '../../nouislider/nouislider.js';

const SCALE_DEFAULT = 100;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

const uploadOverlay = document.querySelector('.img-upload__overlay');
const scaleSmallerButton = uploadOverlay.querySelector('.scale__control--smaller');
const scaleBiggerButton = uploadOverlay.querySelector('.scale__control--bigger');
const scaleInput = uploadOverlay.querySelector('.scale__control--value');
const imgUploadPreviewContainer = uploadOverlay.querySelector('.img-upload__preview');
const imgUploadPreview = imgUploadPreviewContainer.children[0];
const effectLevelSlider = uploadOverlay.querySelector('.effect-level__slider');
const effectLevel = uploadOverlay.querySelector('.effect-level__value');
const effectList = uploadOverlay.querySelector('.effects__list');

/**
 * Обрабатывает события по нажатию на кнопки увеличения и уменьшения масштаба изображения.
 *
 * @param {Event} evt - событие 'click'
 */
const onScaleButtonClick = function (evt) {
  const currentScale = parseFloat(scaleInput.value);

  if (evt.target.classList.contains('scale__control--smaller')) {
    scaleInput.value = ((currentScale - SCALE_STEP) <= SCALE_MIN) ? `${SCALE_MIN}%` : `${currentScale - SCALE_STEP}%`;
  }
  else {
    scaleInput.value = ((currentScale + SCALE_STEP) >= SCALE_MAX) ? `${SCALE_MAX}%` : `${currentScale + SCALE_STEP}%`;
  }

  scaleInput.dispatchEvent(new Event('change'));
};

scaleSmallerButton.addEventListener('click', onScaleButtonClick);

scaleBiggerButton.addEventListener('click', onScaleButtonClick);

scaleInput.addEventListener('change', () => {
  imgUploadPreview.style.transform = `scale(${parseFloat(scaleInput.value) / 100})`;
});

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

effectLevelSlider.style.display = 'none';

effectLevelSlider.noUiSlider.on('update', (values, handle) => {
  effectLevel.value = values[handle];
  effectLevel.dispatchEvent(new Event('change'));
});

effectLevel.addEventListener('change', () => {
  switch (imgUploadPreview.classList.value) {
    case 'effects__preview--chrome':
      imgUploadPreview.style.filter = `grayscale(${effectLevel.value})`;
      break;
    case 'effects__preview--sepia':
      imgUploadPreview.style.filter = `sepia(${effectLevel.value})`;
      break;
    case 'effects__preview--marvin':
      imgUploadPreview.style.filter = `invert(${effectLevel.value}%)`;
      break;
    case 'effects__preview--phobos':
      imgUploadPreview.style.filter = `blur(${effectLevel.value}px)`;
      break;
    case 'effects__preview--heat':
      imgUploadPreview.style.filter = `brightness(${effectLevel.value})`;
      break;
  }
});

/**
 * Сбрасывает фильтры и масштаб изображения
 */
const resetImgEffects = function () {
  scaleInput.value = `${SCALE_DEFAULT}%`;
  imgUploadPreview.style.transform = `scale(${SCALE_DEFAULT / 100})`;
  imgUploadPreview.classList.value = '';
  imgUploadPreview.style.removeProperty('filter');
  effectLevelSlider.style.display = 'none';
};

/**
 * Обрабатывает событие по изменению выбора радиокнопки, отвечающей за наложение эффектов.
 * Добавляет эффект изображению и обновляет параметры noUiSlider в зависимости от выбора.
 *
 * @param {Event} evt - событие 'change'
 */
const onEffectListChange = function (evt) {
  resetImgEffects();
  if (evt.target.id !== 'effect-none') {
    effectLevelSlider.style.display = 'block';
  }

  switch (evt.target.id) {
    case 'effect-chrome':
      imgUploadPreview.classList.add('effects__preview--chrome');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      break;
    case 'effect-sepia':
      imgUploadPreview.classList.add('effects__preview--sepia');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      break;
    case 'effect-marvin':
      imgUploadPreview.classList.add('effects__preview--marvin');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      break;
    case 'effect-phobos':
      imgUploadPreview.classList.add('effects__preview--phobos');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
    case 'effect-heat':
      imgUploadPreview.classList.add('effects__preview--heat');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
  }
};

effectList.addEventListener('change', onEffectListChange);

export {resetImgEffects};
