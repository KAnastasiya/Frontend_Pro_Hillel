import { getRandomParam, getMousePosition, getCanvasSize, clearCanvas } from './js/utils';

/**
 * DOM-элементы, к которым выполняется обращение
 * @constant
 * @type {Object}
 */
const ELEMENTS = {
  canvas: document.querySelector('.balls-container--canvas'),
  svg: document.querySelector('.balls-container--svg'),
  modes: document.querySelector('.modes'),
  modeCanvas: document.querySelector('input.modes-canvas'),
  modeSvg: document.querySelector('input.modes-svg'),
};

/**
 * Настройки шаров
 * @type {Object}
 * @constant
 */
const BALLS_SETTINGS = {
  minRadius: 10,
  maxRadius: 30,
  minDx: -10,
  maxDx: 10,
  minDy: -10,
  maxDy: 10,
  colors: ['#f44336', '#e91e63', '#9c27b0', '#2196f3', '#00bcd4', '#009688', '#4caf50', '#ff9800'],
};

/**
 * Скорость смены кадров (в миллисекундах).
 * Для человеческого глаза оптимальная скорость - 60 кадров в секунду
 * @type {Number}
 * @constant
 */
const FRAMES_SPEED = 1000 / 60;

/**
 * Реализация оскока шара от границ контейнера. При этом скорость шара несколько замедляется
 * @param  {Number} coord    Текущая координата шара
 * @param  {Number} step     Шаг изменения координаты шара
 * @param  {Number} radius   Радиус шара
 * @param  {Number} maxCoord Максимальная допустимая координата шара
 * @return {Number}
 */
const setBoundaries = (coord, step, radius, maxCoord) =>
  ((coord + step > maxCoord - radius) || (coord + step < radius)) ? -(0.95 * step) : step;

/**
 * Контекст canvas, чрез который получается доступ к canvas
 */
let canvasContext;

/**
 * Идентификатор таймера запуска отрисовки новых кадров анимации
 */
let timerId;

/**
 * Список всех отрисованных шаров
 * @type {Array}
 * @constant
 */
let balls = [];

/**
 * Класс типа 'Шар'
 * @type {Object}
 * @constructor
 */
class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.id = `circle_${balls.length}`;
    this.radius = getRandomParam(BALLS_SETTINGS.minRadius, BALLS_SETTINGS.maxRadius);
    this.color = BALLS_SETTINGS.colors[getRandomParam(0, BALLS_SETTINGS.colors.length)];
    this.dx = getRandomParam(BALLS_SETTINGS.minDx, BALLS_SETTINGS.maxDx);
    this.dy = getRandomParam(BALLS_SETTINGS.minDy, BALLS_SETTINGS.maxDy);
  }

  drawOnCanvas() {
    canvasContext.beginPath();
    canvasContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    canvasContext.fillStyle = this.color;
    canvasContext.fill();
    canvasContext.closePath();
  }

  drawOnSvg() {
    this.element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ELEMENTS.svg.appendChild(this.element);
    this.element.setAttribute('id', this.id);
    this.element.setAttribute('r', this.radius);
    this.element.setAttribute('cx', this.x);
    this.element.setAttribute('cy', this.y);
    this.element.setAttribute('fill', this.color);
  }

  refreshPosOnSvg() {
    this.element.setAttribute('cx', this.x);
    this.element.setAttribute('cy', this.y);
  }
}

/**
 * Перебор шариков. Пересчет для каждого шарика новой позиции
 * @param  {Number} maxWidth  Ширина контейнера, в котором перемещаются шарики
 * @param  {Number} maxHeight Высота контейнера, в котором перемещаются шарики
 * @param  {String} funcName  Название метода, который нужно вызвать для каждого шарика
 */
const repositionBalls = (maxWidth, maxHeight, funcName) => {
  balls.forEach((ball) => {
    ball.x += ball.dx;
    ball.y += ball.dy;
    ball.dx = setBoundaries(ball.x, ball.dx, ball.radius, maxWidth);
    ball.dy = setBoundaries(ball.y, ball.dy, ball.radius, maxHeight);
    ball[funcName]();
  });
};

/**
 * Отрисовка кадра на canvas
 */
const drawOnCanvasFrame = () => {
  if (balls.length) {
    clearCanvas(ELEMENTS.canvas, canvasContext);
    canvasContext.globalCompositeOperation = 'lighten';
    repositionBalls(getCanvasSize(ELEMENTS.canvas).width, getCanvasSize(ELEMENTS.canvas).height, 'drawOnCanvas');
  }
  timerId = requestAnimationFrame(drawOnCanvasFrame, FRAMES_SPEED);
};

/**
 * Отрисовка кадра на svg
 */
const drawOnSvgFrame = () => {
  if (balls.length) {
    const svgSize = ELEMENTS.svg.getBoundingClientRect();
    const svgWidth = svgSize.width || svgSize.right - svgSize.left;
    const svgHeight = svgSize.height || svgSize.bottom - svgSize.top;
    repositionBalls(svgWidth, svgHeight, 'refreshPosOnSvg');
  }
  timerId = requestAnimationFrame(drawOnSvgFrame, FRAMES_SPEED);
};

/**
 * Установка режима 'Canvas'
 */
const setCanvasMode = () => {
  ELEMENTS.modeCanvas.checked = true;
  ELEMENTS.svg.style.display = 'none';
  ELEMENTS.canvas.style.display = 'block';
  canvasContext = ELEMENTS.canvas.getContext('2d');
  drawOnCanvasFrame();
  ELEMENTS.svg.innerHTML = '';
};

/**
 * Установка режима 'Svg'
 */
const setSvgMode = () => {
  ELEMENTS.modeSvg.checked = true;
  ELEMENTS.canvas.style.display = 'none';
  ELEMENTS.svg.style.display = 'block';
  drawOnSvgFrame();
  if (canvasContext) {
    clearCanvas(ELEMENTS.canvas, canvasContext);
  }
};

/**
 * Создание экземпляра типа 'Шарик'
 * @param  {Object} event
 * @return {Array}         Созданный экземпляр шарика
 */
const createBallByEvent = (event) => {
  const mousePos = getMousePosition(event);
  const ball = new Ball(mousePos.x, mousePos.y);
  balls.push(ball);
  return ball;
};

/**
 * Обработчик события нажатия по области canvas
 * @param  {Object} event
 */
const onCanvasClick = (event) => {
  createBallByEvent(event);
};

/**
 * Обработчик события нажатия по области svg
 * @param  {Object} event
 */
const onSvgClick = (event) => {
  const ball = createBallByEvent(event);
  ball.drawOnSvg();
};

/**
 * Обработчик события нажатия на переключатель режимов
 * @param  {Object} event
 */
const onModeClick = (event) => {
  // Очистка списка ранее созданных шариков. Сброс таймера отрисовки кадров анимации
  balls = [];
  cancelAnimationFrame(timerId);

  // Переключение режима
  if (event.target.classList.contains('modes-canvas')) {
    setCanvasMode();
  } else {
    setSvgMode();
  }
};

// Навешивание обработчиков событий
ELEMENTS.modes.addEventListener('click', onModeClick);
ELEMENTS.canvas.addEventListener('click', onCanvasClick);
ELEMENTS.svg.addEventListener('click', onSvgClick);

// Инициализация приложения
setCanvasMode();
