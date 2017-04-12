/**
 * DOM-элементы, которые используются для переключения режимов
 * @type {Object}
 * @constant
 */
const ELEMENTS = {
  body: document.querySelector('body'),
  solarSystem: document.querySelector('.solar-system'),
  mode2d: document.querySelector('input.modes-2d'),
  mode3d: document.querySelector('input.modes-3d'),
  mode3dWithPerspective: document.querySelector('input.modes-3d-perspective'),
};

/**
 * Названия классов применение которых активирует 3D
 * @type {Object}
 * @constant
 */
const CLASSES = {
  mode3d: 'mode-3d',
  perspective: 'perspective',
};

/**
 * Включение режима '3D'
 * @param  {Boolean} withPerspective Признак включения перспективы
 */
const set3DdMode = (withPerspective) => {
  ELEMENTS.body.classList.add(CLASSES.mode3d);

  if (withPerspective) {
    ELEMENTS.mode3dWithPerspective.checked = true;
    ELEMENTS.body.classList.add(CLASSES.perspective);
  } else {
    ELEMENTS.mode3d.checked = true;
    ELEMENTS.body.classList.remove(CLASSES.perspective);
  }
};

/**
 * Включение режима '2D'
 */
const set2DdMode = () => {
  ELEMENTS.mode2d.checked = true;
  ELEMENTS.body.classList.remove(CLASSES.mode3d);
  ELEMENTS.body.classList.remove(CLASSES.perspective);
};

/**
 * Обработчик события выбора режима
 * @param  {Object} event
 */
const onModeClick = (event) => {
  // Чтобы избежать искажений в 3D-режиме после переключения из 2D
  ELEMENTS.solarSystem.style.display = 'none';
  setTimeout(() => {
    ELEMENTS.solarSystem.style.display = 'block';
  });

  if (event.target.classList.contains('modes-3d')) {
    set3DdMode(false);
  } else if (event.target.classList.contains('modes-3d-perspective')) {
    set3DdMode(true);
  } else {
    set2DdMode();
  }
};

// Навешивание событий
document.querySelector('.modes').addEventListener('click', onModeClick);

// Инициализация приложения
set3DdMode(false);
