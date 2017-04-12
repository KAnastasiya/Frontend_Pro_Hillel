/**
 * Количество делений на табло часов, соответствующих часам
 * @type {Number}
 * @constant
 */
const HOURS_POINTS = 12;

/**
 * Определение угла для временной стрелки
 * @param  {Number} hours  Время (в часах)
 * @return {Number}        Угол для временной стрелки
 */
const getDegreeForArrow = (hours) => {
  const MINUTES_IN_HOUR = 60;
  const DEGREE_BETWEEN_SIBLING_HOURS = 30;
  const ONE_DEGREE_IN_MINUTES = MINUTES_IN_HOUR / DEGREE_BETWEEN_SIBLING_HOURS;

  const hoursInMinutes = hours * 60;
  const degree = Math.round(hoursInMinutes / ONE_DEGREE_IN_MINUTES);

  return (hours > 0) ? degree : -degree;
};

/**
 * Определение угла между часовой и минутной стрелками
 * @param  {Number} hoursDegree    Угол для часовой стрелки
 * @param  {Number} minutesDegree  Угол для минутной стрелки
 * @return {Number}             Угол между часовой и минутной стрелками
 */
const getDegreeBetweenHoursAndMinutesArrows = (hoursDegree, minutesDegree) => {
  const MAX_DEGREE = 360;
  const degree = Math.abs(hoursDegree - minutesDegree);

  if (degree === MAX_DEGREE) {
    return 0;
  } else if (degree > 180) {
    return (MAX_DEGREE - degree);
  }

  return degree;
};

/**
 * Преобразование градусов в радианы
 * @param  {Number} degree Угол в градусах
 * @return {Number}        Угол в радианах
 */
const convertDegreeToRadian = degree => degree * (Math.PI / 180);

/**
 * Отрисовка часов
 * @param    {Number} hoursDegree    Угол для часовой стрелки
 * @param    {Number} minutesDegree  Угол для минутной стрелки
 * * @param  {Number} secondsDegree  Угол для секундной стрелки
 */
const renderClock = (hoursDegree, minutesDegree, secondsDegree) => {
  // Цветовая схема
  const COLORS = {
    clockBg: '#fffde7',
    secondArrow: '#e91e63',
    otherArrows: '#a1887f',
    mainNumbers: '#ffc107',
    addNumbers: '#4caf50',
  };

  // Инициализация canvas
  const canvas = document.querySelector('#clock');
  const ctx = canvas.getContext('2d');

  // Установка радиусов часов и отрисовки циферблата
  const clockRadius = canvas.width / 2;
  const numberRadius = clockRadius - 50;

  // Установка координаты центра
  const xCenter = canvas.width / 2;
  const yCenter = canvas.width / 2;

  // Задание длин часовых стрелок
  const secondsArrowLength = numberRadius - 10;
  const minutesArrowLength = secondsArrowLength * 0.85;
  const hoursArrowLength = secondsArrowLength * 0.75;

  // Смещение на 90 градусов (используется для правильного позиционирования цифр циферблата)
  const offsetForNumbers = Math.PI / 2;

  // Отрисовка табло
  ctx.fillStyle = COLORS.clockBg;
  ctx.beginPath();
  ctx.arc(xCenter, yCenter, clockRadius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();

  // Отрисовка рамки
  const frame = new Image();
  frame.src = 'img/frame.png';
  frame.onload = () => {
    ctx.drawImage(frame, 0, 0);
  };

  // Отрисовка циферблата
  ctx.textAlign = 'center';
  for (let i = 1; i <= 12; i++) {
    if (i % 3) {
      ctx.font = '18px Arial';
      ctx.fillStyle = COLORS.addNumbers;
    } else {
      ctx.font = '24px Arial';
      ctx.fillStyle = COLORS.mainNumbers;
    }
    ctx.beginPath();
    ctx.fillText(
      i,
      xCenter + (numberRadius * Math.cos((-30 * (i * (Math.PI / 180))) + (Math.PI / 2))),
      (yCenter + 10) - (numberRadius * Math.sin((-30 * (i * (Math.PI / 180))) + (Math.PI / 2))),
    );
    ctx.fill();
    ctx.closePath();
  }

  // Отрисовка часовой стрелки
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = COLORS.otherArrows;
  ctx.beginPath();
  ctx.moveTo(xCenter, yCenter);
  ctx.lineTo(
    xCenter + (hoursArrowLength * Math.cos(offsetForNumbers - convertDegreeToRadian(hoursDegree))),
    yCenter - (hoursArrowLength * Math.sin(offsetForNumbers - convertDegreeToRadian(hoursDegree))),
  );
  ctx.stroke();
  ctx.closePath();

  // Отрисовка минутной стрелки
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.strokeStyle = COLORS.otherArrows;
  ctx.beginPath();
  ctx.moveTo(xCenter, yCenter);
  ctx.lineTo(
    xCenter + (minutesArrowLength * Math.cos(offsetForNumbers - convertDegreeToRadian(minutesDegree))),
    yCenter - (minutesArrowLength * Math.sin(offsetForNumbers - convertDegreeToRadian(minutesDegree))),
  );
  ctx.stroke();
  ctx.closePath();

  // Отрисовка секундной стрелки
  ctx.lineWidth = 2;
  ctx.strokeStyle = COLORS.secondArrow;
  ctx.beginPath();
  ctx.moveTo(xCenter, yCenter);
  ctx.lineTo(
    xCenter + (secondsArrowLength * Math.cos(offsetForNumbers - convertDegreeToRadian(secondsDegree))),
    yCenter - (secondsArrowLength * Math.sin(offsetForNumbers - convertDegreeToRadian(secondsDegree))),
  );
  ctx.stroke();
  ctx.closePath();

  // Отрисовка центра часов
  ctx.lineWidth = 6;
  ctx.strokeStyle = COLORS.otherArrows;
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(xCenter, yCenter, 4, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
};

/**
 * Определение количества часовых делений, которые занимают параметры времени с учетом влияния расположения других стрелок
 * @param  {String} targetArrowType        Тип искомой стрелки
 * @param  {Number} targetArrowHoursPoints Количество часовых делений, которые занимает искомая стрелка
 * @param  {Number} otherArrowHoursPoints  Количество часовых делений, которые занимает стрелка, влияющая на искомую
 * @return {Number}
 */
const getTimeParamToHoursPointsWithOffset = (targetArrowType, targetArrowHoursPoints, otherArrowHoursPoints) => {
  const MINUTES_POINTS_IN_HOUR = 60;

  const offset = (targetArrowType === 'minutes')
    ? ((otherArrowHoursPoints / HOURS_POINTS) / MINUTES_POINTS_IN_HOUR)
    : (otherArrowHoursPoints / HOURS_POINTS);

  return (targetArrowHoursPoints > 0) ? (targetArrowHoursPoints + offset) : (targetArrowHoursPoints - offset);
};

/**
 * Показ угла между часовой и минутной стрелками
 * @param  {Number} hoursDegree    Угол для часовой стрелки
 * @param  {Number} minutesDegree  Угол для минутной стрелки
 */
const showDegreeBetweenHoursAndMinutesArrows = (hoursDegree, minutesDegree) => {
  document.querySelector('#degree__value').innerText = getDegreeBetweenHoursAndMinutesArrows(hoursDegree, minutesDegree);
};

/**
 * Установка времени по умолчанию. В данном случае используется текущее время
 */
const setDefaultTime = () => {
  const currentTime = new Date();
  document.querySelector('#hours').value = currentTime.getHours();
  document.querySelector('#minutes').value = currentTime.getMinutes();
  document.querySelector('#seconds').value = currentTime.getSeconds();
};

/**
 * Определение валидности параметров, указанных пользователем
 * @return {Boolean} Возможные значения - true (валидна) и false (не валидна);
 */
const isParamsValid = () => {
  const MAX_HOURS = 23;
  const MAX_MINUTES = 59;
  const MAX_SECONDS = 59;

  return !(
    document.querySelector('#hours').value > MAX_HOURS
    || document.querySelector('#minutes').value > MAX_MINUTES
    || document.querySelector('#seconds').value > MAX_SECONDS
  );
};

/**
 * Применение нового времени
 */
const applyTime = () => {
  const SECONDS_BETWEEN_SIBLING_HOUR_POINTS = 5;
  const MINUTES_BETWEEN_SUBLING_HOUR_POINTS = 5;

  const hoursValue = document.querySelector('#hours').value;

  // Определение количества часовых делений, которые занимают указанные пользователем параметры времени (секунды, минуты и часы)
  const secondsToHoursPoints = document.querySelector('#seconds').value / SECONDS_BETWEEN_SIBLING_HOUR_POINTS;
  const minutesToHoursPoints = document.querySelector('#minutes').value / MINUTES_BETWEEN_SUBLING_HOUR_POINTS;
  const hoursToHoursPoints = (hoursValue > HOURS_POINTS) ? (hoursValue - HOURS_POINTS) : -hoursValue;

  // Определение количества часовых делений, которые занимают указанные пользователем параметры времени
  // с учетом влияния расположения других стрелок
  const minutesToHoursPointsWithSecondsOffset = getTimeParamToHoursPointsWithOffset('minutes', minutesToHoursPoints, secondsToHoursPoints);
  const hoursToHoursPointsWithMinutesOffset = getTimeParamToHoursPointsWithOffset('hours', hoursToHoursPoints, minutesToHoursPoints);

  // Определение угла для каждой стрелки
  const secondsArrowDegree = getDegreeForArrow(secondsToHoursPoints);
  const minutesArrowDegree = getDegreeForArrow(minutesToHoursPointsWithSecondsOffset);
  const hoursArrowDegree = getDegreeForArrow(hoursToHoursPointsWithMinutesOffset);

  // Вывод на экран угла между минутной и часовой стрелками. Отрисовка часов
  showDegreeBetweenHoursAndMinutesArrows(hoursArrowDegree, minutesArrowDegree);
  renderClock(hoursArrowDegree, minutesArrowDegree, secondsArrowDegree);
};

/**
 * Обработчик события нажатия на кнопку применения новых условий
 */
const onBtnClick = () => {
  if (isParamsValid()) {
    applyTime();
  } else {
    alert('Указанное время не существует!!!');
    setDefaultTime();
  }
};

// Инициализация приложения
setDefaultTime();
applyTime();
document.querySelector('.btn--apply').addEventListener('click', onBtnClick);
