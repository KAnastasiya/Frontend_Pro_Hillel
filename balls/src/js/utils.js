/**
 * Получение случайного целого неравномерно распределенного числа между min (включительно) и max (не включая max)
 * @param  {Number} min Минимальное значение параметра
 * @param  {Number} max Максимальное значение параметра
 * @return {Number}
 */
export const getRandomParam = (min, max) => {
  let res;
  // Цикл do while исключает получение нуля
  do {
    res = Math.floor((Math.random() * (max - min)) + min);
  } while (!res);
  return res;
};

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
 * Получение размеров canvas
 * @param  {Element} canvas DOM-элемент для canvas
 * @return {Object}
 */
export const getCanvasSize = canvas => ({
  width: canvas.width,
  height: canvas.height,
});

/**
 * Очистка canvas
 * @param  {Element} canvas        DOM-элемент для canvas
 * @param  {Object}  canvasContext Контекст canvas
 */
export const clearCanvas = (canvas, canvasContext) => {
  canvasContext.clearRect(0, 0, getCanvasSize(canvas).width, getCanvasSize(canvas).height);
};
