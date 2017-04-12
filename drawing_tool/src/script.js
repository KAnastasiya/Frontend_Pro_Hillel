/**
 * DON-элементы, к которым выполняется обращение
 * @type {Object}
 * @constant
 */
const ELEMENTS = {
  canvasList: document.querySelector('.drawing-tool__canvases'),
  strokeColor: document.querySelector('.input--stroke-color'),
  fillColor: document.querySelector('.input--fill-color'),
  lineWeight: document.querySelector('.select--line-weight'),
  tools: document.querySelector('.field--tools'),
  toolsList: document.querySelectorAll('.custom-radio'),
  toolPencilWrapper: document.querySelector('.custom-radio--pencil'),
  toolPencil: document.querySelector('.input--pencil'),
  save: document.querySelector('.btn--save'),
  clear: document.querySelector('.btn--clear'),
};

/**
 * Класс, присваиваемый выбранному кастомному радиобаттону
 * @type {String}
 * @constant
 */
const CURRENT_TOOL_CLASS = 'custom-radio--checked';

/**
 * Размеры canvas по ширине и высоте соответственно (в px)
 * @type {Number}
 * @constant
 */
const CANVAS_WIDTH = 550;
const CANVAS_HEIGHT = 550;

/**
 * Экземпляр класса 'Paint'
 */
let paint;

/**
 * Слои canvas, который на данный момент находятся в DOM-дереве
 * @type {Array}
 */
let layers = [];

/**
 * Основной контекст canvas. Контекст 1-ого созданного слоя
 */
let ctx;

/**
 * Название предыдущего выбранного инструмента
 */
let prevTool;

/**
 * Контекст предыдущего слоя canvas
 */
let prevCtx;

/**
 * Класс типа 'Paint'
 */
class Paint {
  constructor(x, y) {
    this.startX = x;
    this.startY = y;
    this.endX = this.startX;
    this.endY = this.startY;
  }

  initLayer(canvas) {
    this.ctx = canvas.getContext('2d');
    this.ctx.beginPath();
    this.ctx.moveTo(this.startX, this.startY);
    ctx = (layers.length === 1) ? this.ctx : ctx;
    prevCtx = ctx;
  }

  drawDot(color) {
    const lineWeightIndex = ELEMENTS.lineWeight.selectedIndex;

    if (!this.ctx) {
      this.ctx = prevCtx;
      this.ctx.beginPath();
    }
    prevCtx = this.ctx;

    this.ctx.lineWidth = ELEMENTS.lineWeight.options[lineWeightIndex].value;
    this.ctx.strokeStyle = color;
    this.ctx.lineTo(this.endX, this.endY);
    this.ctx.stroke();
  }

  drawShapes(type) {
    const lineWeightIndex = ELEMENTS.lineWeight.selectedIndex;

    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.ctx.beginPath();
    this.ctx.lineWidth = ELEMENTS.lineWeight.options[lineWeightIndex].value;
    this.ctx.strokeStyle = ELEMENTS.strokeColor.value;
    this.ctx.fillStyle = ELEMENTS.fillColor.value;

    if (type === 'rect') {
      this.ctx.rect(this.startX, this.startY, this.endX - this.startX, this.endY - this.startY);
    } else {
      const width = Math.abs(this.endX - this.startX);
      const height = Math.abs(this.endY - this.startY);
      const radius = (width > height) ? width : height;
      this.ctx.arc(this.startX, this.startY, radius, 0, 2 * Math.PI);
    }

    this.ctx.fill();
    this.ctx.stroke();
  }
}

/**
 * Создание слоя canvas
 */
const renderLayer = () => {
  const canvas = document.createElement('canvas');
  canvas.className = `drawing-tool__canvas drawing-tool__canvas--${layers.length}`;
  ELEMENTS.canvasList.appendChild(canvas);
  canvas.setAttribute('width', CANVAS_WIDTH);
  canvas.setAttribute('height', CANVAS_HEIGHT);
  layers.push(canvas);
  paint.initLayer(canvas);
};

/**
 * Объединение слоев canvas в один (1-ый)
 * Удаление всех слоев, кроме 1-ого (они больше не нужны)
 */
const mergeCanvasLayers = () => {
  layers.forEach((canvas, index) => {
    ctx.drawImage(canvas, 0, 0);
    if (index > 0) {
      ELEMENTS.canvasList.removeChild(canvas);
    }
  });
  layers = layers.slice(0, 1);
};

/**
 * Отрисовка кастомной 'Пипетки'
 * @param  {Element} picker  DOM-элемент стандартного color picker-а
 * @param  {Element} wrapper DOM-элемент кастомного color picker-а
 */
export const customizeColorPicker = (picker, wrapper) => {
  wrapper.style.backgroundColor = picker.value;
};

/**
 * Выбор инструмента
 * @param {Element} toolElement DOM-элемент выбранного инструмента
 */
const chooseTool = (toolElement) => {
  for (let i = 0; i < ELEMENTS.toolsList.length; i++) {
    ELEMENTS.toolsList[i].classList.remove(CURRENT_TOOL_CLASS);
  }
  toolElement.parentElement.classList.add(CURRENT_TOOL_CLASS);

  const currentTools = getCurrentTool();
  ELEMENTS.canvasList.style.cursor = (currentTools === 'rect' || currentTools === 'circle') ? 'crosshair' : 'default';
};

/**
 * Получение названия текущего выбранного инструмента
 * @return {String}
 */
const getCurrentTool = () => ELEMENTS.tools.querySelector('.input:checked').value;

/**
 * Получение активного слоя canvas
 * @return {Number}
 */
const getActiveLayerNumber = () => layers.length - 1;

/**
 * Определение координат мыши
 * @param  {Object} event Событие, вызвавшее данную функцию
 * @return {Object}
 */
export const getMousePosition = (event) => {
  const rect = event.target.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};

/**
 * Активация кнопок управления canvas
 */
const activateBtn = () => {
  ELEMENTS.save.classList.remove('disabled');
  ELEMENTS.clear.classList.remove('disabled');
  ELEMENTS.save.addEventListener('click', onBtnSaveClick);
  ELEMENTS.clear.addEventListener('click', onBtnClearClick);
};

/**
 * Деактивация кнопок управления canvas
 */
const deactivate = () => {
  ELEMENTS.save.classList.add('disabled');
  ELEMENTS.clear.classList.add('disabled');
  ELEMENTS.save.removeEventListener('click', onBtnSaveClick);
  ELEMENTS.clear.removeEventListener('click', onBtnClearClick);
};

/**
 * Обработчик события 'mousedown' на области canvas
 * Начало отрисовки
 * @param {Object} event
 */
const onCanvasMouseDown = (event) => {
  const mousePos = getMousePosition(event);
  paint = new Paint(mousePos.x, mousePos.y);

  if (prevTool === 'rect' || prevTool === 'circle') {
    renderLayer();
  } else {
    const currentTool = getCurrentTool();
    if (currentTool === 'rect' || currentTool === 'circle' || getActiveLayerNumber() < 0) {
      renderLayer();
    }
  }

  const activeLayerNum = getActiveLayerNumber();
  layers[activeLayerNum].addEventListener('mouseup', onCanvasMouseUp);
  layers[activeLayerNum].addEventListener('mouseout', onCanvasMouseUp);
  layers[activeLayerNum].addEventListener('mousemove', onCanvasMouseMove);
};

/**
 * Обработчик события движения мыши ('mousemove') по области canvas
 * @param {Object} event
 */
const onCanvasMouseMove = (event) => {
  const mousePos = getMousePosition(event);
  paint.endX = mousePos.x;
  paint.endY = mousePos.y;

  switch (getCurrentTool()) {
    case 'pencil':
      paint.drawDot(ELEMENTS.strokeColor.value);
      break;
    case 'eraser':
      paint.drawDot(ELEMENTS.fillColor.value);
      break;
    case 'rect':
      paint.drawShapes('rect');
      break;
    case 'circle':
      paint.drawShapes('circle');
      break;
    default:
      return 'Unknown tool';
  }

  activateBtn();
  prevTool = getCurrentTool();
};

/**
 * Обработчик событий 'mouseup' и 'mousedown' на области canvas
 * Окончание отрисовки
 * @param  {Object} event
 */
const onCanvasMouseUp = () => {
  const activeLayerNum = getActiveLayerNumber();
  layers[activeLayerNum].removeEventListener('mouseup', onCanvasMouseUp);
  layers[activeLayerNum].removeEventListener('mouseout', onCanvasMouseUp);
  layers[activeLayerNum].removeEventListener('mousemove', onCanvasMouseMove);
};

/**
 * Обработчик события изменения цвета в color picker
 * @param {Object} event
 */
const onColorPickerClick = (event) => {
  customizeColorPicker(event.target, event.target.parentElement);
};

/**
 * Обработчик события выбора инструмента
 * @param {Object} event
 */
const onToolsClick = (event) => {
  if (event.target.type === 'radio') {
    chooseTool(event.target);
  }
};

/**
 * Сохранение изображения на canvas (со всех слоев) в файл
 * @param {Object} event
 */
const onBtnSaveClick = (event) => {
  mergeCanvasLayers();
  event.target.href = layers[0].toDataURL();
};

/**
 * Очистка canvas (всех слоев)
 */
const onBtnClearClick = () => {
  mergeCanvasLayers();
  if (layers[0]) {
    ELEMENTS.canvasList.removeChild(layers[0]);
  }
  layers = [];
  deactivate();
};

// Отрисовка цветов по умолчанию. Установка инструмента по умолчанию
customizeColorPicker(ELEMENTS.strokeColor, ELEMENTS.strokeColor.parentElement);
customizeColorPicker(ELEMENTS.fillColor, ELEMENTS.fillColor.parentElement);
ELEMENTS.toolPencil.checked = true;
chooseTool(ELEMENTS.toolPencil);
deactivate();

// Навешивание обработчиков событий при инициализации приложения
ELEMENTS.strokeColor.addEventListener('change', onColorPickerClick);
ELEMENTS.fillColor.addEventListener('change', onColorPickerClick);
ELEMENTS.tools.addEventListener('click', onToolsClick);
ELEMENTS.canvasList.addEventListener('mousedown', onCanvasMouseDown);
