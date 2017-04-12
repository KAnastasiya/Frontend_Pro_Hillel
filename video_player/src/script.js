import tracks from './../server/tracks.json';

/**
 * DOM-элементы, к которым выполняется обращение
 * @type {Object}
 * @constant
 */
const ELEMENTS = {
  playlist: document.querySelector('.playlist'),
  tracksList: document.querySelectorAll('li.track'),
  video: document.querySelector('video'),
  videoMp4: document.querySelector('.video__src--mp4'),
  videoOgg: document.querySelector('.video__src--ogg'),
  videoWebm: document.querySelector('.video__src--webm'),
  videoOverlay: document.querySelector('.video-overlay'),
};

/**
 * Названия классов, которые присваиваются элементам
 * @type {Object}
 * @constant
 */
const CLASSES = {
  currentTrack: 'track--current',
  playTrack: 'video-overlay--play',
  pauseTrack: 'video-overlay--pause',
  showOverlayBtn: 'show',
  showOverlayBtnAlways: 'show--always',
};

/**
 * Название атрибута, на основании значения которого запрашиваются данные по треку с сервера
 * @type {String}
 * @constant
 */
const TRACK_ID_ATTR = 'data-id';

/**
 * Идентификатор трека по умолчанию
 * @type {Number}
 * @constant
 */
const DEFAULT_TRACK_ID = 4;

/**
 * Уровень звука воспроизведения видео по умолчанию
 * @type {Number}
 * @constant
 */
const DEFAULT_VOLUME_LEVEL = 0.2;

/**
 * Время, через которое будет запущен следующий трек из плейлиста (в секундах)
 * @type {Number}
 * @constant
 */
const TIMEOUT_NEXT_TRACK_AUTOPLAY = 10;

/**
 * Время, через которое кнопка управления видео будет скрыта (в миллисекундах)
 * @type {Number}
 * @constant
 */
const TIMEOUT_SHOW_OVERLAY_BTN = 5000;

/**
 * Частота обновления времени, оставшегося до автозапуска следующего трека (в миллисекундах)
 * @type {Number}
 * @constant
 */
const INTERVAL_UPDATE_TIME_TO_START_NEXT_TRACK = 1000;

/**
 * ID текущего трека
 * @type {Number}
 */
let currentTrackId = DEFAULT_TRACK_ID;

/**
 * Счетчик оставшегося времени до автозапуска следующего трека
 * @type {Number}
 */
let timeToStartNextTrack = TIMEOUT_NEXT_TRACK_AUTOPLAY;

/**
 * Идентификатор таймаута скрытия кнопки управления видео, расположенной на видео
 * Используется для очистки соответствующего таймаута
 * @type {Number}
 */
let timeoutShowBtn;

/**
 * Идентификатор таймаута автозапуска следующего трека
 * Используется для очистки соответствующего таймаута
 * @type {Number}
 */
let timeoutNextTrackAutoplay;

/**
 * Выбор трека в плейлисте
 */
const choseTrackInList = () => {
  for (let i = 0; i < ELEMENTS.tracksList.length; i++) {
    ELEMENTS.tracksList[i].classList.remove(CLASSES.currentTrack);
  }
  ELEMENTS.playlist.children[currentTrackId].classList.add(CLASSES.currentTrack);
  setTrackDataInVideo();
};

/**
 * Загрузка информации о треке в тег video
 */
const setTrackDataInVideo = () => {
  const trackInfo = tracks.tracks[currentTrackId];
  ELEMENTS.video.poster = `server/${trackInfo.poster}`;

  const path = `server/${trackInfo.src}`;
  ELEMENTS.videoMp4.src = `${path}.mp4`;
  ELEMENTS.videoOgg.src = `${path}.ogg`;
  ELEMENTS.videoWebm.src = `${path}.webm`;
  ELEMENTS.video.load();
};

/**
 * Изменение кнопки, отображаемой на видео
 * @param  {String} btnType Тип кнопки
 */
const setOverlayBtn = (btnType) => {
  if (btnType === 'pause') {
    ELEMENTS.videoOverlay.classList.remove(CLASSES.playTrack);
    ELEMENTS.videoOverlay.classList.add(CLASSES.pauseTrack);
  } else {
    ELEMENTS.videoOverlay.classList.remove(CLASSES.pauseTrack);
    ELEMENTS.videoOverlay.classList.add(CLASSES.playTrack);
  }
};

/**
 * Запуск воспроизведения видео
 */
const playVideo = () => {
  ELEMENTS.video.play();
  setOverlayBtn('pause');
};

/**
 * Приостановка видео (пауза)
 */
const pauseVideo = () => {
  ELEMENTS.video.pause();
  setOverlayBtn('play');
};

/**
 * Управление воспроизведением видео
 */
const changeVideoState = () => {
  if (ELEMENTS.video.paused) {
    playVideo();
  } else {
    pauseVideo();
  }
};

/**
 * Отрисовка информации о следующем треке
 * @param  {Number} trackId Идентификатор трека
 */
const showInfoAboutNextTrack = (trackId) => {
  const trackInfo = tracks.tracks[trackId];

  const song = document.createElement('p');
  song.className = 'video-overlay__text video-overlay__text--next-song';
  song.innerText = trackInfo.song;
  ELEMENTS.videoOverlay.appendChild(song);

  const artist = document.createElement('span');
  artist.innerText = trackInfo.artist;
  song.appendChild(artist);

  const timeout = document.createElement('p');
  timeout.className = 'video-overlay__text video-overlay__text--timeout';
  timeout.innerText = 'Next track';
  ELEMENTS.videoOverlay.appendChild(timeout);

  const time = document.createElement('span');
  timeout.appendChild(time);
};

/**
 * Обработчик события выбора нового трека
 * @param  {Object} event
 */
const onPlayListClick = (event) => {
  if (event.target.classList.contains('track')) {
    currentTrackId = event.target.getAttribute(TRACK_ID_ATTR) || event.target.parentElement.getAttribute(TRACK_ID_ATTR);
    choseTrackInList();
  }
};

/**
 * Обработчик события запуска воспроизведения видео
 */
const onVideoStartPlaying = () => {
  const textList = document.querySelectorAll('.video-overlay__text');
  if (textList.length > 0) {
    for (let i = 0; i < textList.length; i++) {
      ELEMENTS.videoOverlay.removeChild(textList[i]);
    }
  }
  setOverlayBtn('pause');
  ELEMENTS.videoOverlay.classList.remove(CLASSES.showOverlayBtnAlways);
  ELEMENTS.video.addEventListener('click', onVideoClick);
};

/**
 * Обработчик события завершения проигрывания видео
 */
const onVideoEnded = () => {
  const nextTrackId = ((+currentTrackId + 1) < ELEMENTS.tracksList.length) ? (+currentTrackId + 1) : 0;
  currentTrackId = nextTrackId;
  setOverlayBtn('play');
  showInfoAboutNextTrack(nextTrackId);
  ELEMENTS.videoOverlay.classList.add(CLASSES.showOverlayBtnAlways);
  ELEMENTS.video.removeEventListener('click', onVideoClick);

  timeoutNextTrackAutoplay = setInterval(() => {
    if (timeToStartNextTrack > 0) {
      document.querySelector('.video-overlay__text--timeout span').innerText = ` (${timeToStartNextTrack} сек)`;
      timeToStartNextTrack -= 1;
    } else {
      clearInterval(timeoutNextTrackAutoplay);
      timeToStartNextTrack = TIMEOUT_NEXT_TRACK_AUTOPLAY;
      choseTrackInList();
    }
  }, INTERVAL_UPDATE_TIME_TO_START_NEXT_TRACK);
};

/**
 * Обработчик события нажатия на видео
 */
const onVideoClick = () => {
  changeVideoState();
};

/**
 * Обработчик события нажатия на кнопку, размещенную на видео
 */
const onVideoOverlayClick = () => {
  if (document.querySelector('.video-overlay__text')) {
    clearInterval(timeoutNextTrackAutoplay);
    choseTrackInList();
  } else {
    changeVideoState();
  }
};

/**
 * Обработчик события изменения положения курсора мыши на video
 */
const onVideoMouseMove = () => {
  ELEMENTS.videoOverlay.classList.add(CLASSES.showOverlayBtn);
  clearTimeout(timeoutShowBtn);
  timeoutShowBtn = setTimeout(() => {
    ELEMENTS.videoOverlay.classList.remove(CLASSES.showOverlayBtn);
  }, TIMEOUT_SHOW_OVERLAY_BTN);
};

// Инициализация приложения
choseTrackInList();
ELEMENTS.video.volume = DEFAULT_VOLUME_LEVEL;
ELEMENTS.playlist.addEventListener('click', onPlayListClick);
ELEMENTS.videoOverlay.addEventListener('click', onVideoOverlayClick);
ELEMENTS.video.addEventListener('click', onVideoClick);
ELEMENTS.video.addEventListener('mousemove', onVideoMouseMove);
ELEMENTS.video.addEventListener('playing', onVideoStartPlaying);
ELEMENTS.video.addEventListener('ended', onVideoEnded);
