import '../../nouislider/nouislider.js';

const SCALE_DEFAULT = 100;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

const NoUiSliderProfile = {
  default: {
    range: {min: 0, max: 100},
    start: 100,
    step: 1,
    connect: 'lower',
  },
  chrome: {
    range: {min: 0, max: 1},
    start: 1,
    step: 0.1,
  },
  sepia: {
    range: {min: 0, max: 1},
    start: 1,
    step: 0.1,
  },
  marvin: {
    range: {min: 0, max: 100},
    start: 100,
    step: 1,
  },
  phobos: {
    range: {min: 0, max: 3},
    start: 3,
    step: 0.1,
  },
  heat: {
    range: {min: 1, max: 3},
    start: 3,
    step: 0.1,
  },
};

const uploadOverlay = document.querySelector('.img-upload__overlay');
const scaleSmallerButton = uploadOverlay.querySelector('.scale__control--smaller');
const scaleBiggerButton = uploadOverlay.querySelector('.scale__control--bigger');
const scaleInput = uploadOverlay.querySelector('.scale__control--value');
const imgUploadPreviewContainer = uploadOverlay.querySelector('.img-upload__preview');
const imgUploadPreview = imgUploadPreviewContainer.children[0];
const effectLevelSlider = uploadOverlay.querySelector('.effect-level__slider');
const effectLevel = uploadOverlay.querySelector('.effect-level__value');
const effectList = uploadOverlay.querySelector('.effects__list');

const ApplyImgEffect = {
  'effect-chrome': () => {
    imgUploadPreview.classList.add('effects__preview--chrome');
    effectLevelSlider.noUiSlider.updateOptions(NoUiSliderProfile.chrome);
  },
  'effect-sepia': () => {
    imgUploadPreview.classList.add('effects__preview--sepia');
    effectLevelSlider.noUiSlider.updateOptions(NoUiSliderProfile.sepia);
  },
  'effect-marvin': () => {
    imgUploadPreview.classList.add('effects__preview--marvin');
    effectLevelSlider.noUiSlider.updateOptions(NoUiSliderProfile.marvin);
  },
  'effect-phobos': () => {
    imgUploadPreview.classList.add('effects__preview--phobos');
    effectLevelSlider.noUiSlider.updateOptions(NoUiSliderProfile.phobos);
  },
  'effect-heat': () => {
    imgUploadPreview.classList.add('effects__preview--heat');
    effectLevelSlider.noUiSlider.updateOptions(NoUiSliderProfile.heat);
  },
};

const ApplyEffectLevel = {
  'effects__preview--chrome': () => {
    imgUploadPreview.style.filter = `grayscale(${effectLevel.value})`;
  },
  'effects__preview--sepia': () => {
    imgUploadPreview.style.filter = `sepia(${effectLevel.value})`;
  },
  'effects__preview--marvin': () => {
    imgUploadPreview.style.filter = `invert(${effectLevel.value}%)`;
  },
  'effects__preview--phobos': () => {
    imgUploadPreview.style.filter = `blur(${effectLevel.value}px)`;
  },
  'effects__preview--heat': () => {
    imgUploadPreview.style.filter = `brightness(${effectLevel.value})`;
  },
};

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

noUiSlider.create(effectLevelSlider, NoUiSliderProfile.default);

effectLevelSlider.style.display = 'none';

effectLevelSlider.noUiSlider.on('update', (values, handle) => {
  effectLevel.value = values[handle];
  effectLevel.dispatchEvent(new Event('change'));
});

effectLevel.addEventListener('change', () => {
  const currentEffect = imgUploadPreview.classList.value;
  ApplyEffectLevel[currentEffect]();
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

effectList.addEventListener('change', (evt) => {
  resetImgEffects();
  const selectedEffect = evt.target.id;
  if (selectedEffect !== 'effect-none') {
    effectLevelSlider.style.display = 'block';
    ApplyImgEffect[selectedEffect]();
  }
});

export {resetImgEffects};
